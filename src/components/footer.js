import React from "react";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  sidePageAction,
  closeSidePageAction,
  openSidePageAction,
} from "../redux/actions";
import axios from "axios";

const Footer = (props) => {
  let login;

  const logoutRequest = () => {
    axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        props.logout();
      }
    });
  };

  if (props.loggedIn === true || props.loggedIn === false) {
    if (props.loggedIn) {
      login = (
        <div className="login-btn" onClick={logoutRequest}>
          <p>Sign out</p>
        </div>
      );
    } else {
      login = (
        <div
          onClick={() => {
            props.setPage("login");
            props.openSide();
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

  if (props.width < 747) {
      return <div />
  }

  return (
    <div id="footer" style={{ paddingBottom: `${20 + props.paddingBottom}px` }}>
      <div className="inner-wrapper">
        <section>
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Who We Are</li>
            <li>Listen Online</li>
            <li>What's On</li>
            <li>Calendar</li>
            <li>News</li>
            <li>Contact</li>
          </ul>
        </section>
        <section>
          <h4>Contact</h4>
          <ul>
            <li>01947 820772</li>
            <li>
              12 Skinner Street, <br />
              Whitby, <br />
              North Yorkshire, <br />
              YO21 3AJ
            </li>
          </ul>
        </section>
        <section id="footer-map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2317.6272178820377!2d-0.6196864835783704!3d54.487158796347494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487f177000e11b7d%3A0xe007f5506cde65a6!2sWhitby%20Evangelical%20Church!5e0!3m2!1sen!2suk!4v1584984881539!5m2!1sen!2suk"
          ></iframe>
        </section>
      </div>
      <div className="inner-wrapper" id="bottom-bar">
        <p>&copy; Whitby Evangelical Church 2020</p>
        {login}
      </div>
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

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default Presentational;
