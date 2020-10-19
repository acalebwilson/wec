import React from 'react'

const CloseIcon = props => {
    return (
        <div className="close-wrapper" onClick={props.onClose}>
            <i className="fas fa-times"/>
        </div>
    )
}

export default CloseIcon;