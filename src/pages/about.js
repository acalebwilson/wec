import React from "react";
import { connect } from "react-redux";
import { loginAction, logoutAction, headerAction } from "../redux/actions";
import BreadCrumbs from "../components/breadcrumbs";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.header("Who We Are");
  }
  render() {
    return (
      <div>
        <div id="about-wrapper">
          <main id="about-main">
            <BreadCrumbs location={this.props.location} />
            <section id="about-intro" className="section-wrapper">
              <div id="about-intro-wrapper">
                <h2 className="section-intro">Our Church</h2>
                <img
                  src="/photo-1473318178091-95c656d9f5da.png"
                  alt="seagull"
                />
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam
                </p>
              </div>
            </section>
            <section id="leaders" className="section-wrapper">
              <div id="leaders-wrapper">
                <h2 className="section-intro">Our Leaders</h2>
                <div id="leader-cards">
                  <LeaderCard
                    id="peter-card"
                    src="/peter.jpg"
                    name="Peter Robinson"
                    title="Pastor"
                    alt="pastor peter"
                  />
                  <LeaderCard
                    id="barry-card"
                    src="/barry.jpg"
                    name="Barry Davies"
                    title="Elder"
                    alt="elder barry"
                  />
                  <LeaderCard
                    id="frederick-card"
                    src="/frederick.jpg"
                    name="Frederick Hodgson"
                    title="Elder"
                    alt="elder frederick"
                  />
                </div>
              </div>
            </section>
            <section id="history" className="section-wrapper">
              <div id="history-wrapper">
                <h2 className="section-intro">Our History</h2>
                <div id="timeline">
                  <div className="timeline-item" id="1973-06">
                    <Circle />
                    <h5>1973</h5>
                    <p>The church is founded, Peter Brumby becomes pastor</p>
                  </div>
                  <div className="timeline-item" id="1978">
                    <Circle />
                    <h5>1978</h5>
                    <p>The church begins meeting at Skinner Street</p>
                  </div>
                  <div className="timeline-item" id="1993">
                    <Circle />
                    <h5>1993</h5>
                    <p>John Winter becomes pastor</p>
                  </div>
                  <div className="timeline-item" id="1993">
                    <Circle />
                    <h5>2004</h5>
                    <p>David Magowan becomes pastor</p>
                  </div>
                  <div className="timeline-item" id="1993">
                    <Circle />
                    <h5>2014</h5>
                    <p>Peter Robinson becomes pastor</p>
                  </div>
                </div>
                <div id="history-text">
                  <p>
                    The church was formed in 1973. The catalyst was the decision
                    of Rev Peter Brumby to leave Methodism. He had been serving
                    churches in Grosmont, Littlebeck, Esk Valley, Briggswath and
                    Sleights, and many of those who were involved at the
                    beginning of the church had been converted under Peter's
                    ministry.
                  </p>
                  <p>
                    Whitby Evangelical Fellowship (as the church was then known)
                    first met in June 1973 and Rev John Tindall conducted the
                    church's inaugural covenant service on 28th June 1973. The
                    church initially met at a home in Sleights. Peter Brumby had
                    gone to Spain to minister at an English-speaking church on
                    the Costa del Sol, but was called as the church's first
                    minister in December 1973. From 1974 to 1978 the church met
                    at Ruswarp village hall, and then at Stakesby School and
                    Whitby School, before the purchase of the present premises
                    in Skinner Street. The building in Skinner Street had been
                    previously a ballroom, a bakery and café, and a builders'
                    merchant, and required extensive renovation and alteration.
                    At this time the fellowship became known as Whitby
                    Evangelical Church.
                  </p>
                  <p>
                    After 17 years service, Peter Brumby resigned the pastorate
                    to take up a wider ministry in the North of England. He then
                    served as minister at Newcastle Reformed Evangelical Church.
                    After a three year vacancy, John Winter was called in 1993
                    to be the pastor. He had been involved in a church planting
                    work for the Fellowship of Independent Evangelical Churches
                    (FIEC) in Newton Aycliffe, Co Durham. In December 1999, John
                    Winter resigned the pastorate, and after a further three
                    year vacancy, David Magowan was called to be the church's
                    pastor. David moved onto Carey Baptist Church, Reading, in
                    August 2009. In March 2014 Peter Robinson (Honiton)
                    responded to a call to the pastorate and became the minister
                    of the church.
                  </p>
                  <p>
                    Since 1973, the church has seen a steady growth in
                    attendance and membership. The normal morning congregation
                    of around 80-100 is often swelled with holidaying visitors,
                    particularly during the summer months. There are various
                    activities in the church calendar to cater for distinctive
                    groups within the church family. These include Sunday
                    School, 6-10 Club for Primary aged children, SAS for
                    teenagers, Mums and Tots, Ladies Meeting, Midweek Bible
                    Study, etc.
                  </p>
                </div>
                <p id="end-verse">
                  May the favour of the Lord our God rest upon us; establish the
                  work of our hands for us - yes, establish the work of our
                  hands (Psalm 90:17)
                </p>
              </div>
            </section>
            <section className="section-wrapper" id="statement-wrapper">
              <div id="statement">
                <h2 className="section-intro">Our Beliefs</h2>
                <div id="statement-item-container">
                  <div className="statement-item">
                    <h4>God</h4>
                    <p>
                      There is one God, who exists eternally in three distinct
                      but equal persons: the Father, the Son, and the Holy
                      Spirit. God is unchangeable in his holiness, justice,
                      wisdom and love. He is the almighty Creator; Saviour and
                      Judge who sustains and governs all things according to his
                      sovereign will for his own glory.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>The Bible</h4>
                    <p>
                      God has revealed himself in the Bible, which consists of
                      the Old and New Testaments alone. Every word was inspired
                      by God through human authors, so that the Bible as
                      originally given is in its entirety the Word of God,
                      without error and fully reliable in fact and doctrine. The
                      Bible alone speaks with final authority and is always
                      sufficient for all matters of belief and practice.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>The Human Race</h4>
                    <p>
                      All men and women, being created in the image of God, have
                      inherent and equal dignity and worth. Their greatest
                      purpose is to obey, worship and love God. As a result of
                      the fall of our first parents, every aspect of human
                      nature has been corrupted and all men and women are
                      without spiritual life, guilty sinners and hostile to God.
                      Every person is therefore under the just condemnation of
                      God and needs to be born again, forgiven and reconciled to
                      God in order to know and please him.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>The Lord Jesus Christ</h4>
                    <p>
                      The Lord Jesus Christ is fully God and fully man. He was
                      conceived by the Holy Spirit, born of a virgin, and lived
                      a sinless life in obedience to the Father. He taught with
                      authority and all his words are true. On the cross he died
                      in the place of sinners, bearing God's punishment for
                      their sin, redeeming them by his blood. He rose from the
                      dead and in his resurrection body ascended into heaven
                      where he is exalted as Lord of all. He intercedes for his
                      people in the presence of the Father.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>Salvation</h4>
                    <p>
                      Salvation is entirely a work of God's grace and cannot be
                      earned or deserved. It has been accomplished by the Lord
                      Jesus Christ and is offered to all in the gospel. God in
                      his love forgives sinners whom he calls, granting them
                      repentance and faith. All who believe in Christ are
                      justified by faith alone, adopted into the family of God
                      and receive eternal life.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>The Holy Spirit</h4>
                    <p>
                      The Holy Spirit has been sent from heaven to glorify
                      Christ and to apply his work of salvation. He convicts
                      sinners, imparts spiritual life and gives a true
                      understanding of the Scriptures. He indwells all
                      believers, brings assurance of salvation and produces
                      increasing likeness to Christ. He builds up the Church and
                      empowers its members for worship, service and mission.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>The Church</h4>
                    <p>
                      The universal Church is the body of which Christ is the
                      head and to which all who are saved belong. It is made
                      visible in local churches, which are congregations of
                      believers who are committed to each other for the worship
                      of God, the preaching of the Word, the administering of
                      Baptism and the Lord's Supper; for pastoral care and
                      discipline, and for evangelism. The unity of the body of
                      Christ is expressed within and between churches by mutual
                      love, care and encouragement. True fellowship between
                      churches exists only where they are faithful to the
                      gospel.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>Baptism and The Lord's Supper</h4>
                    <p>
                      Baptism and the Lord's Supper have been given to the
                      churches by Christ as visible signs of the gospel. Baptism
                      is a symbol of union with Christ and entry into his Church
                      but does not impart spiritual life. The Lord's Supper is a
                      commemoration of Christ's sacrifice offered once for all
                      and involves no change in the bread and wine. All its
                      blessings are received by faith.
                    </p>
                  </div>
                  <div className="statement-item">
                    <h4>The Future</h4>
                    <p>
                      The Lord Jesus Christ will return in glory. He will raise
                      the dead and judge the world in righteousness. The wicked
                      will be sent to eternal punishment and the righteous will
                      be welcomed into a life of eternal joy in fellowship with
                      God. God will make all things new and will be glorified
                      forever.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

const LeaderCard = (props) => {
  return (
    <div id={props.id} className="leader-card">
      <img src={props.src} alt={props.alt} />
      <h4>{props.name}</h4>
      <p>{props.title}</p>
    </div>
  );
};

const Circle = (props) => {
  return <div className="circle" id={props.id} />;
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
    header: (title) => {
      dispatch(headerAction(title));
    },
  };
};

const Presentational = connect(mapStateToProps, mapDispatchToProps)(About);

export default Presentational;
