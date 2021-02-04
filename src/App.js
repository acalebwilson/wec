import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Toast from "./components/toast";
import Home from "./pages/new-home";
import About from "./pages/about";
import Events from "./pages/calendar";
import WhatsOn from "./pages/whats-on";
import AudioLibrary from "./pages/audio-library";
import AudioPlayer from "./components/audio-player";
import Contact from "./pages/contact";
import SidePageContent from "./components/sidepage-comps/side-home";
import Footer from "./components/footer";
import Header from "./components/header";
import SidePage from "./components/side-page";
import ToastAudioContent from "./components/toast-audio-content";
import ToggleAdmin from "./components/toggleAdmin";
import { createStore } from "redux";
import { logReducer, initialState } from "./redux/reducers";
import { Provider, connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  headerAction,
  openSidePageAction,
  closeSidePageAction,
  sidePageAction,
  addEventList,
  audioListAction,
  resizeAction,
  loadedStateUpdate,
  uploadedAudioFileUrl,
  clearUploadedAudioData,
  sidePageThemeAction,
  adminShowcaseToggleOn,
  adminShowcaseToggleOff
} from "./redux/actions";
import axios from "axios";

import ScrollToTop from "./components/scrollToTop";

export const mobileBreakPoint = 747;

const store = createStore(logReducer, initialState);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentClass: "",
      headerClass: "",
      marginBottom: 0,
      pageMarginBottom: 0,
      toastStack: [],
      formActive: false,
      showAreYouSure: "hide",
      showToggleAdmin: true
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSide = this.handleSide.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.closeSide = this.closeSide.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleAudioSubmit = this.handleAudioSubmit.bind(this);
    this.getSermons = this.getSermons.bind(this);
    this.showAudioToast = this.showAudioToast.bind(this);
    this.closeToast = this.closeToast.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.setFormActive = this.setFormActive.bind(this);
    this.setFormInactive = this.setFormInactive.bind(this);
    this.showAreYouSure = this.showAreYouSure.bind(this);
    this.resetFormData = this.resetFormData.bind(this);
    this.hideAreYouSure = this.hideAreYouSure.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.setServerRetry = this.setServerRetry.bind(this);
    this.getInitialDetails = this.getInitialDetails.bind(this);
    this.toggleAdminMode = this.toggleAdminMode.bind(this);
    this.toggleShowAdminMode = this.toggleShowAdminMode.bind(this);
  }

  componentDidMount() {
    /*if (
      !(
        this.props.reduxState.loggedIn === true ||
        this.props.reduxState.loggedIn === false
      )
    ) {
      this.verifyLogin()
    }

    this.getSermons();
    axios.get("/api/events").then((res) => {
      this.props.addEvents(res.data.events);
    });*/

    this.getInitialDetails();

    this.handleResize();
    window.addEventListener("resize", this.handleResize);

    document.getElementById("toast-stack").style.maxHeight =
      window.innerHeight - 200;
  }

  verifyLogin() {
    axios
      .post("/api/data", {
        verified: true,
      })
      .then((res) => {
        if (res.data.userDetails.verified) {
          this.props.login({
            username: res.data.userDetails.user.sub,
            isAdmin: res.data.userDetails.user.isAdmin,
          });
        } else {
          this.props.logout();
        }
      })
      .catch((err) => {
        this.setServerRetry();
      });
  }

  getInitialDetails() {
    axios
      .post("/api/data", {
        sermons: true,
        events: true,
        speakers: true,
        verified: true,
      })
      .then((res) => {
        this.props.addEvents(res.data.events);
        this.props.setAudioList(res.data.sermons);
        if (res.data.userDetails.verified) {
          this.props.login({
            username: res.data.userDetails.user.sub,
            isAdmin: res.data.userDetails.user.isAdmin,
          });
        } else {
          this.props.logout();
        }
        clearInterval(this.state.serverRetry);
        this.setState({ serverRetry: null });
      })
      .catch((err) => {
        this.setServerRetry();
      });
  }

  setServerRetry() {
    if (!this.state.serverRetry) {
      this.setState({
        serverResponse: false,
        serverRetry: setInterval(() => {
          this.getInitialDetails();
        }, 10000),
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  getSermons() {
    axios
      .post("/api/data", {
        sermons: true,
      })
      .then((res) => {
        this.props.setAudioList(res.data.sermons);
        this.setState({ serverRetry: null });
      })
      .catch((err) => {
        this.setServerRetry();
      });
  }

  setBodyNoScroll() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("noscroll");
  }

  setBodyScroll() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("noscroll");
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.reduxState.loggedIn === true ||
        this.props.reduxState.loggedIn === false) &&
      this.props.reduxState.loggedIn !== prevProps.reduxState.loggedIn
    ) {
      this.handleResize();
    }

    if (
      this.props.reduxState.sidePageClassName !==
      prevProps.reduxState.sidePageClassName
    ) {
      if (this.props.reduxState.sidePageClassName === "") {
        this.setBodyNoScroll();
      } else {
        this.setBodyScroll();
      }
    }

    let audioFileToUpload = this.props.reduxState.audioFileToUpload,
      prevAudioFileToUpload = prevProps.reduxState.audioFileToUpload,
      audioFileUrl = this.props.reduxState.uploadedAudioUrl;

    if (audioFileToUpload !== prevAudioFileToUpload && audioFileToUpload) {
      this.showAudioToast();
      this.handleFileUpload(audioFileToUpload);
    }

    if (this.props.reduxState.audioDataReady && audioFileUrl) {
      this.handleAudioSubmit();
    }

    console.log(this.props.reduxState.adminShowcaseMode)
  }

  handleAudioSubmit() {
    axios
      .post("/api/addAudio", {
        url: this.props.reduxState.uploadedAudioUrl,
        speaker: this.props.reduxState.audioUploadSpeaker,
        series: this.props.reduxState.audioUploadSeries,
        type: this.props.reduxState.audioUploadType,
        references: this.props.reduxState.audioUploadReferences,
        date: this.props.reduxState.audioUploadDate,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.clearAudioData();
          this.getSermons();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleResize() {
    if (
      this.props.reduxState.loggedIn === true ||
      this.props.reduxState.loggedIn === false
    ) {
      let mobileNavHeight = 0;
      let audioPlayerHeight = 0;
      let footerHeight = 0;
      if (this.props.reduxState.audio) {
        let audioPlayer = document.getElementById("local-audio-player");
        audioPlayerHeight = audioPlayer.clientHeight;
      }

      let footer = document.getElementById("footer");
      if (footer) {
        footerHeight = footer.clientHeight;
      }
      this.props.resize(window.innerWidth);
      this.setState({
        marginBottom: audioPlayerHeight + mobileNavHeight,
        pageMarginBottom: footerHeight,
      });
    }
  }

  openLogin() {
    this.props.setSide("login");
    this.props.openSide();
  }

  handleSide() {
    if (this.props.reduxState.sidePageClassName === "") {
      this.props.closeSide();
    } else {
      this.props.openSide();
    }
  }

  closeSide(active = true) {
    if (this.state.formActive && active) {
      this.showAreYouSure();
    } else {
      this.props.closeSide();
    }
  }

  handleFileUpload(data) {
    axios
      .post("/api/uploadAudio", data, {
        onUploadProgress: (ProgressEvent) => {
          let loaded = Math.floor(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          this.props.updateLoadedState(loaded);
        },
      })
      .then((res) => {
        this.props.setAudioFileUrl(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showAudioToast() {
    let found = this.state.toastStack.find((e) => e.type === "audio-upload");
    if (!found) {
      let id = this.generateId();
      this.setState({
        toastStack: [
          ...this.state.toastStack,
          { type: "audio-upload", title: "Upload Progress", id },
        ],
      });
    }
  }

  closeToast(e) {
    let newStack = this.state.toastStack.filter((d, i) => {
      return d.id !== e.target.id;
    });

    this.setState({ toastStack: newStack });
  }

  generateId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  cancelForm() {
    this.closeSide();
    setTimeout(() => {
      this.props.clearAudioData();
    }, 300);
  }

  setFormActive() {
    this.setState({ formActive: true });
  }

  setFormInactive() {
    this.setState({ formActive: false });
  }

  showAreYouSure() {
    this.setState({ showAreYouSure: "" });
  }

  hideAreYouSure() {
    this.setState({ showAreYouSure: "hide" });
  }

  resetFormData() {
    this.props.clearAudioData();
    this.setState({ formActive: false, showAreYouSure: "hide" }, () => {
      this.closeSide();
    });
  }

  toggleAdminMode() {
    if (this.props.reduxState.loggedIn) {
      this.props.logout();
      this.props.adminShowcaseToggleOff();
    } else {
      this.props.login({
        username: "test",
        isAdmin: true
      })
      this.props.adminShowcaseToggleOn();
    }
  }

  toggleShowAdminMode() {
    if (this.state.showToggleAdmin) {
      this.setState({showToggleAdmin: false})
    } else {
      this.setState({showToggleAdmin: true})
    }
  }

  openSide(page) {}

  render() {
    let symbol;
    if (this.props.reduxState.sidePageClassName === "") {
      symbol = <p>&gt;</p>;
    } else {
      symbol = <p>&lt;</p>;
    }

    let paddingBottom = 0;
    if (this.props.reduxState.audio) {
      let element = document.getElementById("local-audio-player");
      paddingBottom = element.clientHeight;
    }

    let toastStack;
    let toastStackShow = "hide";
    if (this.state.toastStack) {
      toastStackShow = "";
      toastStack = this.state.toastStack.map((d, i) => {
        let toastContent = <div />;
        switch (d.type) {
          case "audio-upload":
            toastContent = (
              <ToastAudioContent
                loaded={this.props.reduxState.audioLoaded}
                url={this.props.reduxState.uploadedAudioUrl}
                filedata={this.props.reduxState.audioFileToUpload}
              />
            );
            break;
          default:
            break;
        }
        return (
          <Toast
            key={`${d.type}+${i}`}
            title={d.title}
            closeToast={this.closeToast}
            toastId={d.id}
          >
            {toastContent}
          </Toast>
        );
      });
    }

    /*if (this.state.toastStack) {
      if (this.state.toastStack.length > 3) {
        let toasts = this.state.toastStack.slice(0, 3).reverse();
        toastStack = toasts.map((d, i) => {
          return (
              {toastContent}
            )
        })
      } else {
        toastStack = this.state.toastStack.slice(0).reverse().map((d, i) => {
          return (
              {toastContent}
            )
        })
      }
      
    }*/

    return (
      <div id="content" className={this.state.contentClass}>
        <div>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Header />
          <ToggleAdmin 
            adminMode={this.props.reduxState.loggedIn} 
            handleAdminToggle={this.toggleAdminMode}
            showToggleAdmin={this.state.showToggleAdmin}
            toggleShowAdminMode={this.toggleShowAdminMode}
          />
          <div id="pages">
            <Switch>
              <Route component={Home} exact path="/home" />
              <Route component={About} exact path="/about" />
              <Route
                render={(routeProps) => (
                  <Events
                    setBodyNoScroll={this.setBodyNoScroll}
                    setBodyScroll={this.setBodyScroll}
                    routeProps={routeProps}
                  />
                )}
                exact
                path="/whats-on/calendar"
              />
              <Route component={WhatsOn} exact path="/whats-on" />
              <Route component={Contact} exact path="/contact" />
              {/*<Route component={News} exact path="/news" />*/}
              <Route
                render={(routeProps) => (
                  <AudioLibrary
                    location={routeProps.location}
                    closeSide={this.closeSide}
                  />
                )}
                exact
                path="/audio-library"
              />
              <Route
                render={() => (
                  <div>
                    <h1 style={{ textAlign: "center" }}>
                      404 - Page not found
                    </h1>
                  </div>
                )}
              />
            </Switch>
          </div>
        </div>
        <AudioPlayer />

        <SidePage
          handleButton={this.handleSide}
          show={this.props.reduxState.sidePageClassName}
          symbol={symbol}
          closeSide={this.closeSide}
          handleFileUpload={this.handleFileUpload}
          theme={this.props.reduxState.theme}
        >
          <SidePageContent
            getSermons={this.getSermons}
            cancelForm={this.cancelForm}
            setFormActive={this.setFormActive}
            setFormInactive={this.setFormInactive}
            showAreYouSure={this.showAreYouSure}
            resetFormData={this.resetFormData}
            formActive={this.state.formActive}
            showAreYouSureState={this.state.showAreYouSure}
            closeSide={this.closeSide}
            setSidePageTheme={this.props.setSidePageTheme}
          />
        </SidePage>
        <AreYouSureModal
          resetFormData={this.resetFormData}
          hideAreYouSure={this.hideAreYouSure}
          show={this.state.showAreYouSure}
        />
        <div id="toast-stack" className={toastStackShow}>
          {toastStack}
        </div>
        <Footer
          paddingBottom={this.state.marginBottom + paddingBottom}
          loggedIn={this.props.reduxState.loggedIn}
          login={this.openLogin}
          width={this.props.reduxState.width}
        />
      </div>
    );
  }
}

const AreYouSureModal = (props) => {
  return (
    <div className={`${props.show} modal-wrapper`}>
      <div className="modal-overlay" />
      <div className="confirm-modal">
        <h4>Are you sure?</h4>
        <div className="modal-btn-div">
          <button onClick={props.resetFormData}>Yes</button>
          <button onClick={props.hideAreYouSure}>No</button>
        </div>
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
    addEvents: (list) => {
      dispatch(addEventList(list));
    },
    setAudioList: (list) => {
      dispatch(audioListAction(list));
    },
    resize: (size) => {
      dispatch(resizeAction(size));
    },
    updateLoadedState: (loaded) => {
      dispatch(loadedStateUpdate(loaded));
    },
    setAudioFileUrl: (url) => {
      dispatch(uploadedAudioFileUrl(url));
    },
    clearAudioData: () => {
      dispatch(clearUploadedAudioData());
    },
    setSidePageTheme: (theme) => {
      dispatch(sidePageThemeAction(theme));
    },
    adminShowcaseToggleOn: () => {
      dispatch(adminShowcaseToggleOn());
    },
    adminShowcaseToggleOff: () => {
      dispatch(adminShowcaseToggleOff());
    }
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(AppWrapper);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <Presentational />
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
