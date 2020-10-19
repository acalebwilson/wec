import React from "react";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  openSidePageAction,
  sidePageAction,
  audioListAction,
  addAudioFileToUpload,
  uploadedAudioFileData,
  audioUploadDateAction,
  audioUploadTypeAction,
  audioUploadReferencesAction,
  audioUploadSeriesAction,
  audioUploadSpeakerAction,
  audioUploadDataReady,
} from "../../redux/actions";
import FormSection from "../formSection";
import axios from "axios";

class Audio extends React.Component {
  render() {
    return (
      <div className="side-page-content">
        <div className="side-page-section audio-form">
          <AudioForm
            setSide={this.props.setSide}
            setAudioList={this.props.setAudioList}
            addAudioToUpload={this.props.addAudioToUpload}
            addAudioFileData={this.props.addAudioFileData}
            reduxState={this.props.reduxState}
            closeSide={this.props.closeSide}
            addAudioDate={this.props.addAudioDate}
            addAudioSeries={this.props.addAudioSeries}
            addAudioSpeaker={this.props.addAudioSpeaker}
            addAudioType={this.props.addAudioType}
            addAudioReferences={this.props.addAudioReferences}
            approveAudioData={this.props.approveAudioData}
            formType={this.props.type}
            getSermons={this.props.getSermons}
            cancelForm={this.props.cancelForm}
            setFormActive={this.props.setFormActive}
            setFormInactive={this.props.setFormInactive}
            showAreYouSure={this.props.showAreYouSure}
            resetFormData={this.props.resetFormData}
            formActive={this.props.formActive}
            showAreYouSureState={this.props.showAreYouSureState}
          />
        </div>
      </div>
    );
  }
}

class AudioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: null,
      seriesList: null,
      loaded: 0,
      file: null,
      fileData: null,
      bible: null,
      singleBook: "Choose Book",
      singleChapter: "Choose Chapter",
      singleVerse: "Choose Verse",
      passageStartBook: "Choose Book",
      passageEndBook: "Choose Book",
      passageStartChapter: "Choose Chapter",
      passageEndChapter: "Choose Chapter",
      passageStartVerse: "Choose Verse",
      passageEndVerse: "Choose Verse",
      speaker: "",
      date: "",
      type: "",
      series: "",
      references: [],
      areYouSure: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getSpeakers = this.getSpeakers.bind(this);
    this.getSeries = this.getSeries.bind(this);
    this.audioRef = React.createRef();
    this.handleFileClick = this.handleFileClick.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleRefButton = this.handleRefButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReference = this.handleReference.bind(this);
    this.removeRef = this.removeRef.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.defaultState = {
      singleBook: "Choose Book",
      singleChapter: "Choose Chapter",
      singleVerse: "Choose Verse",
      passageStartBook: "Choose Book",
      passageEndBook: "Choose Book",
      passageStartChapter: "Choose Chapter",
      passageEndChapter: "Choose Chapter",
      passageStartVerse: "Choose Verse",
      passageEndVerse: "Choose Verse",
      speaker: "",
      date: "",
      type: "",
      series: "",
      areYouSure: true,
      showAreYouSure: false,
    };
  }

  componentDidMount() {
    this.getSpeakers();
    this.getSeries();
    axios.get("/api/resources/bible.json").then((res) => {
      this.setState({ bible: res.data });
    });

    if (this.props.type === "edit") {
    }
  }

  getSpeakers() {
    axios
      .get("/api/getSpeakers")
      .then((res) => {
        this.setState({ speakers: res.data.speakers });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getSeries() {
    axios
      .get("/api/getSeries")
      .then((res) => {
        this.setState({ seriesList: res.data.series });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleFileClick() {
    let button = this.audioRef.current;
    button.click();
  }

  handleFileUpload(event) {
    this.setState({ ...this.state, file: event.target.files[0] });
    const data = new FormData();
    data.append("file", event.target.files[0]);
    this.props.addAudioToUpload(data);
  }

  handleRefButton(event) {
    let name = event.target.id;
    let element = document.getElementById("reference-form-wrapper");
    if (!this.state.refType) {
      this.setState(
        {
          refType: event.target.id,
        },
        () => {
          if (element.style.maxHeight) {
            element.style.maxHeight = null;
          } else {
            element.style.maxHeight = element.scrollHeight + "px";
          }
        }
      );
    } else if (this.state.refType !== name) {
      this.setState({ refType: name }, () => {
        element.style.maxHeight = element.scrollHeight + "px";
      });
    } else if (this.state.refType === name) {
      if (element.style.maxHeight) {
        element.style.maxHeight = null;
      } else {
        element.style.maxHeight = element.scrollHeight + "px";
      }
      setTimeout(() => {
        this.setState({ refType: null });
      }, 200);
    }
  }

  handleChange(event) {
    switch (event.target.id) {
      case "audio-reference-single-book":
        this.setState({ singleBook: event.target.value });
        break;
      case "audio-reference-single-chapter":
        this.setState({ singleChapter: event.target.value });
        break;
      case "audio-reference-single-verse":
        this.setState({ singleVerse: event.target.value });
        break;
      case "audio-reference-passage-start-book":
        if (this.state.passageEndBook === "Choose Book") {
          this.setState({
            passageStartBook: event.target.value,
            passageEndBook: event.target.value,
          });
        } else {
          this.setState({ passageStartBook: event.target.value });
        }
        break;
      case "audio-reference-passage-start-chapter":
        if (
          this.state.passageEndBook === this.state.passageStartBook &&
          this.state.passageEndChapter === "Choose Chapter"
        ) {
          this.setState({
            passageStartChapter: event.target.value,
            passageEndChapter: event.target.value,
          });
        } else {
          this.setState({ passageStartChapter: event.target.value });
        }
        break;
      case "audio-reference-passage-start-verse":
        if (
          this.state.passageEndBook === this.state.passageStartBook &&
          this.state.passageEndChapter === this.state.passageStartChapter &&
          this.state.passageEndVerse === "Choose Verse"
        ) {
          this.setState({
            passageStartVerse: event.target.value,
            passageEndVerse: event.target.value,
          });
        } else {
          this.setState({ passageStartVerse: event.target.value });
        }
        break;
      case "audio-reference-passage-end-book":
        this.setState({ passageEndBook: event.target.value });
        break;
      case "audio-reference-passage-end-chapter":
        this.setState({ passageEndChapter: event.target.value });
        break;
      case "audio-reference-passage-end-verse":
        this.setState({ passageEndVerse: event.target.value });
        break;
      case "audio-speaker":
        this.props.addAudioSpeaker(event.target.value);
        break;
      case "audio-date":
        this.props.addAudioDate(event.target.value);
        break;
      case "audio-type":
        this.props.addAudioType(event.target.value);
        break;
      case "audio-series":
        this.props.addAudioSeries(event.target.value);
        break;
      default:
        break;
    }
    console.log("setting form active");
    this.props.setFormActive();
  }

  handleSubmit() {
    console.log("submitting!");
    this.props.approveAudioData();
    this.props.closeSide(false);
  }

  handleEditSubmit() {
    axios
      .post("/api/editAudio", {
        _id: this.props.reduxState.audioToEditId,
        speaker: this.props.reduxState.audioUploadSpeaker,
        date: this.props.reduxState.audioUploadDate,
        series: this.props.reduxState.audioUploadSeries,
        type: this.props.reduxState.audioUploadType,
        references: this.props.reduxState.audioUploadReferences,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Success");
          this.props.getSermons();
          this.props.setFormInactive();
          this.props.closeSide();
        } else {
          console.log("Error");
        }
      });
  }

  handleReference(event) {
    event.preventDefault();
    let element = document.getElementById("reference-form-wrapper");
    element.style.maxHeight = null;
    this.setState({ refType: null });
    let name = event.target.id;
    setTimeout(() => {
      if (name === "add-verse") {
        let refString = `${this.state.singleBook} ${this.state.singleChapter}:${this.state.singleVerse}`;
        let refObj = {
          refString: refString,
          type: "verse",
          details: {
            book: this.state.singleBook,
            chapter: this.state.singleChapter,
            verse: this.state.singleVerse,
          },
        };
        let references = [...this.state.references, refObj];
        this.setState({ references: references, ...this.defaultState });
      } else {
        let refString;
        if (this.state.passageStartBook !== this.state.passageEndBook) {
          refString = `${this.state.passageStartBook} ${this.state.passageStartChapter}:${this.state.passageStartVerse} - ${this.state.passageEndBook} ${this.state.passageEndChapter}:${this.state.passageEndVerse}`;
        } else if (
          this.state.passageStartChapter !== this.state.passageEndChapter
        ) {
          refString = `${this.state.passageStartBook} ${this.state.passageStartChapter}:${this.state.passageStartVerse} - ${this.state.passageEndChapter}:${this.state.passageEndVerse}`;
        } else {
          refString = `${this.state.passageStartBook} ${this.state.passageStartChapter}:${this.state.passageStartVerse}-${this.state.passageEndVerse}`;
        }
        let refObj = {
          refString: refString,
          type: "passage",
          details: {
            startBook: this.state.passageStartBook,
            startChapter: this.state.passageStartChapter,
            startVerse: this.state.passageStartVerse,
            endBook: this.state.passageEndBook,
            endChapter: this.state.passageEndChapter,
            endVerse: this.state.passageEndVerse,
          },
        };
        let references = [...this.state.references, refObj];
        let reduxReferences = [
          ...this.props.reduxState.audioUploadReferences,
          refObj,
        ];
        this.props.addAudioReferences(reduxReferences);
        this.setState({
          references: references,
          singleBook: "Choose Book",
          singleChapter: "Choose Chapter",
          singleVerse: "Choose Verse",
          passageStartBook: "Choose Book",
          passageEndBook: "Choose Book",
          passageStartChapter: "Choose Chapter",
          passageEndChapter: "Choose Chapter",
          passageStartVerse: "Choose Verse",
          passageEndVerse: "Choose Verse",
        });
      }
    }, 300);
  }

  removeRef(event) {
    let newRefs = this.props.reduxState.audioUploadReferences.filter(
      (item) => item.refString !== event.target.id
    );
    //this.setState({ references: newRefs });
    this.props.addAudioReferences(newRefs);
  }

  render() {
    let {
      audioUploadDate,
      audioUploadSeries,
      audioUploadType,
      audioUploadSpeaker,
      audioUploadReferences,
    } = this.props.reduxState;

    let speakerOptions = [
      <option key="default-speaker" value="">
        Choose Speaker
      </option>,
    ];
    if (this.state.speakers) {
      let speakers = this.state.speakers.map((item) => item.fullName).sort();
      let newSpeakersOptions = speakers.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ));
      speakerOptions = [...speakerOptions, newSpeakersOptions];
    }

    let seriesOptions = [
      <option key="default-series" value="">
        Choose Series
      </option>,
    ];
    if (this.state.seriesList) {
      let series = this.state.seriesList.map((item) => item.title).sort();
      let newSeriesOptions = series.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ));
      seriesOptions = [...seriesOptions, newSeriesOptions];
    }

    let buttons = [];
    if (this.state.refType === "verse") {
      buttons = [
        <button
          id="passage"
          key="passage"
          onClick={(e) => {
            e.preventDefault();
            this.handleRefButton(e);
          }}
        >
          + Add new passage
        </button>,
        <button
          id="verse"
          className="active"
          key="verse"
          onClick={(e) => {
            e.preventDefault();
            this.handleRefButton(e);
          }}
        >
          + Add new verse
        </button>,
      ];
    } else if (this.state.refType === "passage") {
      buttons = [
        <button
          id="passage"
          key="passage"
          className="active"
          onClick={(e) => {
            e.preventDefault();
            this.handleRefButton(e);
          }}
        >
          + Add new passage
        </button>,
        <button
          id="verse"
          key="verse"
          onClick={(e) => {
            e.preventDefault();
            this.handleRefButton(e);
          }}
        >
          + Add new verse
        </button>,
      ];
    } else {
      buttons = [
        <button
          id="passage"
          key="passage"
          onClick={(e) => {
            e.preventDefault();
            this.handleRefButton(e);
          }}
        >
          + Add new passage
        </button>,
        <button
          id="verse"
          key="verse"
          onClick={(e) => {
            e.preventDefault();
            this.handleRefButton(e);
          }}
        >
          + Add new verse
        </button>,
      ];
    }

    let referencesList = <p>No references</p>;
    if (audioUploadReferences) {
      referencesList = audioUploadReferences.map((item) => {
        return (
          <RefCard
            key={item.refString}
            refString={item.refString}
            removeRef={this.removeRef}
          />
        );
      });
    }

    let refValid;
    if (this.state.referenceValid) {
      refValid = "";
    } else {
      refValid = "invalid";
    }

    let submitButtons;

    let cancelButton = (
      <button
        onClick={(e) => {
          e.preventDefault();
          if (this.props.formActive) {
            this.props.showAreYouSure();
          } else {
            this.props.cancelForm();
          }
        }}
      >
        Cancel
      </button>
    );

    if (this.props.formType === "new") {
      if (
        this.props.reduxState.audioFileToUpload &&
        audioUploadSpeaker &&
        audioUploadType &&
        audioUploadDate &&
        audioUploadSeries &&
        audioUploadReferences
      ) {
        submitButtons = (
          <div className="audio-button-div">
            <button
              className="upload"
              onClick={(e) => {
                e.preventDefault();
                this.handleSubmit();
              }}
            >
              Upload
            </button>
            {cancelButton}
          </div>
        );
      } else {
        submitButtons = (
          <div className="audio-button-div">
            <button
              className="upload disabled"
              onClick={(e) => {
                e.preventDefault();
                this.handleSubmit();
              }}
            >
              Upload
            </button>
            {cancelButton}
          </div>
        );
      }
    } else if (this.props.formType === "edit") {
      if (
        audioUploadSpeaker &&
        audioUploadType &&
        audioUploadDate &&
        audioUploadSeries &&
        audioUploadReferences
      ) {
        submitButtons = (
          <div className="audio-button-div">
            <button
              className="upload"
              onClick={(e) => {
                e.preventDefault();
                this.handleEditSubmit();
              }}
            >
              Save Changes
            </button>
            {cancelButton}
          </div>
        );
      } else {
        submitButtons = (
          <div className="audio-button-div">
            <button
              className="upload disabled"
              onClick={(e) => {
                e.preventDefault();
                this.handleSubmit();
              }}
            >
              Save Changes
            </button>
            {cancelButton}
          </div>
        );
      }
    }

    let fileSection = <div />;
    if (this.props.formType === "new") {
      fileSection = (
        <FileUpload
          audioRef={this.audioRef}
          loaded={this.state.loaded}
          file={this.state.file}
          handleClick={this.handleFileClick}
          handleFileUpload={this.handleFileUpload}
          valid
          fileData={this.state.fileData}
        />
      );
    }

    return (
      <form className="audio-form">
        {fileSection}
        <FormSection valid>
          <label htmlFor="audio-speaker">Speaker:</label>
          <select
            id="audio-speaker"
            value={audioUploadSpeaker}
            onChange={this.handleChange}
          >
            {speakerOptions}
          </select>
        </FormSection>
        <div id="references-wrapper" className={refValid}>
          <p>References:</p>
          <div id="references">{referencesList}</div>
          <div id="references-btn-div">{buttons}</div>
          <ReferenceForm
            type={this.state.refType}
            bible={this.state.bible}
            parentState={this.state}
            handleChange={this.handleChange}
            handleReference={this.handleReference}
          />
        </div>
        <FormSection valid>
          <label htmlFor="audio-date">Date:</label>
          <input
            type="date"
            value={audioUploadDate}
            id="audio-date"
            onChange={this.handleChange}
          />
        </FormSection>
        <FormSection valid>
          <label htmlFor="audio-type">Type:</label>
          <select
            id="audio-type"
            value={audioUploadType}
            onChange={this.handleChange}
          >
            <option value="">Choose Type</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Other">Other</option>
          </select>
        </FormSection>
        <FormSection valid>
          <label htmlFor="audio-series">Series:</label>
          <select
            id="audio-series"
            value={audioUploadSeries}
            onChange={this.handleChange}
          >
            {seriesOptions}
          </select>
        </FormSection>
        {submitButtons}
      </form>
    );
  }
}

