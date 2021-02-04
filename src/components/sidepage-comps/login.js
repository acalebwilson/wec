import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  sidePageAction,
  closeSidePageAction,
} from "../../redux/actions";
import FormSection from "../formSection";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {}

  onClick(event) {
    event.preventDefault();
    this.login();
  }

  login() {
    //console.log(this.state.email, this.state.password)
    this.setState({ loading: true });
    axios
      .post("/api/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.login(res.data.user);
          this.props.setPage("login success");
        } else {
          this.setState({
            message:
              "The username or password was incorrect, please enter correct details.",
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        this.setState({
          message: "The username or password was incorrect, please enter correct details.",
          email: "",
          password: "",
          loading: false
        });
      });
  }

  onChange(event) {
    //console.log(event.target.id, event.target.value)
    switch (event.target.id) {
      case "lgn-email":
        this.setState({ ...this.state, email: event.target.value });
        break;
      case "lgn-password":
        this.setState({ ...this.state, password: event.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    let form;
    let button;
    if (this.state.loading) {
      button = (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    } else {
      button = (
        <button
          onClick={(e) => {
            e.preventDefault();
            this.login();
          }}
        >
          Sign In
        </button>
      );
    }
    let message = <div />;
    if (this.state.message) {
      message = <p className="error-message">{this.state.message}</p>;
    }
    return (
      <div className="side-page-content">
      <form className="side-page-section audio-form login">
        <FormSection valid>
          <label htmlFor="lgn-email">Email:</label>
          <input
            type="email"
            id="lgn-email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </FormSection>
        <FormSection valid>
          <label htmlFor="lgn-password">Password:</label>
          <input
            type="password"
            id="lgn-password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </FormSection>
        {message}
        {button}
      </form>
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
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Presentational;
