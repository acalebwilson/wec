import React from 'react'


export default class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            percentLeft: "0"
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.sliderRef = React.createRef()
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.addListeners = this.addListeners.bind(this)
    }

    addListeners() {
        let container = this.sliderRef.current
        let page = document.getElementsByTagName("body")[0];
        let rect = container.getBoundingClientRect()

        container.addEventListener("mousedown", e => {
            let xPercent = (e.clientX - rect.left)/(rect.right - rect.left)*100;
            if (xPercent > 100) {
                xPercent = 100;
            } else if (xPercent < 0) {
                xPercent = 0;
            }
            this.props.handleChange(xPercent, "mousedown")
        })
        page.addEventListener("mousemove", e => {
            let xPercent = (e.clientX - rect.left)/(rect.right - rect.left)*100;
            if (xPercent > 100) {
                xPercent = 100;
            } else if (xPercent < 0) {
                xPercent = 0;
            }
            if (this.props.mouseDown) {
                this.props.handleChange(xPercent, "mousemove")
            }
        })
        page.addEventListener("mouseup", e => {
            let xPercent = (e.clientX - rect.left)/(rect.right - rect.left)*100;
            if (xPercent > 100) {
                xPercent = 100;
            } else if (xPercent < 0) {
                xPercent = 0;
            }
            if (this.props.mouseDown) {
                this.props.handleChange(xPercent, "mouseup")
            }
        })
        page.addEventListener("mouseleave", e => {
            if (this.props.mouseDown) {
                this.props.handleChange(null, "mouseup")
            }
        })

        container.addEventListener("touchstart", e => {
            let xPercent = (e.changedTouches[0].pageX - rect.left)/(rect.right - rect.left)*100;
            if (xPercent > 100) {
                xPercent = 100;
            } else if (xPercent < 0) {
                xPercent = 0;
            }
            this.props.handleChange(xPercent, "mousedown")
        })
        page.addEventListener("touchmove", e => {
            let xPercent = (e.changedTouches[0].pageX - rect.left)/(rect.right - rect.left)*100;
            if (xPercent > 100) {
                xPercent = 100;
            } else if (xPercent < 0) {
                xPercent = 0;
            }
            if (this.props.mouseDown) {
                this.props.handleChange(xPercent, "mousemove")
            }
        })
        page.addEventListener("touchend", e => {
            let xPercent = (e.changedTouches[0].pageX - rect.left)/(rect.right - rect.left)*100;
            if (xPercent > 100) {
                xPercent = 100;
            } else if (xPercent < 0) {
                xPercent = 0;
            }
            if (this.props.mouseDown) {
                this.props.handleChange(xPercent, "mouseup")
            }
        })
        page.addEventListener("touchcancel", e => {
            if (this.props.mouseDown) {
                this.props.handleChange(null, "mouseup")
            }
        })
    }

    componentDidMount() {
        this.addListeners()
        window.onresize = this.addListeners;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentTime !== this.props.currentTime) {
            let left = (this.props.currentTime/this.props.duration) * 100
            this.setState({
                ...this.state,
                percentLeft: left
            })
        }
    }

    render() {
        return (
            <div className="slider-container">
                <div className="slider" ref={this.sliderRef}>
                    <div id="foundation" />
                    <div id="buffer" />
                    <div id="progress" style={{width: `${this.props.left}%`}} />
                    <div id="slider" style={{left: `${this.props.left}%`}} />
                </div>
            </div>
        )
    }
}