import React from "react";
import { connect } from "react-redux";
import { loginAction, logoutAction, headerAction } from "../redux/actions";
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topHome: 70,
      windowSize: 0,
      startOffset: 0,
      showIntro: "",
      bPosHome: 100,
      start: 120,
      showCards: ["", "", ""],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkElements = this.checkElements.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleWindowSize = this.handleWindowSize.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  offset(el) {
    let rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  componentDidMount() {
    /*let element = document.getElementById("home-card-intro");
    let imageHeight = element.offsetWidth * 1.14;
    let windowSize = imageHeight * 0.8;
    let windowTop =
      document.getElementById("p1").offsetHeight +
      document.getElementById("home-intro-card-title").offsetHeight;
    this.setState({
      topHome: windowTop - imageHeight * 0.3,
      windowSize: windowSize,
      startOffset: windowTop - imageHeight * 0.3,
    });
    this.checkElements("initial");
    document.addEventListener("scroll", this.handleScroll);
    document.addEventListener("resize", this.handleWindowSize);*/
    this.props.header("", "");
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("resize", this.handleWindowSize);
    if (this.one) {
      clearTimeout(this.one);
    }
    if (this.two) {
      clearTimeout(this.two);
    }
    if (this.three) {
      clearTimeout(this.three);
    }
  }

  handleScroll() {
    if (this.state.start - window.scrollY / 5 < 55) {
      this.setState({ bPosHome: 55 });
    } else {
      this.setState({ bPosHome: this.state.start - window.scrollY / 5 });
    }
    this.checkElements("normal");
  }

  handleWindowSize() {
    try {
      let element = document.getElementById("home-card-intro");
      let imageHeight = element.offsetWidth * 1.14;
      let windowSize = imageHeight * 0.8;
      this.setState({
        windowSize: windowSize,
      });
    } catch (err) {
      return null;
    }
  }

  checkElements(type) {
    let introDiv = document.getElementById("home-card-intro");
    let cards = document.getElementsByClassName("home-card");

    if (type === "initial") {
      if (this.checkElement(introDiv)) {
        this.setState({
          showIntro: "show",
        });
      } else {
        this.setState({
          showIntro: "",
        });
      }

      this.one = setTimeout(() => {
        let showCards = [...this.state.showCards];
        if (this.checkElement(cards[0])) {
          showCards[0] = "show";
          this.setState({
            showCards: showCards,
          });
        } else {
          showCards[0] = "";
          this.setState({
            showCards: showCards,
          });
        }
        this.one = null;
      }, 300);

      this.two = setTimeout(() => {
        let showCards = [...this.state.showCards];
        if (this.checkElement(cards[1])) {
          showCards[1] = "show";
          this.setState({
            showCards: showCards,
          });
        } else {
          showCards[1] = "";
          this.setState({
            showCards: showCards,
          });
        }
        this.two = null;
      }, 600);

      this.three = setTimeout(() => {
        let showCards = [...this.state.showCards];
        if (this.checkElement(cards[2])) {
          showCards[2] = "show";
          this.setState({
            showCards: showCards,
          });
        } else {
          showCards[2] = "";
          this.setState({
            showCards: showCards,
          });
        }
        this.three = null;
      }, 900);
    } else {
      for (let i = 0; i < cards.length; i++) {
        let showCards = [...this.state.showCards];
        if (this.checkElement(cards[i])) {
          showCards[i] = "show";
        } else {
          showCards[i] = "";
        }
        this.setState({
          showCards: showCards,
        });
      }
      if (this.checkElement(introDiv)) {
        this.setState({
          showIntro: "show",
        });
      } else {
        this.setState({
          showIntro: "",
        });
      }
    }
  }

  checkElement(el) {
    if (window.scrollY + window.innerHeight > this.offset(el).top + 60) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let internalImage;
    let externalImage;
    if (this.props.reduxState.width && this.props.reduxState.width < 633) {
      internalImage = null; /*(
        <div id="church-img-wrapper">
          <img id="church-img" src="/IMG_20200301_121422-edited-new.jpg" />
        </div>
      ); */
    } else {
      externalImage = (
        <div id="church-img-wrapper">
          <img id="church-img" src="/IMG_20200301_121422-edited-new.jpg" />
        </div>
      );
    }
    return (
      <div>
        <div id="main-wrapper-new" className="page-content">
          <div id="main-bg">
            <img src="/wavey2.svg" alt="background" />
          </div>
          <div id="bg-color" />
          <div id="main-content">
            <div
              id="home-card-intro"
              /*className={this.state.showIntro}*/ className="show"
            >
              <div id="home-intro-section">
                <div id="home-intro-content">
                  <h4
                    className="home-card-grid-item"
                    id="home-intro-card-title"
                  >
                    Who we are today
                  </h4>
                  {internalImage}
                  <div id="home-intro-text">
                    <p id="p1" className="home-card-grid-item">
                      Whitby Evangelical Church is based on Whitby's busy
                      Skinner Street, in the heart of the town. We're a family
                      friendly church offering two Sunday services as well as a
                      mid week Bible study meeting.
                    </p>
                    <p id="p2" className="home-card-grid-item">
                      Please have a look around our website. We're still adding
                      content so please check back regularly. Sunday sermons are
                      available to listen to online in our Audio Library and our
                      meeting information and special events on our Calendar.
                    </p>
                    <p id="p3" className="home-card-grid-item">
                      If you'd like to contact us please use the details or
                      email form on the Contact page.
                    </p>
                  </div>
                  <div
                    id="home-button-intro-div"
                    className="home-card-grid-item"
                  >
                    <button>Find out more</button>
                  </div>
                </div>
                {externalImage}
              </div>
            </div>
            <div id="home-body-content">
              <InfoCard
                type="right"
                id="whats-on-card"
                imgSrc="/whats-on.jpg"
                imgAlt="People listening to talk"
                imgId="what-img"
                //style={this.state.showCards[0]}
                show="show"
              >
                <h4>What's On</h4>
                <p>
                  Whitby Evangelical Church is based on Whitby's busy Skinner
                  Street, in the heart of the town. We're a family friendly
                  church offering two Sunday services as well as a mid week
                  Bible study meeting.
                </p>
                <Link to="/whats-on"><button>Find out more</button></Link>
              </InfoCard>
              <InfoCard
                type="left"
                id="listen-card"
                imgSrc="/listen.jpg"
                imgAlt="Headphones"
                imgId="listen-img"
                //style={this.state.showCards[1]}
                show="show"
              >
                <h4>Listen Online</h4>
                <p>
                  Whitby Evangelical Church is based on Whitby's busy Skinner
                  Street, in the heart of the town. We're a family friendly
                  church offering two Sunday services as well as a mid week
                  Bible study meeting.
                </p>
                <Link to="/audio-library"><button>Find out more</button></Link>
              </InfoCard>
              <InfoCard
                type="right"
                id="contact-card"
                imgSrc="/contact.jpg"
                imgAlt="Person sending email"
                imgId="contact-img"
                //style={this.state.showCards[2]}
                show="show"
              >
                <h4>Get in touch</h4>
                <p>
                  Whitby Evangelical Church is based on Whitby's busy Skinner
                  Street, in the heart of the town. We're a family friendly
                  church offering two Sunday services as well as a mid week
                  Bible study meeting.
                </p>
                <Link to="/contact"><button>Find out more</button></Link>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const InfoCard = (props) => {
  return (
    <div className={"home-card " + props.type + " " + props.show} id={props.id}>
      <div className="home-card-text">{props.children}</div>
      <img
        src={props.imgSrc}
        alt={props.imgAlt}
        id={props.imgId}
        className="outer-img"
      />
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
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Presentational;
