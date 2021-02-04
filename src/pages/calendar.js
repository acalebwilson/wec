import React from "react";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  sidePageAction,
  closeSidePageAction,
  openSidePageAction,
  addEventList,
  currentEventAction,
} from "../redux/actions";
import BreadCrumbs from "../components/breadcrumbs";
import axios from "axios";
import AdminTools from "../components/admin-tools";
import EventDetails from "../components/calendar-event-focus"

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      showEventDetails: "hide",
      pageHeight: 0,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setMonthString = this.setMonthString.bind(this);
    this.setYearString = this.setYearString.bind(this);
    this.setEventDetails = this.setEventDetails.bind(this);
    this.closeEventDetails = this.closeEventDetails.bind(this);
  }

  getMonthStr(month) {
    let monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthArr[month];
  }

  setMonthString(string) {
    this.setState({ monthStr: string });
  }

  setYearString(string) {
    this.setState({ yearStr: string });
  }

  setEventDetails(details) {
    this.setState({ details, showEventDetails: "hide" });
    this.props.currentEventId(details);
    
    if (this.props.reduxState.width < 747) {
      this.props.setSide("event-details");
      this.props.openSide();
    }
  }

  closeEventDetails() {
    this.setState({ showEventDetails: "hide" });
  }

  componentDidMount() {
    let element = document.getElementById("calendar-outer-wrapper");
    this.setState({ pageHeight: element.clientHeight });

    this.props.header("Calendar");
  }

  render() {
    let integratedDetails = (
      <EventDetails
        details={this.props.reduxState.event}
        getMonthStr={this.getMonthStr}
        setBodyScroll={this.props.setBodyScroll}
        setBodyNoScroll={this.props.setBodyNoScroll}
        width={this.props.reduxState.width}
        showEventDetails={this.state.showEventDetails}
        closeEventDetails={this.closeEventDetails}
      />
    );

    if (this.props.reduxState.width < 747) {
      integratedDetails = <div />
    }

    return (
      <div>
        <div id="events-wrapper" className="page-content">
          <main id="events-main">
            <BreadCrumbs location={this.props.routeProps.location} />
            <AdminTools
              reduxState={this.props.reduxState}
              setSide={this.props.setSide}
              openSide={this.props.openSide}
              location={this.props.routeProps.location}
            />
            <section
              className="section-wrapper"
              style={{ position: "relative" }}
            >
              <div
                id="calendar-outer-wrapper"
                className={`inner-wrapper ${this.state.showEventDetails}`}
              >
                <Calendar
                  addEvents={this.props.addEvents}
                  reduxState={this.props.reduxState}
                  setMonthString={this.setMonthString}
                  setYearString={this.setYearString}
                  setEventDetails={this.setEventDetails}
                  getMonthStr={this.getMonthStr}
                />
                {integratedDetails}
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      currentDate: new Date(),
      type: "week",
      calendar: null,
      events: null,
      updated: true,
    };
    this.incrementDate = this.incrementDate.bind(this);
    this.decrementDate = this.decrementDate.bind(this);
    this.toggleType = this.toggleType.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.createCalendar = this.createCalendar.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    if (this.props.reduxState.eventList) {
      this.createCalendar(this.props.reduxState.eventList);
    }
    this.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.reduxState.eventList !== prevProps.reduxState.eventList &&
      this.props.reduxState.eventList
    ) {
      this.createCalendar(this.props.reduxState.eventList);
    }
  }

  getEvents() {
    axios.get(`/api/events`).then((res) => {
      this.props.addEvents(res.data.events);
    });
  }

  createCalendar(events) {
    let startDay = this.getFirstDay(this.state.date);
    let weekDay = startDay;
    let days = [];
    for (let i = 1; i <= this.getMonthLength(this.state.date); i++) {
      days = [
        ...days,
        {
          date: i,
          day: weekDay,
          events: [],
        },
      ];
      if (weekDay === 6) {
        weekDay = 0;
      } else {
        weekDay++;
      }
    }

    for (let i = 0; i < events.length; i++) {
      let date = new Date(events[i].start);
      if (date.getMonth() === this.state.date.getMonth()) {
        let weekDay = days
          .filter((item) => item.date === date.getDate())
          .map((item) => item.date)[0];
        days[weekDay - 1].events = [...days[weekDay - 1].events, events[i]];
      }
    }

    this.setState({ calendar: days, updated: true });
    this.props.setMonthString(
      this.props.getMonthStr(this.state.date.getMonth())
    );
    this.props.setYearString(this.state.date.getFullYear());
  }

  getFirstDay(date) {
    let newDate = date;
    newDate.setDate(1);
    return newDate.getDay();
  }

  getMonthLength(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getPrevMonthLength(date) {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }

  incrementDate() {
    let date = this.state.date;
    let newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    if (newDate.getMonth() === new Date()) {
      newDate = new Date();
    }
    this.setState(
      {
        date: newDate,
        updated: false,
      },
      () => {
        this.createCalendar(this.props.reduxState.eventList);
      }
    );
  }

  decrementDate() {
    let date = this.state.date;
    let newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    if (newDate.getMonth() === new Date()) {
      newDate = new Date();
    }
    this.setState(
      {
        date: newDate,
        updated: false,
      },
      () => {
        this.createCalendar(this.props.reduxState.eventList);
      }
    );
  }

  toggleType(event) {
    if (event.target.id === "week") {
      this.setState({
        type: "week",
      });
    } else {
      this.setState({
        type: "month",
      });
    }
  }

  handleCardClick(id) {
    let event = this.props.reduxState.eventList.filter((d, i) => {
      return d._id === id;
    });
    this.props.setEventDetails(event[0]);
  }

  render() {
    let firstDay = this.getFirstDay(this.state.date);
    let monthLength = this.getMonthLength(this.state.date);
    let prevMonthLength = this.getPrevMonthLength(this.state.date);
    let monthStr = this.props.getMonthStr(this.state.date.getMonth());
    let yearStr = this.state.date.getFullYear();

    let options = <div />;
    let calendar = <div />;
    if (this.state.type === "week") {
      options = [
        <button
          className="option active"
          key="week"
          id="week"
          onClick={this.toggleType}
        >
          Week
        </button>,
        <button
          className="option"
          key="month"
          id="month"
          onClick={this.toggleType}
        >
          Month
        </button>,
      ];
      calendar = (
        <CalendarWeek
          firstDay={firstDay}
          monthLength={monthLength}
          prevMonthLength={prevMonthLength}
          currentDate={this.state.currentDate}
          date={this.state.date}
          calendar={this.state.calendar}
          handleClick={this.handleCardClick}
        />
      );
    } else {
      options = [
        <button
          className="option"
          key="week"
          id="week"
          onClick={this.toggleType}
        >
          Week
        </button>,
        <button
          className="option active"
          key="month"
          id="month"
          onClick={this.toggleType}
        >
          Month
        </button>,
      ];
      calendar = (
        <CalendarMonth
          firstDay={firstDay}
          monthLength={monthLength}
          prevMonthLength={prevMonthLength}
          currentDate={this.state.currentDate}
          date={this.state.date}
          calendar={this.state.calendar}
        />
      );
    }

    return (
      <div id="calendar-wrapper">
        <div id="calendar-title-wrapper">
          <div id="options">{options}</div>
          <div id="calendar-title">
            <button onClick={this.decrementDate}>
              <i className="fas fa-caret-left" />
            </button>
            <h4>
              {monthStr}, {yearStr}
            </h4>
            <button onClick={this.incrementDate}>
              <i className="fas fa-caret-right" />
            </button>
          </div>
        </div>
        <div id="calender-outer-wrapper">{calendar}</div>
      </div>
    );
  }
}

