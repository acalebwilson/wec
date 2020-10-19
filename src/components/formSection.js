import React from 'react'



const NewFormSection = props => {
    let className;
    if (props.valid) {
        className = ""
    } else {
        className = "invalid"
    }
    let type;
    if (props.type) {
        type = props.type
    } else {
        type = ""
    }

    return (
        <div className={"form-section " + className + " " + type}>
            {props.children}
        </div>
    )
}

export default NewFormSection