
import React from 'react'
import { connect } from 'react-redux'
import { loginAction, logoutAction, headerAction } from '../redux/actions'
import BreadCrumbs from '../components/breadcrumbs'


class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    
    componentDidMount() {
        this.props.header("Get in touch")
    }

    render() {
        return (
            <div id="contact-wrapper">
                <main id="contact-main">
                    <BreadCrumbs location={this.props.location} />
                    <section className="section-wrapper" id="what-intro">
                        <div className="inner-wrapper" id="" >
                            <div className="contact-section">
                                <h2>Send us a message:</h2>
                                <form>
                                    <div className="contact-form-section">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" id="name" />
                                    </div>
                                    <div className="contact-form-section">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" />
                                    </div>
                                    <div className="contact-form-section">
                                        <label htmlFor="message">Message:</label>
                                        <textarea id="message" />
                                    </div>
                                    <button className="primary">Send</button>
                                </form>
                            </div>
                            <div className="contact-section">
                                <h2>Where we are:</h2>
                                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2317.6272178820377!2d-0.6196864835783704!3d54.487158796347494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487f177000e11b7d%3A0xe007f5506cde65a6!2sWhitby%20Evangelical%20Church!5e0!3m2!1sen!2suk!4v1584984881539!5m2!1sen!2suk"></iframe>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {reduxState: state}
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {
            dispatch(loginAction(user))
        },
        logout: () => {
            dispatch(logoutAction())
        },
        header: (headerClass, title, icon) => {
            dispatch(headerAction(headerClass, title, icon))
        }
    }
}

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Contact)


export default Presentational