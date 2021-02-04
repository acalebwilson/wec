import React from "react";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  openSidePageAction,
  closeSidePageAction,
  sidePageAction,
  audioListAction,
  addEventList,
} from "../../redux/actions";
import FormSection from "../formSection";
import axios from "axios";

class AddEvent extends React.Component {
  render() {
    return (
      <div className="side-page-content">
        <AddEventForm
          setSide={this.props.setSide}
          addEvents={this.props.addEvents}
          adminShowcaseMode={this.props.adminShowcaseMode}
        />
      </div>
    );
  }
}

class AddEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: null,
      title: "",
      type: "Choose Type",
      description: "",
      startTime: "",
      startDate: "",
      endTime: "",
      endDate: "",
      speaker: "",
      titleValid: true,
      typeValid: true,
      descriptionValid: true,
      startTimeValid: true,
      startDateValid: true,
    };
    this.getSpeakers = this.getSpeakers.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getSpeakers();
  }

  getSpeakers() {
    axios.get("/api/getSpeakers").then((res) => {
      this.setState({ speakers: res.data.speakers });
    });
  }

  sortSpeakers(speakers) {
    let speakerList = [...speakers];
    speakerList.sort(this.compare);
    return speakerList;
  }

  compare(a, b) {
    const speakerA = a.surname.toUpperCase();
    const speakerB = b.surname.toUpperCase();
    let comparison = 0;
    if (speakerA > speakerB) {
      comparison = 1;
    } else if (speakerA < speakerB) {
      comparison = -1;
    }
    return comparison;
  }

  handleChange(event) {
    switch (event.target.id) {
      case "event-title":
        this.setState({ title: event.target.value, titleValid: true });
        break;
      case "event-type":
        this.setState({ type: event.target.value, typeValid: true });
        break;
      case "event-description":
        this.setState({
          description: event.target.value,
          descriptionValid: true,
        });
        break;
      case "event-start-date":
        this.setState({ startDate: event.target.value, startDateValid: true });
        break;
      case "event-start-time":
        this.setState({ startTime: event.target.value, startTimeValid: true });
        break;
      case "event-end-date":
        this.setState({ endDate: event.target.value });
        break;
      case "event-end-time":
        this.setState({ endTime: event.target.value });
        break;
      case "event-speaker":
        this.setState({ speaker: event.target.value });
        break;
      default:
        break;
    }
  }

  handleSubmit() {
    if (!this.checkForm()) {
      return;
    }

    axios
      .post("/api/addEvent", {
        title: this.state.title,
        type: this.state.type,
        description: this.state.description,
        startDate: this.state.startDate,
        startTime: this.state.startTime,
        endDate: this.state.endDate,
        endTime: this.state.endTime,
        speaker: this.state.speaker,
      })
      .then((res) => {
        if (res.data.success) {
          this.props.setSide("audio-success");
          axios.get("/api/events").then((res) => {
            this.props.addEvents(res.data.events);
          });
        }
      });
  }

  checkForm() {
    let valid = true;
    let validObj = {
      titleValid: true,
      descriptionValid: true,
      typeValid: true,
      startDateValid: true,
      startTimeValid: true,
    };

    if (!this.state.title) {
      validObj.titleValid = false;
      valid = false;
    }
    if (!this.state.description) {
      validObj.descriptionValid = false;
      valid = false;
    }
    if (!this.state.startDate) {
      validObj.startDateValid = false;
      valid = false;
    }
    if (!this.state.startTime) {
      validObj.startTimeValid = false;
      valid = false;
    }
    if (this.state.type === "Choose Type") {
      validObj.typeValid = false;
      valid = false;
    }

    this.setState({ ...validObj });
    return valid;
  }

  render() {
    let typeOptions = [
      <option key="default" value="Choose Type">
        Choose Type
      </option>,
      <option key="service" value="sunday">
        Sunday Service
      </option>,
      <option key="regular-meeting" value="regular">
        Regular Church Meeting
      </option>,
      <option key="youth" value="youth">
        Children/Youth Work
      </option>,
      <option key="outreach" value="outreach">
        Outreach
      </option>,
      <option key="special" value="special">
        Special
      </option>,
    ];
    let defaultSpeaker = [
      <option value="Choose Speaker" key="Choose Speaker">
        Choose Speaker
      </option>,
    ];
    let speakers = [];
    if (this.state.speakers) {
      let speakerList = this.sortSpeakers(this.state.speakers);
      speakers = speakerList.map((item) => {
        return (
          <option key={item.fullName} value={item.fullName}>
            {item.fullName}
          </option>
        );
      });
    }
    speakers = [...defaultSpeaker, ...speakers];
    return (
      <form className="side-page-section audio-form">
        <FormSection valid={this.state.titleValid}>
          <label htmlFor="event-title">Title:</label>
          <input
            type="text"
            id="event-title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </FormSection>
        <FormSection valid={this.state.typeValid}>
          <label htmlFor="event-type">Type:</label>
          <select
            id="event-type"
            value={this.state.type}
            onChange={this.handleChange}
          >
            {typeOptions}
          </select>
        </FormSection>
        <FormSection valid={this.state.descriptionValid}>
          <label htmlFor="event-description">Description:</label>
          <textarea
            id="event-description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormSection>
        <p>Start:</p>
        <div className="form-section-date-time">
          <FormSection valid={this.state.startDateValid}>
            <label htmlFor="event-start-date">Date:</label>
            <input
              type="date"
              id="event-start-date"
              value={this.state.startDate}
              onChange={this.handleChange}
            />
          </FormSection>
          <FormSection valid={this.state.startTimeValid}>
            <label htmlFor="event-start-time">Time:</label>
            <input
              type="time"
              id="event-start-time"
              value={this.state.startTime}
              onChange={this.handleChange}
            />
          </FormSection>
        </div>
        <p>End:*</p>
        <div className="form-section-date-time">
          <FormSection valid>
            <label htmlFor="event-end-date">Date:</label>
            <input
              type="date"
              id="event-end-date"
              value={this.state.endDate}
              onChange={this.handleChange}
            />
          </FormSection>
          <FormSection valid>
            <label htmlFor="event-end-time">Time:</label>
            <input
              type="time"
              id="event-end-time"
              value={this.state.endTime}
              onChange={this.handleChange}
            />
          </FormSection>
        </div>
        <FormSection valid>
          <label htmlFor="event-speaker">Speaker:*</label>
          <select
            id="event-speaker"
            value={this.state.speaker}
            onChange={this.handleChange}
          >
            {speakers}
          </select>
        </FormSection>
        <p className="footnote">*optional field</p>
        <button
          className={`upload ${this.props.adminShowcaseMode ? "disabled" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          {this.props.adminShowcaseMode ? "Showcase Mode" : "Add"}
        </button>
      </form>
    );
  }
}

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
    header: (headerClass, title) => {
      dispatch(headerAction(headerClass, title));
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
    setAudioList: (list) => {
      dispatch(audioListAction(list));
    },
    addEvents: (list) => {
      dispatch(addEventList(list));
    },
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(AddEvent);

export default Presentational;
