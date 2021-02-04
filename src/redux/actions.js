import {
  LOGIN,
  LOGOUT,
  AUDIO_FILE,
  AUDIO_PLAY,
  AUDIO_PAUSE,
  AUDIO_TIME,
  AUDIO_VOLUME,
  DURATION,
  HEADER,
  CLEAR_AUDIO,
  OPEN_SIDE_PAGE,
  CLOSE_SIDE_PAGE,
  SIDE_PAGE,
  AUDIO_LIST,
  AUDIO_TO_EDIT,
  CLEAR_AUDIO_TO_EDIT,
  ADD_EVENT_LIST,
  RESIZE,
  AUDIO_FILE_TO_UPLOAD,
  LOADED_STATE,
  UPLOADED_AUDIO_INFORMATION,
  UPLOADED_AUDIO_URL,
  CLEAR_UPLOADED_AUDIO_DATA,
  AUDIO_UPLOAD_TYPE,
  AUDIO_UPLOAD_DATE,
  AUDIO_UPLOAD_SERIES,
  AUDIO_UPLOAD_SPEAKER,
  AUDIO_UPLOAD_REFERENCES,
  AUDIO_DATA_READY,
  AUDIO_EDIT_ID,
  CURRENT_EVENT,
  SIDE_PAGE_THEME,
  ADMIN_SHOWCASE_TOGGLE_ON,
  ADMIN_SHOWCASE_TOGGLE_OFF
} from "./types";

export const currentEventAction = (event) => {
  return {
    type: CURRENT_EVENT,
    event
  }
}

export const sidePageThemeAction = (theme) => {
  return {
    type: SIDE_PAGE_THEME,
    theme
  }
}


export const audioEditIdAction = (id) => {
  return {
    type: AUDIO_EDIT_ID,
    id: id
  }
}

export const audioUploadTypeAction = (type) => {
  return {
    type: AUDIO_UPLOAD_TYPE,
    audioType: type
  }
}

export const audioUploadDataReady = () => {
  return {
    type: AUDIO_DATA_READY,
  }
}

export const audioUploadDateAction = (date) => {
  return {
    type: AUDIO_UPLOAD_DATE,
    date: date
  }
}

export const audioUploadSeriesAction = (series) => {
  return {
    type: AUDIO_UPLOAD_SERIES,
    series: series
  }
}

export const audioUploadSpeakerAction = (speaker) => {
  return {
    type: AUDIO_UPLOAD_SPEAKER,
    speaker: speaker
  }
}

export const audioUploadReferencesAction = (references) => {
  return {
    type: AUDIO_UPLOAD_REFERENCES,
    references: references
  }
}

export const loginAction = (user) => {
  return {
    type: LOGIN,
    user: user,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const addAudioAction = (audio) => {
  return {
    type: AUDIO_FILE,
    audio: audio,
  };
};

export const playAudioAction = () => {
  return {
    type: AUDIO_PLAY,
  };
};

export const pauseAudioAction = () => {
  return {
    type: AUDIO_PAUSE,
  };
};

export const audioTimeAction = (time) => {
  return {
    type: AUDIO_TIME,
    time: time,
  };
};

export const audioVolumeAction = (volume) => {
  return {
    type: AUDIO_VOLUME,
    volume: volume,
  };
};

export const durationAction = (duration) => {
  return {
    type: DURATION,
    duration: duration,
  };
};

export const headerAction = (title) => {
  return {
    type: HEADER,
    headerTitle: title
  };
};

export const clearAudioAction = () => {
  return {
    type: CLEAR_AUDIO,
  };
};

export const openSidePageAction = () => {
  return {
    type: OPEN_SIDE_PAGE,
  };
};

export const closeSidePageAction = () => {
  return {
    type: CLOSE_SIDE_PAGE,
  };
};

export const sidePageAction = (sidePage) => {
  return {
    type: SIDE_PAGE,
    sidePage: sidePage,
  };
};

export const audioListAction = (audioList) => {
  return {
    type: AUDIO_LIST,
    audioList: audioList,
  };
};

export const audioToEditAction = (audio) => {
  return {
    type: AUDIO_TO_EDIT,
    audioToEdit: audio,
  };
};

export const clearAudioToEditAction = () => {
  return {
    type: CLEAR_AUDIO_TO_EDIT,
  };
};

export const addEventList = (list) => {
  return {
    type: ADD_EVENT_LIST,
    list: list,
  };
};

export const resizeAction = (size) => {
  return {
    type: RESIZE,
    size: size,
  };
};

export const addAudioFileToUpload = (file) => {
  return {
    type: AUDIO_FILE_TO_UPLOAD,
    audioFile: file,
  };
};

export const loadedStateUpdate = (loaded) => {
  return {
    type: LOADED_STATE,
    loaded: loaded
  }
}

export const uploadedAudioFileUrl = (url) => {
  return {
    type: UPLOADED_AUDIO_URL,
    url: url
  }
}

export const uploadedAudioFileData = (data) => {
  return {
    type: UPLOADED_AUDIO_INFORMATION,
    data: data
  }
}

export const clearUploadedAudioData = () => {
  return {
    type: CLEAR_UPLOADED_AUDIO_DATA
  }
}

export const adminShowcaseToggleOn = () => {
  return {
    type: ADMIN_SHOWCASE_TOGGLE_ON
  }
}

export const adminShowcaseToggleOff = () => {
  return {
    type: ADMIN_SHOWCASE_TOGGLE_OFF
  }
}