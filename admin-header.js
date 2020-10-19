import { Link } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import { loginAction, logoutAction } from '../redux/actions'

const Header = (props) => {
    const hamburgerToggle = () => {
        let element = document.getElementById("hamburger-menu")
        if (element.classList.contains("show")) {
            element.classList.remove("show")
        } else {
            element.classList.add("show")
        }
    }
     return (
        <header className={props.type}>
            <div id="bg-mask">
                <div id="grid">
                    <div id="top-bar">
                        <div className="logo normal">
                            <Link to="/">Whitby Evangelical Church Admin Area</Link>
                        </div>
                        <div className="logo small">
                            <Link to="/">WEC Admin</Link>
                        </div>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/logout">Logout</Link>
                            <i className="fas fa-bars" id="hamburger" onClick={hamburgerToggle}></i>
                        </nav>
                    </div>
                    <div id="hamburger-menu" className="hello">
                        <ul>
                        </ul>
                    </div>
                    <div id="headlines">
                        <h1>Welcome</h1>
                        <h3>To Whitby Evangelical Church</h3>
                        <Link to="/listen"><button className="btn primary-btn">Listen Online</button></Link>
                        <Link to="/about"><button className="btn secondary-btn">About Us</button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
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
        }
    }
}

const Presentational = connect(mapStateToProps, mapDispatchToProps)(Header)

export default Presentational