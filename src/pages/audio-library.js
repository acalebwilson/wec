
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import AdminTools from "../components/admin-tools";
import {
  headerAction,
  addAudioAction,
  playAudioAction,
  audioToEditAction,
  clearAudioToEditAction,
  pauseAudioAction,
  audioTimeAction,
  audioVolumeAction,
  sidePageAction,
  openSidePageAction,
  closeSidePageAction,
  audioListAction,
  audioUploadDateAction,
  audioUploadReferencesAction,
  audioUploadSeriesAction,
  audioUploadTypeAction,
  audioUploadSpeakerAction,
  audioEditIdAction
} from "../redux/actions";
import Breadcrumb from "../components/breadcrumbs";

class AudioLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sermons: null,
      filteredSermons: null,
      more: null,
      nextPage: 1,
      search: {
        book: "All",
        series: "All",
        speaker: "All",
        fromDate: "",
        toDate: "",
      },
      loading: true,
      filtered: false,
      page: 1,
      showNotification: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSermons = this.getSermons.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.sliceByPage = this.sliceByPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this.state.filtered && this.props.reduxState.audioList) {
      this.handleFilter();
    } else if (
      this.props.reduxState.audioList !== prevProps.reduxState.audioList
    ) {
      this.handleFilter();
    }
  }

  componentDidMount() {
    if (this.props.reduxState.audioList) {
      this.handleFilter();
    } else {
      this.getSermons();
    }

    axios.get("/api/sermons/data").then((res) => {
      this.setState({
        books: res.data.books,
        series: res.data.series,
        speakers: res.data.speakers,
      });
    });

    document.addEventListener("keydown", this.handleKeypress);

    this.props.header("Audio Library")
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeypress);
  }

  handleKeypress(e) {
    if (e.key === "ArrowLeft") {
      this.nextPage();
    } else if (e.key === "ArrowRight") {
      this.prevPage();
    }
  }

  getSermons() {
    axios.get("/api/sermons").then((res) => {
      this.setState({
        sermons: res.data.sermons,
      });
      this.props.setAudioList(res.data.sermons);
    });
    axios.get("/api/sermons/data").then((res) => {
      this.setState({
        books: res.data.books,
        series: res.data.series,
        speakers: res.data.speakers,
      });
    });
  }

  handleChange(event) {
    switch (event.target.id) {
      case "search-book":
        this.setState({
          search: {
            ...this.state.search,
            book: event.target.value,
          },
          filtered: false,
        });
        break;
      case "search-series":
        this.setState({
          search: {
            ...this.state.search,
            series: event.target.value,
          },
          filtered: false,
        });
        break;
      case "search-speaker":
        this.setState({
          search: {
            ...this.state.search,
            speaker: event.target.value,
          },
          filtered: false,
        });
        break;
      case "from-date":
        this.setState({
          search: {
            ...this.state.search,
            fromDate: event.target.value,
          },
          filtered: false,
        });
        break;
      case "to-date":
        this.setState({
          search: {
            ...this.state.search,
            toDate: event.target.value,
          },
          filtered: false,
        });
        break;
      default:
        break;
    }
  }

  filterByBook(book, sermons) {
    let filteredSermons = [];
    sermons.forEach((item) => {
      let valid = false;
      item.references.forEach((item) => {
        if (item.type === "passage") {
          if (
            item.details.startBook === book ||
            item.details.endBook === book
          ) {
            valid = true;
          }
        } else {
          if (item.details.book === book) {
            valid = true;
          }
        }
      });
      if (valid) {
        filteredSermons = [...filteredSermons, item];
      }
    });
    return filteredSermons;
  }

  filterBySeries(series, sermons) {
    let filteredSermons = [];
    sermons.map((item) => {
      if (item.series === series) {
        filteredSermons = [...filteredSermons, item];
      }
      return item;
    });
    return filteredSermons;
  }

  filterBySpeaker(speaker, sermons) {
    let filteredSermons = [];
    sermons.map((item) => {
      if (item.speaker === speaker) {
        filteredSermons = [...filteredSermons, item];
      }
      return item;
    });
    return filteredSermons;
  }

  filterFrom(from, sermons) {
    let filteredSermons = [];
    let fromDate = new Date(from);
    sermons.forEach((item) => {
      let date = new Date(item.date);
      if (date >= fromDate) {
        filteredSermons = [...filteredSermons, item];
      }
    });
    return filteredSermons;
  }

  filterTo(to, sermons) {
    let filteredSermons = [];
    let toDate = new Date(to);
    sermons.forEach((item) => {
      let date = new Date(item.date);
      if (date <= toDate) {
        filteredSermons = [...filteredSermons, item];
      }
    });
    return filteredSermons;
  }

  sortByDate(sermons) {
    let unsortedSermons = [...sermons];
    let sortedSermons = [];
    while (unsortedSermons.length > 0) {
      let mostRecent = new Date(1900, 1, 1);
      let mostRecentIdx;
      unsortedSermons.forEach((item, index) => {
        let date = new Date(item.date);
        if (
          date.getMonth() === mostRecent.getMonth() &&
          date.getDate() === mostRecent.getDate()
        ) {
          if (item.service === "Morning") {
            mostRecent = date;
            mostRecentIdx = index;
          }
        } else if (date > mostRecent) {
          mostRecent = date;
          mostRecentIdx = index;
        }
      });
      sortedSermons = [...sortedSermons, unsortedSermons[mostRecentIdx]];
      let unsortedSermonsBefore = unsortedSermons.slice(0, mostRecentIdx);
      let unsortedSermonsAfter = unsortedSermons.slice(
        mostRecentIdx + 1,
        unsortedSermons.length
      );
      unsortedSermons = [...unsortedSermonsBefore, ...unsortedSermonsAfter];
    }

    return sortedSermons;
  }

  sliceByPage(sermons) {
    if (this.state.page * 10 < sermons.length) {
      let slicedSermons = sermons.slice(
        (this.state.page - 1) * 10,
        this.state.page * 10
      );
      return slicedSermons;
    } else {
      let slicedSermons = sermons.slice(
        (this.state.page - 1) * 10,
        sermons.length
      );
      return slicedSermons;
    }
  }

  handleFilter() {
    let sermons = [...this.props.reduxState.audioList];
    if (this.state.search.book !== "All") {
      sermons = this.filterByBook(this.state.search.book, sermons);
    }
    if (this.state.search.series !== "All") {
      sermons = this.filterBySeries(this.state.search.series, sermons);
    }
    if (this.state.search.speaker !== "All") {
      sermons = this.filterBySpeaker(this.state.search.speaker, sermons);
    }
    if (this.state.search.fromDate !== "") {
      sermons = this.filterFrom(this.state.search.fromDate, sermons);
    }
    if (this.state.search.toDate !== "") {
      sermons = this.filterTo(this.state.search.toDate, sermons);
    }

    sermons = this.sortByDate(sermons);
    let slicedSermons = this.sliceByPage(sermons);

    this.setState({
      filteredSermons: sermons,
      slicedSermons: slicedSermons,
      filtered: true,
    });
  }

  nextPage() {
    if (this.state.filteredSermons.length > this.state.page * 10) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.handleFilter();
      });
    }
  }

  prevPage() {
    if (this.state.page !== 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        this.handleFilter();
      });
    }
  }

  closeNotification() {
    this.setState({ showNotification: false });
  }

  render() {
    let audioCards = <div />;
    if (this.state.slicedSermons) {
      audioCards = this.state.slicedSermons.map((item, key) => {
        if (this.props.reduxState.audio) {
          if (item._id === this.props.reduxState.audio._id) {
            return (
              <AudioCard
                audio={item}
                key={item.url}
                addAudio={this.props.addAudio}
                playAudio={this.props.playAudio}
                pauseAudio={this.props.pauseAudio}
                reduxAudio={this.props.reduxState.audio}
                type="active"
                isPlaying={this.props.reduxState.isPlaying}
                loggedIn={this.props.reduxState.loggedIn}
                audioToEdit={this.props.audioToEdit}
                openSide={this.props.openSide}
                setSide={this.props.setSide}
                getSermons={this.getSermons}
                addAudioDate={this.props.addAudioDate}
                addAudioSeries={this.props.addAudioSeries}
                addAudioSpeaker={this.props.addAudioSpeaker}
                addAudioType={this.props.addAudioType}
                addAudioReferences={this.props.addAudioReferences}
                audioEditId={this.props.audioEditId}
              />
            );
          }
        }
        return (
          <AudioCard
            audio={item}
            key={item.url + key}
            addAudio={this.props.addAudio}
            playAudio={this.props.playAudio}
            reduxAudio={this.props.reduxState.audio}
            pauseAudio={this.props.pauseAudio}
            isPlaying={this.props.reduxState.isPlaying}
            loggedIn={this.props.reduxState.loggedIn}
            audioToEdit={this.props.audioToEdit}
            openSide={this.props.openSide}
            setSide={this.props.setSide}
            getSermons={this.getSermons}
            addAudioDate={this.props.addAudioDate}
            addAudioSeries={this.props.addAudioSeries}
            addAudioSpeaker={this.props.addAudioSpeaker}
            addAudioType={this.props.addAudioType}
            addAudioReferences={this.props.addAudioReferences}
            audioEditId={this.props.audioEditId}
          />
        );
      });
    } else if (this.state.loading) {
      audioCards = <div id="loading">Loading...</div>;
    }
    let bookList = [
      <option key="default-book" value="All">
        All
      </option>,
    ];
    if (this.state.books) {
      this.state.books.map((item) => {
        bookList = [
          ...bookList,
          <option key={item} value={item}>
            {item}
          </option>,
        ];
        return item;
      });
    }

    let seriesList = [
      <option key="default-series" value="All">
        All
      </option>,
    ];
    if (this.state.series) {
      this.state.series.map((item) => {
        seriesList = [
          ...seriesList,
          <option key={item} value={item}>
            {item}
          </option>,
        ];
        return item;
      });
    }

    let speakerList = [
      <option key="default-series" value="All">
        All
      </option>,
    ];
    if (this.state.speakers) {
      this.state.speakers.map((item) => {
        speakerList = [
          ...speakerList,
          <option key={item} value={item}>
            {item}
          </option>,
        ];
        return item;
      });
    }

    let prevStyle = "";
    if (this.state.page === 1) {
      prevStyle = " disabled";
    }
    let nextStyle = "";
    if (this.state.filteredSermons) {
      if (this.state.filteredSermons.length < this.state.page * 10) {
        nextStyle = " disabled";
      }
    }
    return (
      <div id="test-test">
        <div id="background-audio" />
        <main id="main-wrapper">
          <Breadcrumb location={this.props.location} />
          <AdminTools
            reduxState={this.props.reduxState}
            setSide={this.props.setSide}
            openSide={this.props.openSide}
            location={this.props.location}
          />
          <div className="section-wrapper">
            <div id="audio-main" className="inner-wrapper">
              <section id="find-audio">
                <p id="find-title">Find a sermon...</p>
                <div id="section-wrapper">
                  <div className="search-section" id="book">
                    <label htmlFor="search-book">Book:</label>
                    <select
                      id="search-book"
                      value={this.state.search.book}
                      onChange={this.handleChange}
                    >
                      {bookList}
                    </select>
                  </div>
                  <div className="search-section" id="series">
                    <label htmlFor="search-series">Series:</label>
                    <select
                      id="search-series"
                      value={this.state.search.series}
                      onChange={this.handleChange}
                    >
                      {seriesList}
                    </select>
                  </div>
                  <div className="search-section" id="speaker">
                    <label htmlFor="search-series">Speaker:</label>
                    <select
                      id="search-speaker"
                      value={this.state.search.speaker}
                      onChange={this.handleChange}
                    >
                      {speakerList}
                    </select>
                  </div>
                  <div className="search-section">
                    <label htmlFor="search-date" id="from-label">
                      From:
                    </label>
                    <input
                      type="date"
                      id="from-date"
                      onChange={this.handleChange}
                      value={this.state.search.fromDate}
                    />
                  </div>
                  <div className="search-section">
                    <label htmlFor="search-date" id="to-label">
                      To:
                    </label>
                    <input
                      type="date"
                      id="to-date"
                      onChange={this.handleChange}
                      value={this.state.search.toDate}
                    />
                  </div>
                </div>
              </section>
              <h4>Most recent sermons:</h4>
              <section id="audio-card-container">{audioCards}</section>
              <section id="buttons">
                <button onClick={this.nextPage} className={nextStyle}>
                  &lt;
                </button>
                <button onClick={this.prevPage} className={prevStyle}>
                  &gt;
                </button>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

class AudioCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  handleClick() {
    if (this.props.audio !== this.props.reduxAudio) {
      this.props.addAudio(this.props.audio);
      this.props.playAudio();
    } else if (!this.props.isPlaying) {
      this.props.playAudio();
    } else {
      this.props.pauseAudio();
    }
  }

  async deleteCard() {
    await axios.post("/api/deleteAudio", {
      filename: this.props.audio.filename,
      _id: this.props.audio._id,
    });

    this.props.getSermons();
  }

  dateString(dt) {
    let date = new Date(dt);
    let dayOfMonth = date.getDate();
    let dayOfWeek = date.getDay();
    let month = date.getMonth();
    let dayString = "";
    let monthString = "";

    let dayArr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

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

    dayString = dayArr[dayOfWeek];
    monthString = monthArr[month];
    let lastDayNum = dayOfMonth.toString()[dayOfMonth.toString().length - 1];

    if (lastDayNum === "1") {
      dayOfMonth += "st";
    } else if (lastDayNum === "2") {
      dayOfMonth += "nd";
    } else if (lastDayNum === "3" && dayOfMonth.toString()[0] !== "1") {
      dayOfMonth += "rd";
    } else {
      dayOfMonth += "th";
    }

    return `${dayString} ${dayOfMonth} ${monthString}`;
  }

  render() {
    let deleteBtn = <div />;
    let edit = <div />;
    if (this.props.loggedIn) {
      edit = (
        <button
          onClick={() => {
            let date = new Date(this.props.audio.date)
            let dayStr;
            let monthStr;
            if (date.getDate() < 10) {
                dayStr = `0${date.getDate().toString()}`
            } else {
                dayStr = date.getDate().toString()
            }

            if ((date.getMonth()+1) < 10) {
                monthStr = `0${(date.getMonth()+1).toString()}`
            } else {
                monthStr = (date.getMonth()+1).toString()
            }
            let dateStr = `${date.getFullYear().toString()}-${monthStr}-${dayStr}`
            this.props.addAudioDate(dateStr)
            this.props.audioEditId(this.props.audio._id)
            this.props.addAudioSeries(this.props.audio.series)
            this.props.addAudioSpeaker(this.props.audio.speaker)
            this.props.addAudioType(this.props.audio.service)
            this.props.addAudioReferences(this.props.audio.references)
            this.props.setSide("edit audio");
            this.props.openSide();
          }}
        >
          Edit
        </button>
      );
      deleteBtn = <button onClick={this.deleteCard}>Delete</button>;
    }
    let icon;
    if (this.props.type === "active" && this.props.isPlaying) {
      icon = <i className="fas fa-pause"></i>;
    } else {
      icon = <i className="fas fa-play"></i>;
    }
    return (
      <div className={"audio-card " + this.props.type}>
        <button onClick={this.handleClick}>{icon}</button>
        <p className="reference left audio-card-item">
          {this.props.audio.references[0].refString}
        </p>
        <p className="speaker left audio-card-item">
          {this.props.audio.speaker}
        </p>
        <p className="date right audio-card-item">
          {this.dateString(this.props.audio.date)} - {this.props.audio.service}
        </p>
        <div className="button-div">
          {edit}
          {deleteBtn}
          <button>Download</button>
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
    addAudio: (audio) => {
      dispatch(addAudioAction(audio));
    },
    playAudio: () => {
      dispatch(playAudioAction());
    },
    pauseAudio: () => {
      dispatch(pauseAudioAction());
    },
    audioTime: (time) => {
      dispatch(audioTimeAction());
    },
    audioVolume: (volume) => {
      dispatch(audioVolumeAction());
    },
    header: (headerClass, title, icon) => {
      dispatch(headerAction(headerClass, title, icon));
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
    audioToEdit: (audio) => {
      dispatch(audioToEditAction(audio));
    },
    clearAudioToEdit: () => {
      dispatch(clearAudioToEditAction());
    },
    addAudioSpeaker: (speaker) => {
      dispatch(audioUploadSpeakerAction(speaker));
    },
    addAudioDate: (date) => {
      dispatch(audioUploadDateAction(date));
    },
    addAudioReferences: (references) => {
      dispatch(audioUploadReferencesAction(references));
    },
    addAudioType: (type) => {
      dispatch(audioUploadTypeAction(type));
    },
    addAudioSeries: (series) => {
      dispatch(audioUploadSeriesAction(series));
    },
    audioEditId: (id) => {
        dispatch(audioEditIdAction(id))
    }
  };
};

const Presentational = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioLibrary);

export default Presentational;
