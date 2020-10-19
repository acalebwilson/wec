import React from 'react'

import { Link } from 'react-router-dom'


const mobileNav = (props) => {
    let buttonArr = [
        {
            path: "/",
            id: "home-mb-btn",
            icon: "fas fa-home",
            text: "Home",
            className: "mb-nav-btn"
        },
        {
            path: "/audio-library",
            id: "listen-mb-btn",
            icon: "fas fa-headphones-alt",
            text: "Listen",
            className: "mb-nav-btn"
        },
        {
            path: "/whats-on",
            id: "what-mb-btn",
            icon: "fas fa-calendar-alt",
            text: "What's On",
            className: "mb-nav-btn"
        },
        {
            path: "/contact",
            id: "contact-mb-btn",
            icon: "fas fa-envelope",
            text: "Contact",
            className: "mb-nav-btn"
        }
    ]
    
    if (props.activePage) {
        let button = buttonArr.filter(item => {
            return item.path === props.activePage.pathname
        })
        if (button[0]) {
            button[0].className += " active"
        }
    }

    let buttons = buttonArr.map(item => {
        return (
            <Link to={item.path} key={item.id}>
                <div className={item.className} id={item.id}>
                    <i className={item.icon}></i>
                    <p>{item.text}</p>
                </div>
            </Link>
        )
    })
    return (
        <div id="mobile-nav">
            {buttons}
        </div>
    )
}

export default mobileNav;