class CalendarMonth extends React.Component {
  render() {
    let boxes = [];
    let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 7; i++) {
      boxes = [
        ...boxes,
        <CalendarBox date={dayArr[i]} type="day" key={i + "day"} />,
      ];
    }
    for (let i = 0; i < this.props.firstDay; i++) {
      boxes = [
        ...boxes,
        <CalendarBox
          date={this.props.prevMonthLength - this.props.firstDay + i + 1}
          type="blank"
          key={i + "blank"}
        />,
      ];
    }

    let dateBoxes = [];
    if (this.props.calendar.length > 0) {
      dateBoxes = this.props.calendar.map((item, i) => {
        if (
          this.props.currentDate.getMonth() === this.props.date.getMonth() &&
          this.props.currentDate.getDate() === i
        ) {
          return (
            <CalendarBox
              date={item.date}
              type="active"
              key={i + "normal"}
              events={item.events}
            />
          );
        } else {
          return (
            <CalendarBox
              date={item.date}
              type=""
              key={i + "normal"}
              events={item.events}
            />
          );
        }
      });
    }
    boxes = [...boxes, ...dateBoxes];

    let multOfSeven = Math.floor(boxes.length / 7);
    if (!(multOfSeven === boxes.length / 7)) {
      let totalBoxes = 7 * (multOfSeven + 1) - boxes.length;
      for (let i = 1; i <= totalBoxes; i++) {
        boxes = [
          ...boxes,
          <CalendarBox date={i} type="blank" key={i + "blank-end"} />,
        ];
      }
    }

    return <div id="calendar">{boxes}</div>;
  }
}

