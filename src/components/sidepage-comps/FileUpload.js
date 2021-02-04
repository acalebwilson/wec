import React from 'react';
import FormSection from '../formSection';

const FileUpload = (props) => {
    let uploadArea;
    if (!props.file) {
      uploadArea = (
        <button
          onClick={(e) => {
            e.preventDefault();
            props.handleClick();
          }}
          className={props.adminShowcaseMode ? "disabled" : ""}
        >
          {props.adminShowcaseMode ? "Upload Disbled - In Showcase Mode" : "Choose Audio File"}
        </button>
      );
    } else {
      uploadArea = (
        <div id="file-wrapper">
          <div id="bar">
            <p>{props.file.name}</p>
          </div>
        </div>
      );
    }
  
    return (
      <FormSection valid={props.valid}>
        <input
          type="file"
          style={{ display: "none" }}
          ref={props.audioRef}
          onChange={props.handleFileUpload}
          className={props.adminShowcaseMode ? "disabled" : ""}
        />
        <div id="file-upload-area">{uploadArea}</div>
      </FormSection>
    );
  };

export default FileUpload;