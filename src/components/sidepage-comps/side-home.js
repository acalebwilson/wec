import React from "react";
import Audio from "./audio";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  openSidePageAction,
  sidePageAction,
} from "../../redux/actions";
import Login from "./login-new";
import Speaker from "./speakers";
import Series from "./series";
import AddEvent from "./add-event";
import Hamburger from "./hamburger";
import EventDetails from "../calendar-event-focus";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class SideHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: "login",
      details: {},
    };
    this.setPage = this.setPage.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  setPage(event) {
    this.setState({ component: event.target.id });
  }

  componentDidUpdate(prevProps) {
    /*if (this.state.details) {
      if ((this.state.details._id !== this.props.reduxState.eventId) && this.props.reduxState.eventId) {
        let details = this.props.reduxState.eventList.filter(d => {
          return d._id === this.props.reduxState.eventId
        })
        this.setState({details})
      }
    }*/
    let details = this.props.reduxState.eventList.filter((d) => {
      return d._id === this.props.reduxState.eventId;
    })[0];
    if (!this.state.details.title && this.props.reduxState.eventId) {
      this.setState({ details });
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.closeSide();
    }
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

  render() {
    let page;
    let title;
    switch (this.props.reduxState.sidePage) {
      case "add audio":
        title = "Add Audio";
        page = (
          <Audio
            closeSide={this.props.closeSide}
            type="new"
            getSermons={this.props.getSermons}
            cancelForm={this.props.cancelForm}
            setFormActive={this.props.setFormActive}
            setFormInactive={this.props.setFormInactive}
            showAreYouSure={this.props.showAreYouSure}
            resetFormData={this.props.resetFormData}
            formActive={this.props.formActive}
            showAreYouSureState={this.props.showAreYouSureState}
          />
        );
        break;
      case "add series":
        title = "Add Series";
        page = (
          <Series
            areYouSure={this.props.areYouSure}
            setFormActive={this.props.setFormActive}
            setFormInactive={this.props.setFormInactive}
          />
        );
        break;
      case "add speaker":
        title = "Add Speaker";
        page = (
          <Speaker
            areYouSure={this.props.areYouSure}
            setFormActive={this.props.setFormActive}
            setFormInactive={this.props.setFormInactive}
          />
        );
        break;
      case "add event":
        title = "Add Event";
        page = <AddEvent areYouSure={this.props.areYouSure} />;
        break;
      case "login":
        title = "Login";
        page = (
          <Login setPage={this.setPage} closeSide={this.props.closeSide} />
        );
        break;
      case "home":
        title = "Home";
        page = <Home setPage={this.setPage} closeSide={this.props.closeSide} />;
        break;
      case "audio-success":
        title = "Success!";
        page = (
          <AudioSuccess
            setPage={this.setPage}
            closeSide={this.props.closeSide}
            setSide={this.props.setSide}
          />
        );
        break;
      case "edit audio":
        title = "Edit Audio";
        page = (
          <Audio
            setPage={this.setPage}
            closeSide={this.props.closeSide}
            getSermons={this.props.getSermons}
            cancelForm={this.props.cancelForm}
            setFormActive={this.props.setFormActive}
            setFormInactive={this.props.setFormInactive}
            showAreYouSure={this.props.showAreYouSure}
            resetFormData={this.props.resetFormData}
            formActive={this.props.formActive}
            showAreYouSureState={this.props.showAreYouSureState}
            type="edit"
          />
        );
        break;
      case "login success":
        title = "Success!";
        page = (
          <Home setSide={this.props.setSide} closeSide={this.props.closeSide} />
        );
        break;
      case "hamburger":
        title = "Menu";
        page = (
          <Hamburger
            closeSide={this.props.closeSide}
            theme={this.props.reduxState.theme}
          />
        );
        break;
      case "event-details":
        title = "Details";
        page = (
          <div className="event-details-sidepage-wrapper">
            <EventDetails
              details={this.props.reduxState.event}
              getMonthStr={this.getMonthStr}
              setBodyScroll={this.props.setBodyScroll}
              setBodyNoScroll={this.props.setBodyNoScroll}
              width={this.props.reduxState.width}
              displayType="sidepage"
            />
          </div>
        );
        break;
      default:
        page = <div />;
    }
    return (
      <React.Fragment>
        <div
          className={`side-exit ${this.props.reduxState.theme}`}
          onClick={this.props.closeSide}
        >
          <div className="icon">
            <i className="fas fa-times" />
          </div>
          <h4>{title}</h4>
        </div>
        {page}
      </React.Fragment>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    this.setState({
      timeOut: setTimeout(() => {
        console.log("calling!");
        this.props.closeSide();
      }, 1000),
    });
  }

  componentWillUnmount() {
    console.log("Clearing that timeout!")
    clearTimeout(this.state.timeOut);
  }

  render() {
    return (
      <div className="side-page-content">
        <div className="side-page-section">
          <h1>Signed In!</h1>
        </div>
      </div>
    );
  }
}

const AudioSuccess = (props) => {
  setTimeout(() => {
    props.closeSide();
  }, 1000);
  return (
    <div>
      <h4>Success!</h4>
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
    header: (headerClass, title) => {
      dispatch(headerAction(headerClass, title));
    },
    openSide: () => {
      dispatch(openSidePageAction());
    },
    setSide: (page) => {
      dispatch(sidePageAction(page));
    },
  };
};

const PrePresentational = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideHome);

const Presentational = withRouter(PrePresentational);

export default Presentational;
