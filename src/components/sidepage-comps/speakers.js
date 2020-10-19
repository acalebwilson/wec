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
} from "../../redux/actions";
import FormSection from "../formSection";
import axios from "axios";

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getSpeakers = this.getSpeakers.bind(this);
  }

  componentDidMount() {
    this.getSpeakers();
  }

  getSpeakers() {
    axios.get("/api/getSpeakers").then((res) => {
      this.setState({ speakers: res.data.speakers });
    });
  }

  render() {
    return (
      <div className="side-page-content">
        <div className="side-page-section">
          <AddSpeakerForm
            getSpeakers={this.getSpeakers}
            setFormInactive={this.props.setFormActive}
            setFormActive={this.props.setFormActive}
          />
        </div>
        <div className="side-page-section side-page-list">
          <div className="admin-side-title">
            <h4>Current Speakers:</h4>
          </div>
          <ManageSpeakers
            speakers={this.state.speakers}
            getSpeakers={this.getSpeakers}
          />
        </div>
      </div>
    );
  }
}

class AddSpeakerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      church: "",
      firstValid: true,
      lastValid: true,
      churchValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.id) {
      case "speaker-first":
        this.setState({ first: event.target.value, firstValid: true });
        break;
      case "speaker-last":
        this.setState({ last: event.target.value, lastValid: true });
        break;
      case "speaker-church":
        this.setState({ church: event.target.value, churchValid: true });
        break;
      default:
        break;
    }
    this.props.setFormActive();
  }

  validateForm() {
    let valid = true;
    let validObj = {
      firstValid: true,
      lastValid: true,
      churchValid: true,
    };

    if (!this.state.first) {
      validObj.firstValid = false;
      valid = false;
    }
    if (!this.state.last) {
      validObj.lastValid = false;
      valid = false;
    }
    if (!this.state.church) {
      validObj.churchValid = false;
      valid = false;
    }

    this.setState({ ...validObj });
    return valid;
  }

  handleSubmit() {
    if (!this.validateForm()) {
      return;
    }
    axios
      .post("/api/addSpeaker", {
        first: this.state.first,
        surname: this.state.last,
        fullName: `${this.state.first} ${this.state.last}`,
        church: this.state.church,
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            first: "",
            last: "",
            church: "",
          });
          this.props.getSpeakers();
          this.props.setFormInactive();
        }
      });
  }

  render() {
    return (
      <form className="audio-form">
        <FormSection valid={this.state.firstValid}>
          <label htmlFor="speaker-first">First Name:</label>
          <input
            type="text"
            id="speaker-first"
            onChange={this.handleChange}
            value={this.state.first}
          />
        </FormSection>
        <FormSection valid={this.state.lastValid}>
          <label htmlFor="speaker-last">Last Name:</label>
          <input
            type="text"
            id="speaker-last"
            onChange={this.handleChange}
            value={this.state.last}
          />
        </FormSection>
        <FormSection valid={this.state.churchValid}>
          <label htmlFor="speaker-church">Church:</label>
          <input
            type="text"
            id="speaker-church"
            onChange={this.handleChange}
            value={this.state.church}
          />
        </FormSection>
        <button
          className="upload"
          onClick={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          Add
        </button>
      </form>
    );
  }
}

class ManageSpeakers extends React.Component {
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

  render() {
    let speakers;
    if (this.props.speakers) {
      let speakerList = this.sortSpeakers(this.props.speakers);
      speakers = speakerList.map((item) => {
        return (
          <SpeakerLine
            speaker={item.fullName}
            key={item.fullName}
            church={item.church}
          />
        );
      });
    }
    return <React.Fragment>{speakers}</React.Fragment>;
  }
}

const SpeakerLine = (props) => {
  return (
    <div className="list-item">
      <p className="speaker-name title">{props.speaker}</p>
      <p className="speaker-church content">{props.church}</p>
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
    closeSide: () => {
      dispatch(closeSidePageAction());
    },
    setSide: (page) => {
      dispatch(sidePageAction(page));
    },
    setAudioList: (list) => {
      dispatch(audioListAction(list));
    },
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Speaker);

export default Presentational;
