import React from "react";
import { connect } from "react-redux";
import { loginAction, logoutAction, headerAction } from "../redux/actions";
import BreadCrumbs from "../components/breadcrumbs";
import { Link } from "react-router-dom";

class WhatsOn extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.header("What's On");
  }

  render() {
    return (
      <div id="whats-on-wrapper">
        <main id="whats-on-main">
          <BreadCrumbs location={this.props.location} />
          <section className="section-wrapper" id="what-intro">
            <div className="inner-wrapper" id="">
              <div id="verse">
                <p id="verse-text">
                  "For where two or three gather in my name, there am I with
                  them.”
                </p>
                <p id="verse-ref">Matthew 18:20</p>
                <Link to="/whats-on/calendar">
                  <p id="link">Calendar</p>
                </Link>
              </div>
              <div id="picture">
                <div id="img-mask" />
                <img
                  src={`/photo-1553729784-e91953dec042.jpg`}
                  alt="book"
                />
              </div>
            </div>
          </section>
          <section className="section-wrapper" id="what-content">
            <div className="inner-wrapper">
              <div id="sunday" className="what-content-section">
                <h4>Sunday</h4>
                <div className="what-content-section-item-wrapper">
                  <div className="what-content-section-item">
                    <h6>Morning Service</h6>
                    <p className="time">Sunday, 10:45am</p>
                    <p className="description">
                      Our Sunday morning worship is a service for the family,
                      and is intended to be readily accessible for those with
                      little previous church involvement. We sing hymns and
                      songs, pray, and read Scripture. There is usually a short
                      talk directed primarily to the children, before they leave
                      midway through the service for Sunday school. A
                      significant part of the service is preaching. The sermons
                      are Biblically-based and seek to apply God's revealed
                      truth to the various situations of the congregation. Once
                      a month, on the second Sunday of the month, everyone is
                      invited to remain after the service to share lunch
                      together.
                    </p>
                  </div>
                  <div className="what-content-section-item">
                    <h6>Evening Service</h6>
                    <p className="time">Sunday, 6pm</p>
                    <p className="description">
                      Our Sunday evening service is similar in form and style to
                      the morning service. Again preaching is an important
                      element in our worship, and is generally focused more on
                      the encouragement of those who are Christians to growth
                      and perseverance in the faith. Once a month, on the first
                      Sunday of the month, we celebrate the Lord's Supper. All
                      those present who have repented of their sin and are
                      trusting in the Lord Jesus are welcomed to join with us on
                      such occasions.
                    </p>
                  </div>
                </div>
              </div>
              <div id="regular" className="what-content-section">
                <h4>Regular Meetings</h4>
                <div className="what-content-section-item-wrapper">
                  <div className="what-content-section-item">
                    <h6>Midweek Bible Study and Prayer Meeting</h6>
                    <p className="time">Wednesday, 7:30pm</p>
                    <p className="description">
                      Our midweek meeting is usually held at church in the
                      lounge (access from Poplar Row). Mostly the time is spent
                      in Bible Study but with an emphasis on prayer as well. We
                      occasionally devote the meeting to a missionary meeting,
                      and there are monthly house group meetings on the first
                      Wednesday of each month apart from August. This is to
                      allow a more informal time to meet and study and pray.
                    </p>
                  </div>
                  <div className="what-content-section-item">
                    <h6>Ladies' Meeting</h6>
                    <p className="time">Tuesday, 10am</p>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing
                    </p>
                  </div>
                  <div className="what-content-section-item">
                    <h6>Mens' Prayer Meeting</h6>
                    <p className="time">Tuesday, 10:15am</p>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing
                    </p>
                  </div>
                </div>
              </div>
              <div id="regular" className="what-content-section">
                <h4>Children and Youth</h4>
                <div className="what-content-section-item-wrapper">
                  <div className="what-content-section-item">
                    <h6>6-10 Club</h6>
                    <p className="time">Tuesday, 6pm</p>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing
                    </p>
                  </div>
                  <div className="what-content-section-item">
                    <h6>Seven - Eleven</h6>
                    <p className="time">Tuesday, 7pm</p>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing
                    </p>
                  </div>
                  <div className="what-content-section-item">
                    <h6>Toddler Group</h6>
                    <p className="time">Thursday and Friday, 10am</p>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
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
    header: (headerClass, title, icon) => {
      dispatch(headerAction(headerClass, title, icon));
    },
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(WhatsOn);

export default Presentational;
