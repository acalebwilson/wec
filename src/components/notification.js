import React from 'react'
import SectionWrapper from './section-wrapper'
import CloseIcon from './close-icon'
import {Link} from 'react-router-dom'


class NotificationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            interval: setInterval(() => {
                if (this.state.notificationClass === "flash") {
                    this.setState({notificationClass: "normal"})
                } else {
                    this.setState({notificationClass: "flash"})
                }
            }, 750),
            notificationClass: "normal"
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        if (this.props.show) {
            return (
                <SectionWrapper innerClassNames="notification-bar">
                    <p className={this.state.notificationClass}><Link to="/new-sermon-archive">Click here to try our new sermon archive</Link></p>
                    <CloseIcon onClose={this.props.onClose}/>
                </SectionWrapper>
            )
        } else {
            if (this.state.interval) {
                clearInterval(this.state.interval)
            }
            return (
                <div />
            )
        }
    }
    
}

export default NotificationBar;