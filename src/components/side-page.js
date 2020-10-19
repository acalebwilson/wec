import React from "react";

const SidePage = (props) => {
  return (
    <React.Fragment>
    <div id="side-page-overlay" className={props.show} onClick={props.closeSide}/>
    <div id="side-page" className={`${props.show} ${props.theme}`}>
      {props.children}
    </div>
    </React.Fragment>
  );
};

export default SidePage;
