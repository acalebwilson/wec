import React from 'react'

const EventDetails = (props) => {
  const getDayStr = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Not today!";
    }
  };

  const getMonthStr = (month) => {
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

  const getDateStr = (date) => {
    let dateStr = "";
    let finalNum = date.toString()[date.toString().length - 1];
    if (finalNum === "1") {
      dateStr = date.toString() + "st";
    } else if (finalNum === "2") {
      dateStr = date.toString() + "nd";
    } else if (finalNum === "3") {
      dateStr = date.toString() + "rd";
    } else {
      dateStr = date.toString() + "th";
    }
    return dateStr;
  };

  const getTimeStr = (hours, minutes) => {
    let hourStr = "",
      minuteStr = "";
    if (hours < 10) {
      hourStr = `0${hours}`;
    } else {
      hourStr = hours;
    }

    if (minutes < 10) {
      minuteStr = `0${minutes}`;
    } else {
      minuteStr = minutes;
    }

    return `${hourStr}:${minuteStr}`;
  };

  let time;
  let timeStr = "";
  if (props.details.start) {
    time = new Date(props.details.start);
    timeStr = `${getDayStr(time.getDay())}, ${getDateStr(
      time.getDate()
    )} ${getMonthStr(time.getMonth())} at ${getTimeStr(
      time.getHours(),
      time.getMinutes()
    )}`;
  }
  let speaker = "";
  if (props.details.speaker) {
    speaker = " - " + props.details.speaker;
  }

  let eventDetailsClassName;
  if (props.width < 747) {
    eventDetailsClassName = props.showEventDetails;
  }

  let content = <div />;
  if (!props.details.title) {
    content = (
      <div className="event-details placeholder">
        <p className="placeholder">Click an event to view details</p>
      </div>
    );
  } else {
    content = (
      <React.Fragment>
        <div className={`event-details ${props.details.type}`}>
          <h3 className={`title ${props.details.type}`}>{props.details.title}</h3>
          <p className="time">
            {timeStr}
            {speaker}
          </p>
          {/*<p className="speaker">{props.speaker}</p>*/}
          <p className="description">{props.details.description}</p>
        </div>
      </React.Fragment>
    );
  }
  return (
    <div className={`event-details-wrapper ${eventDetailsClassName}`}>
      {content}
    </div>
  );
};

export default EventDetails;