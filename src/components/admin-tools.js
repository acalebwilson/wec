import React from 'react'

const AdminTools = props => {
    let tools;
    if (props.location.pathname === "/audio-library") {
        tools = <AudioAdmin setSide={props.setSide} openSide={props.openSide} />
    }
    if (props.location.pathname === "/whats-on/calendar") {
        tools = <CalendarAdmin setSide={props.setSide} openSide={props.openSide} />
    }
    if (props.location.pathname === "/news") {
        tools = <NewsAdmin setSide={props.setSide} openSide={props.openSide} addPost={props.addPost}/>
    }
    if (props.reduxState.loggedIn) {
        return (
            <div className="admin-tools-wrapper section-wrapper">
                <div className="admin-tools">
                    <h4>Page Admin Tools</h4>
                    {tools}
                </div>
            </div>
        )
    } else {
        return (
            <div />
        )
    }
}

const AudioAdmin = props => {
    return (
        <div className="button-div">
            <button className="admin-tool-btn" onClick={() => {
                props.setSide("add audio")
                props.openSide()
            }}>+ Add new audio</button>
            <button className="admin-tool-btn" onClick={() => {
                props.setSide("add speaker")
                props.openSide()
            }}>+ Add speaker</button>
            <button className="admin-tool-btn" onClick={() => {
                props.setSide("add series")
                props.openSide()
            }}>+ Add series</button>
        </div>
    )
} 

const CalendarAdmin = props => {
    return (
        <div className="button-div">
            <button className="admin-tool-btn" onClick={() => {
                props.setSide("add event")
                props.openSide()
            }}>+ Add new event</button>
            <button className="admin-tool-btn" onClick={() => {
                props.setSide("add speaker")
                props.openSide()
            }}>+ Add speaker</button>
        </div>
    )
}

const NewsAdmin = props => {
    return (
        <div className="button-div">
            <button className="admin-tool-btn" onClick={() => {
                props.addPost()
            }}>+ Add new post</button>
        </div>
    )
}


export default AdminTools