class CalendarWeek extends React.Component {
  render() {
    let lines = [];
    let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (this.props.calendar) {
      lines = this.props.calendar.map((item) => {
        if (
          this.props.currentDate.getMonth() === this.props.date.getMonth() &&
          this.props.currentDate.getDate() === item.date
        ) {
          return (
            <CalendarLine
              date={dayArr[item.day] + " " + item.date}
              key={item.date}
              type="active"
              events={item.events}
              handleClick={this.props.handleClick}
            />
          );
        } else {
          return (
            <CalendarLine
              date={dayArr[item.day] + " " + item.date}
              key={item.date}
              events={item.events}
              handleClick={this.props.handleClick}
            />
          );
        }
      });
    }

    return <div id="calendar-week">{lines}</div>;
  }
}

const CalendarLine = (props) => {
  let events = [];
  if (props.events.length > 0) {
    events = props.events.map((item) => {
      let date = new Date(item.start);
      let minutes;
      let hours;
      if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
      } else {
        minutes = date.getMinutes();
      }
      if (date.getHours() < 10) {
        hours = "0" + date.getHours();
      } else {
        hours = date.getHours();
      }
      return {
        time: parseInt(hours) * 60 + parseInt(minutes),
        card: (
          <CalendarCard
            key={item._id}
            item={item}
            hours={hours}
            minutes={minutes}
            handleClick={props.handleClick}
          />
        ),
      };
    });
  }

  let eventArr = [];

  while (events.length > 0) {
    let currentMin;
    let currentMinIndex;
    for (let i = 0; i < events.length; i++) {
      if (!currentMin || currentMin.time > events[i].time) {
        currentMin = events[i];
        currentMinIndex = i;
      }
    }
    events[currentMinIndex] = null;
    let newEvents = [];
    for (let i = 0; i < events.length; i++) {
      if (events[i]) {
        newEvents = [...newEvents, events[i]];
      }
    }
    events = newEvents;
    eventArr = [...eventArr, currentMin];
  }

  let actualEvents = [];

  for (let i = 0; i < eventArr.length; i++) {
    actualEvents = [...actualEvents, eventArr[i].card];
  }

  return (
    <div className={"calendar-line " + props.type}>
      <p>{props.date}</p>
      <div className="events-div">{actualEvents}</div>
    </div>
  );
};

const CalendarCard = (props) => {
  if (props.type === "month") {
    return (
      <div
        className={"event-card " + props.item.type + " " + props.type}
        key={props.item.start}
      >
        <div className="title-bar" id={props.item._id}>
          <p className="time">
            {props.hours}:{props.minutes}
          </p>
          <p className="title">{props.item.title}</p>
        </div>
        <div className="content">
          <p className="speaker">Speaker: {props.item.speaker}</p>
          {/*<p className="description">{props.item.description}</p>*/}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={"event-card " + props.item.type + " " + props.type}
        key={props.item.start}
      >
        <div
          className="title-bar"
          onClick={() => props.handleClick(props.item._id)}
          id={props.item._id}
        >
          <div className="time-container">
            <p className="time">
              {props.hours}:{props.minutes}
            </p>
          </div>
          <div className="title-flex">
            <p className="title">{props.item.title}</p>
            <p className="speaker">{props.item.speaker}</p>
          </div>
          {/*<p className="description">{props.item.description}</p>*/}
        </div>
      </div>
    );
  }
};

const CalendarBox = (props) => {
  let events;
  let actualEvents;
  if (props.events) {
    events = props.events.map((item) => {
      let date = new Date(item.start);
      let minutes;
      let hours;
      if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
      } else {
        minutes = date.getMinutes();
      }
      if (date.getHours() < 10) {
        hours = "0" + date.getHours();
      } else {
        hours = date.getHours();
      }
      return {
        time: parseInt(hours) * 60 + parseInt(minutes),
        card: (
          <CalendarCard
            key={item._id}
            item={item}
            hours={hours}
            minutes={minutes}
            handleClick={props.handleClick}
            type="month"
          />
        ),
      };
    });
    const compare = (a, b) => {
      const itemA = a.time;
      const itemB = b.time;
      let comparison = 0;
      if (itemA > itemB) {
        comparison = 1;
      }
      if (itemB > itemA) {
        comparison = -1;
      }
      return comparison;
    };
    events.sort(compare);
    actualEvents = events.map((item) => {
      return item.card;
    });
  }

  return (
    <div className={"calendar-section " + props.type}>
      <p>{props.date}</p>
      <div className="events-div">{actualEvents}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { reduxState: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(loginAction(user));
    },
    logout: () => {
      dispatch(logoutAction());
    },
    header: (title) => {
      dispatch(headerAction(title));
    },
    openSide: () => {
      dispatch(openSidePageAction());
    },
    closeSide: () => {
      dispatch(closeSidePageAction());
    },
    setSide: (page) => {
      dispatch(sidePageAction(page));
    },
    addEvents: (list) => {
      dispatch(addEventList(list));
    },
    currentEventId: (eventId) => {
      dispatch(currentEventAction(eventId));
    },
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Events);

export default Presentational;
