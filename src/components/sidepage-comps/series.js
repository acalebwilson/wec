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

class Series extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getSeries = this.getSeries.bind(this);
  }

  componentDidMount() {
    this.getSeries();
  }

  getSeries() {
    axios.get("/api/getSeries").then((res) => {
      this.setState({ series: res.data.series });
    });
  }

  render() {
    return (
      <div className="side-page-content">
        <div className="side-page-section">
          <AddSeriesForm
            getSeries={this.getSeries}
            setFormActive={this.props.setFormActive}
            setFormInactive={this.props.setFormInactive}
            adminShowcaseMode={this.props.adminShowcaseMode}
          />
        </div>
        <div className="side-page-section side-page-list">
          <div className="admin-side-title">
            <h4>Current Series:</h4>
          </div>
          <ManageSeries series={this.state.series} />
        </div>
      </div>
    );
  }
}

class AddSeriesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValid: true,
      descriptionValid: true,
      title: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    switch (event.target.id) {
      case "series-title":
        this.setState({ title: event.target.value, titleValid: true });
        break;
      case "series-description":
        this.setState({
          description: event.target.value,
          descriptionValid: true,
        });
        break;
      default:
        break;
    }

    this.props.setFormActive();
  }

  validateForm() {
    let valid = true;
    let validObj = {
      titleValid: true,
      descriptionValid: true,
    };

    if (!this.state.title) {
      validObj.titleValid = false;
      valid = false;
    }
    if (!this.state.description) {
      validObj.descriptionValid = false;
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
      .post("/api/addSeries", {
        title: this.state.title,
        description: this.state.description,
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            title: "",
            description: "",
          });
          this.props.getSeries();
          this.props.setFormInactive();
        }
      });
  }

  render() {
    return (
      <form className="audio-form">
        <FormSection valid={this.state.titleValid}>
          <label htmlFor="series-title">Title:</label>
          <input
            type="text"
            id="series-title"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </FormSection>
        <FormSection valid={this.state.descriptionValid}>
          <label htmlFor="series-description">Description:</label>
          <textarea
            id="series-description"
            onChange={this.handleChange}
            value={this.state.description}
          />
        </FormSection>
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

class ManageSeries extends React.Component {
  sortSeries(series) {
    let seriesList = [...series];
    seriesList.sort(this.compare);
    return seriesList;
  }

  compare(a, b) {
    const seriesA = a.title.toUpperCase();
    const seriesB = b.title.toUpperCase();
    let comparison = 0;
    if (seriesA > seriesB) {
      comparison = 1;
    } else if (seriesA < seriesB) {
      comparison = -1;
    }
    return comparison;
  }

  render() {
    let series;
    if (this.props.series) {
      let seriesList = this.sortSeries(this.props.series);
      series = seriesList.map((item) => {
        return (
          <SeriesLine
            title={item.title}
            description={item.description}
            key={item.title}
          />
        );
      });
    }
    return <React.Fragment>{series}</React.Fragment>;
  }
}

const SeriesLine = (props) => {
  return (
    <div className="list-item">
      <p className="series-title title">{props.title}</p>
      <p className="series-description content">{props.description}</p>
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

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Series);

export default Presentational;
