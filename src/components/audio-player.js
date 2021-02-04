import React from 'react'
import { connect } from 'react-redux'
import { durationAction, addAudioAction, clearAudioAction, playAudioAction, pauseAudioAction, audioTimeAction, audioVolumeAction } from '../redux/actions'
import Slider from './slider'

class LocalAudioPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTime: null,
            duration: null,
            passage: "Select a sermon",
            className: "disabled",
            speaker: "",
            icon: "fas fa-play",
            hide: "hide",
            volumeShow: "",
            initialLoad: true,
            leftAmount: 0,
            mousedown: false
        }
        this.togglePlaying = this.togglePlaying.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleVolume = this.handleVolume.bind(this)
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.handleSlider = this.handleSlider.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.mousedown && !this.state.mousedown) {
            let element = document.getElementById("local-audio")
            element.currentTime = (this.state.leftAmount/100) * element.duration
        }
        if (this.props.reduxState.audio !== prevProps.reduxState.audio && this.props.reduxState.audio) {
            let element = document.getElementById("local-audio")
            element.addEventListener("timeupdate", e => {
                if (!this.state.mousedown) {
                    this.setState({
                        currentTime: e.target.currentTime,
                        duration: e.target.duration,
                        leftAmount: (e.target.currentTime/e.target.duration) * 100
                    })
                } else {
                    this.setState({
                        currentTime: e.target.duration * (this.state.leftAmount/100),
                        duration: e.target.duration
                    })
                }
            })

            element.addEventListener("progress", () => {
                let duration = element.duration;
                if (duration > 0) {
                    for (let i = 0; i < element.buffered.length; i++) {
                        if (element.buffered.start(element.buffered.length - 1 - i) < element.currentTime) {
                            
                            document.getElementById("buffer").style.width = ((element.buffered.end(element.buffered.length - 1 - i) / duration) * 100 + "%")
                            break
                        }
                    }
                }
            })
        }


        if (prevProps !== this.props && this.props.reduxState.audio) {
            let element = document.getElementById("local-audio")
            element.volume = parseInt(this.props.reduxState.volume)/100
            if (this.props.reduxState.isPlaying) {
                element.play()
            } else {
                element.pause()
            }
            this.setState({
                ...this.state, 
                passage: this.props.reduxState.audio.references[0].refString, 
                className: "",
                speaker: this.props.reduxState.audio.speaker,
                hide: "",
                initialLoad: false,
                icon: "fas fa-pause"
            })
        }
    }

    togglePlaying() {
        if (this.props.reduxState.audio) {
            if (this.props.reduxState.isPlaying) {
                this.props.pauseAudio()
            } else {
                this.props.playAudio()
            }
        }
    }

    timeString(time) {
        let seconds = time;
        let hours = Math.floor(seconds / 3600);
        seconds = seconds - hours * 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds - minutes * 60
        
        if (hours > 0) {
            return `${hours}:${minutes}:${Math.floor(seconds)}`
        } else if (seconds === 60) {
            return `${minutes}:00`
        } else if (seconds < 10) {
            return `${minutes}:0${Math.floor(seconds)}`
        } else {
            return `${minutes}:${Math.floor(seconds)}`
        }
    }

    handleVolume(event) {
        this.props.audioVolume(event.target.value)
    }

    onMouseEnter() {
        this.setState({...this.state, volumeShow: "show-volume"})
    }

    onMouseLeave() {
        this.setState({...this.state, volumeShow: ""})
    }


    handleSlider(xPercent, type) {
        switch (type) {
            case "mousedown":
                if (this.props.reduxState.isPlaying) {
                    this.props.pauseAudio()
                }
                this.setState({
                    ...this.state,
                    mousedown: true,
                    leftAmount: xPercent
                })
                break
            case "mousemove":
                this.setState({
                    ...this.state,
                    leftAmount: xPercent
                })
                break
            case "mouseup":
                if (xPercent) {
                    this.setState({
                        ...this.state,
                        mousedown: false,
                        leftAmount: xPercent
                    })
                } else {
                    this.setState({
                        ...this.state,
                        mousedown: false
                    })
                }
                this.props.playAudio()
                break
            default:
                break
        }
    }

    handleClose() {
        this.setState({
            ...this.state,
            hide: "hide"
        })
        this.props.clearAudio()
    }

    render() {
        let audio = <div />
        if (this.props.reduxState.audio) {
            audio = <audio id="local-audio" src={this.props.reduxState.audio.url} />
        } 

        let time = <p>00:00/00:00</p>
        if (this.state.currentTime && this.state.duration) {
            time = <p>{this.timeString(this.state.currentTime)}/{this.timeString(this.state.duration)}</p>
        }
        let icon;

        if (this.props.reduxState.isPlaying) {
            icon = <i className="fas fa-pause" />
        } else {
            icon = <i className="fas fa-play" />
        }

        return (
            <div id="audio-wrapper" className={this.state.hide}>
                <div id="local-audio-player" className={`${this.state.hide} ${this.state.volumeShow}`}>
                    {audio}
                    <div id="player-title-div">
                        <p id="name">{this.state.speaker}</p>
                    </div>
                    <div id="button-div">
                        <button onClick={this.togglePlaying}>{icon}</button>
                    </div>
                    <div id="audio-bar">
                        <Slider 
                        currentTime={this.state.currentTime} 
                        duration={this.state.duration} 
                        handleChange={this.handleSlider}
                        mouseDown={this.state.mousedown}
                        left={this.state.leftAmount}
                        />
                    </div>
                    <div id="close-audio-player" onClick={this.handleClose}>
                        <i className="fas fa-times"/>
                    </div>
                    <p id="reference">{this.state.passage}</p>
                    <div id="time">
                        {time}
                    </div>
                    <div id="volume-slider">
                        <i className="fas fa-volume-down" />
                        <div id="range-div">
                            <input id="slider" type="range" min="1" max="100" value={this.props.reduxState.volume} onChange={this.handleVolume} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {reduxState: state}
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        addAudio: (audio) => {
            dispatch(addAudioAction(audio))
        },
        playAudio: () => {
            dispatch(playAudioAction())
        },
        pauseAudio: () => {
            dispatch(pauseAudioAction())
        },
        audioTime: (time) => {
            dispatch(audioTimeAction(time))
        },
        audioVolume: (volume) => {
            dispatch(audioVolumeAction(volume))
        },
        audioDuration: (duration) => {
            dispatch(durationAction(duration))
        },
        clearAudio: () => {
            dispatch(clearAudioAction())
        }   
    }
}
  
const Presentational = connect(mapStateToProps, mapDispatchToProps)(LocalAudioPlayer)

export default Presentational;