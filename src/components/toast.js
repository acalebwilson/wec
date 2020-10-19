import React from "react";

const Toast = (props) => {
  return (
    <div className={`${props.show} toast`}>
      <div className="toast-header">
        <h6>{props.title}</h6>
        <div className="toast-exit" onClick={(e) => props.closeToast(e)}>
          <i className="fas fa-times" id={props.toastId}/>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Toast;
