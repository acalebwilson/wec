import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  loginAction,
  logoutAction,
  openSidePageAction,
  closeSidePageAction,
  sidePageAction,
  sidePageThemeAction
} from "../redux/actions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerClass: "",
    };
    this.hamburgerToggle = this.hamburgerToggle.bind(this);
  }

  componentDidMount() {}

  hamburgerToggle() {
    this.props.setSide("hamburger");
    //this.props.setSidePageTheme("dark")
    this.props.openSide();
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  //let loginMain = props.reduxState.loggedIn ? <Link to="/admin">Admin</Link> : <Link to="/login">Login</Link>

  render() {
    let className;
    if (this.props.location.pathname === "/home") {
      className = "";
    } else {
      className = "small";
    }

    let ham;
    if (this.props.reduxState.width < 747) {
      ham = (
        <div id="hamburger-menu" className={this.state.hamburgerClass}>
          <ul>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/whats-on">What's On</Link>
            </li>
          </ul>
        </div>
      );
    } else {
      ham = (
        <div id="hamburger-menu" className={this.state.hamburgerClass}></div>
      );
    }

    const linkDetails = [
      {
        text: "Who We Are",
        path: "/about",
      },
      {
        text: "Audio Library",
        path: "/audio-library",
      },
      {
        text: "What's On",
        path: "/whats-on",
      },
      {
        text: "Get In Touch",
        path: "/contact",
      },
    ];

    let links = linkDetails.map((d, i) => {
      let active = "";
      if (this.props.location.pathname === d.path) {
        active = "active";
      }
      return (
        <div className={`link-wrapper ${active}`} key={d.path}>
          <Link to={d.path}>{d.text}</Link>
        </div>
      );
    });

    return (
      <header className={className}>
        <div id="bg-img" />
        <div id="bg-mask" />
        <div id="grid">
          <div id="top-bar-wrapper">
            <div id="top-bar">
              <div className="logo normal">
                <Link to="/home">Whitby Evangelical Church</Link>
              </div>
              <div className="logo small">
                <Link to="/">WEC</Link>
              </div>
              <nav>
                {links}
                <i
                  className="fas fa-bars"
                  id="hamburger"
                  onClick={this.hamburgerToggle}
                ></i>
              </nav>
            </div>
            {ham}
            <div id="headlines">
              <h1>Welcome</h1>
              <h3>To Whitby Evangelical Church</h3>
              <Link to="/audio-library">
                <button className="btn primary-btn">Listen Online</button>
              </Link>
              <Link to="/about">
                <button className="btn secondary-btn">About Us</button>
              </Link>
            </div>
          </div>
        </div>
        <div id="title">
          <div id="svg-div">
            <i className={this.props.icon} />
          </div>
          <h1>{this.props.reduxState.headerTitle}</h1>
        </div>
      </header>
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
    openSide: () => {
      dispatch(openSidePageAction());
    },
    closeSide: () => {
      dispatch(closeSidePageAction());
    },
    setSide: (page) => {
      dispatch(sidePageAction(page));
    },
    setSidePageTheme: (theme) => {
      dispatch(sidePageThemeAction(theme))
    }
  };
};

const PrePresentational = connect(mapStateToProps, mapDispatchToProps)(Header);

const Presentational = withRouter(PrePresentational);

export default Presentational;