const RefCard = (props) => {
  return (
    <div className="ref-card">
      <p>{props.refString}</p>
      <p className="remove" id={props.refString} onClick={props.removeRef}>
        REMOVE
      </p>
    </div>
  );
};

const ReferenceForm = (props) => {
  const getChapters = (bible, book) => {
    let chapters = [
      <option key="default" value={null}>
        Choose Chapter
      </option>,
    ];
    let allChapters = bible
      .filter((item) => item.book === book)[0]
      .chapters.map((item) => (
        <option key={item.chapter} value={item.chapter}>
          {item.chapter}
        </option>
      ));
    return [...chapters, ...allChapters];
  };

  const getVerses = (bible, book, chapter) => {
    let verses = [
      <option key="default" value={null}>
        Choose Verse
      </option>,
    ];
    let allVerses = parseInt(
      props.bible
        .filter((item) => item.book === book)[0]
        .chapters.filter((item) => item.chapter === chapter)[0].verses
    );
    for (let i = 1; i <= allVerses; i++) {
      verses = [
        ...verses,
        <option key={i} value={i}>
          {i}
        </option>,
      ];
    }
    return verses;
  };

  let form;
  let books = [
    <option key="default" value="Choose Book">
      Choose Book
    </option>,
  ];
  if (props.bible) {
    let allBooks = props.bible.map((item) => (
      <option key={item.book} value={item.book}>
        {item.book}
      </option>
    ));
    books = [...books, ...allBooks];
  }

  let singleChapters = [
    <option key="default" value="Choose Chapter">
      Choose Chapter
    </option>,
  ];
  let singleVerses = [
    <option key="default" value="Choose Verse">
      Choose Verse
    </option>,
  ];
  let startChapters = [
    <option key="default" value="Choose Chapter">
      Choose Chapter
    </option>,
  ];
  let endChapters = [
    <option key="default" value="Choose Chapter">
      Choose Chapter
    </option>,
  ];
  let startVerses = [
    <option key="default" value="Choose Verse">
      Choose Verse
    </option>,
  ];
  let endVerses = [
    <option key="default" value="Choose Verse">
      Choose Verse
    </option>,
  ];

  if (props.parentState.singleBook !== "Choose Book") {
    singleChapters = getChapters(props.bible, props.parentState.singleBook);
  }
  if (
    props.parentState.singleChapter !== "Choose Chapter" &&
    props.parentState.singleBook !== "Choose Book"
  ) {
    singleVerses = getVerses(
      props.bible,
      props.parentState.singleBook,
      props.parentState.singleChapter
    );
  }
  if (props.parentState.passageStartBook !== "Choose Book") {
    startChapters = getChapters(
      props.bible,
      props.parentState.passageStartBook
    );
  }
  if (
    props.parentState.passageStartChapter !== "Choose Chapter" &&
    props.parentState.passageStartBook !== "Choose Book"
  ) {
    startVerses = getVerses(
      props.bible,
      props.parentState.passageStartBook,
      props.parentState.passageStartChapter
    );
  }
  if (props.parentState.passageEndBook !== "Choose Book") {
    endChapters = getChapters(props.bible, props.parentState.passageEndBook);
  }
  if (
    props.parentState.passageEndChapter !== "Choose Chapter" &&
    props.parentState.passageEndBook !== "Choose Book"
  ) {
    endVerses = getVerses(
      props.bible,
      props.parentState.passageEndBook,
      props.parentState.passageEndChapter
    );
  }

  if (props.type === "verse") {
    form = (
      <div className="ref-form-section">
        <FormSection valid>
          <select
            id="audio-reference-single-book"
            value={props.parentState.singleBook}
            onChange={props.handleChange}
          >
            {books}
          </select>
        </FormSection>
        <div className="form-section-adjacent">
          <FormSection valid>
            <select
              id="audio-reference-single-chapter"
              value={props.parentState.singleChapter}
              onChange={props.handleChange}
            >
              {singleChapters}
            </select>
          </FormSection>
          <FormSection valid>
            <select
              id="audio-reference-single-verse"
              value={props.parentState.singleVerse}
              onChange={props.handleChange}
            >
              {singleVerses}
            </select>
          </FormSection>
        </div>
        <button id="add-verse" onClick={props.handleReference}>
          +Add
        </button>
      </div>
    );
  } else {
    form = (
      <div className="ref-form-section">
        <p>Start:</p>
        <FormSection valid>
          <select
            id="audio-reference-passage-start-book"
            value={props.parentState.passageStartBook}
            onChange={props.handleChange}
          >
            {books}
          </select>
        </FormSection>
        <div className="form-section-adjacent">
          <FormSection valid>
            <select
              id="audio-reference-passage-start-chapter"
              value={props.parentState.passageStartChapter}
              onChange={props.handleChange}
            >
              {startChapters}
            </select>
          </FormSection>
          <FormSection valid>
            <select
              id="audio-reference-passage-start-verse"
              value={props.parentState.passageStartVerse}
              onChange={props.handleChange}
            >
              {startVerses}
            </select>
          </FormSection>
        </div>
        <p>End:</p>
        <FormSection valid>
          <select
            id="audio-reference-passage-end-book"
            value={
              props.parentState.passageEndBook ||
              props.parentState.passageStartBook
            }
            onChange={props.handleChange}
          >
            {books}
          </select>
        </FormSection>
        <div className="form-section-adjacent">
          <FormSection valid>
            <select
              id="audio-reference-passage-end-chapter"
              value={props.parentState.passageEndChapter}
              onChange={props.handleChange}
            >
              {endChapters}
            </select>
          </FormSection>
          <FormSection valid>
            <select
              id="audio-reference-passage-end-verse"
              value={props.parentState.passageEndVerse}
              onChange={props.handleChange}
            >
              {endVerses}
            </select>
          </FormSection>
        </div>
        <button id="add-passage" onClick={props.handleReference}>
          +Add
        </button>
      </div>
    );
  }
  return (
    <div id="reference-form-wrapper">
      <div id="reference-form">{form}</div>
    </div>
  );
};

export { ReferenceForm, RefCard };

const FileUpload = (props) => {
  let uploadArea;
  if (!props.file) {
    uploadArea = (
      <button
        onClick={(e) => {
          e.preventDefault();
          props.handleClick();
        }}
      >
        Choose Audio File
      </button>
    );
  } else {
    uploadArea = (
      <div id="file-wrapper">
        <div id="bar">
          <p>{props.file.name}</p>
        </div>
      </div>
    );
  }

  return (
    <FormSection valid={props.valid}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={props.audioRef}
        onChange={props.handleFileUpload}
      />
      <div id="file-upload-area">{uploadArea}</div>
    </FormSection>
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
    setAudioList: (list) => {
      dispatch(audioListAction(list));
    },
    addAudioToUpload: (file) => {
      dispatch(addAudioFileToUpload(file));
    },
    addAudioFileData: (data) => {
      dispatch(uploadedAudioFileData(data));
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
    approveAudioData: () => {
      dispatch(audioUploadDataReady());
    },
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Audio);

export default Presentational;
