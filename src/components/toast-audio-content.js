import React from "react";

const ToastContent = (props) => {
  let toastText = <div />

  if (props.loaded && props.loaded < 100) {
    toastText = <p>Sending to server - {props.loaded}%</p>
  } 

  if (props.loaded === 100) {
    toastText = <p>Uploading to cloud</p>
  }

  if (!props.filedata) {
    toastText = <p>Upload Complete</p>
  }

  return (
    <div className="toast-content">
      {toastText}
    </div>
  )
  
}

export default ToastContent