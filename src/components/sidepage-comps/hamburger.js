import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  sidePageAction,
  closeSidePageAction,
  openSidePageAction,
} from "../../redux/actions";
import axios from "axios";

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logoutRequest = this.logoutRequest.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.closeSide();
    }
  }

  logoutRequest() {
    axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        console.log(res);
        this.props.logout();
      }
    });
  }

  render() {
    let login;
    if (
      this.props.reduxState.loggedIn === true ||
      this.props.reduxState.loggedIn === false
    ) {
      if (this.props.reduxState.loggedIn) {
        login = (
          <div className="login-btn" onClick={this.logoutRequest}>
            <p>Sign out</p>
          </div>
        );
      } else {
        login = (
          <div
            onClick={() => {
              this.props.setPage("login");
            }}
            className="login-btn"
          >
            <p>Sign in</p>
          </div>
        );
      }
    } else {
      login = <div />;
    }
    return (
      <div className="side-page-content hamburger-area">
        <div className="side-page-section hamburger-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/audio-library">Audio Library</Link>
          <Link to="/whats-on">What's On</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div
          className={`side-page-section hamburger-footer ${this.props.theme}`}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2317.6272178820377!2d-0.6196864835783704!3d54.487158796347494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487f177000e11b7d%3A0xe007f5506cde65a6!2sWhitby%20Evangelical%20Church!5e0!3m2!1sen!2suk!4v1584984881539!5m2!1sen!2suk"
          ></iframe>
          <div className="hamburger-contact-details">
            <p>Tel:</p>
            <p>01947 820772</p>
            <p>Address:</p>
            <p>
              12 Skinner Street, <br />
              Whitby, <br />
              North Yorkshire, <br />
              YO21 3AJ
            </p>
          </div>
        </div>
        <div className="side-page-section hamburger-copyright">
          <p>&copy; Whitby Evangelical Church 2020</p>
          {login}
        </div>
      </div>
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
    header: (type, title) => {
      dispatch(headerAction(type, title));
    },
    setPage: (page) => {
      dispatch(sidePageAction(page));
    },
    closeSide: () => {
      dispatch(closeSidePageAction());
    },
    openSide: () => {
      dispatch(openSidePageAction());
    },
  };
};

const PrePresentational = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hamburger);

const ConnectedToRouter = withRouter(PrePresentational);

export default ConnectedToRouter;
