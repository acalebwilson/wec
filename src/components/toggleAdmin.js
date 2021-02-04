import React from "react";

const ToggleAdmin = (props) => {
    let lt = <p>&lt;</p>
    let gt = <p>&gt;</p>
    let control = props.showToggleAdmin ? lt : gt;
  return (
    <div id="admin-toggle-container" className={`${props.showToggleAdmin ? "show" : ""} ${props.adminMode ? "" : "on"}`}>
        <div id="admin-toggle-controls">
            <h5>Admin mode is {props.adminMode ? "on" : "off"}.</h5>
            <button onClick={props.handleAdminToggle}>Toggle {props.adminMode ? "off" : "on"}</button>
            <p>This is for portfolio purposes, no changes made will be accepted by the server.</p>
        </div>
        <div id="admin-toggle-hide" onClick={props.toggleShowAdminMode}>
            {control}
        </div>
    </div>
  );
};

export default ToggleAdmin;
