import {
  LOGIN,
  AUDIO_FILE_TO_UPLOAD,
  UPLOADED_AUDIO_INFORMATION,
  CLEAR_UPLOADED_AUDIO_DATA,
  UPLOADED_AUDIO_URL,
  LOADED_STATE,
  RESIZE,
  CLEAR_AUDIO,
  CLEAR_AUDIO_TO_EDIT,
  AUDIO_TO_EDIT,
  ADD_EVENT_LIST,
  HEADER,
  DURATION,
  LOGOUT,
  SIDE_PAGE,
  AUDIO_FILE,
  AUDIO_PLAY,
  AUDIO_PAUSE,
  AUDIO_TIME,
  AUDIO_VOLUME,
  AUDIO_LIST,
  OPEN_SIDE_PAGE,
  CLOSE_SIDE_PAGE,
  AUDIO_UPLOAD_DATE,
  AUDIO_UPLOAD_REFERENCES,
  AUDIO_UPLOAD_SERIES,
  AUDIO_UPLOAD_SPEAKER,
  AUDIO_UPLOAD_TYPE,
  AUDIO_DATA_READY,
  AUDIO_EDIT_ID,
  CURRENT_EVENT,
  SIDE_PAGE_THEME,
  ADMIN_SHOWCASE_TOGGLE_ON,
  ADMIN_SHOWCASE_TOGGLE_OFF,
} from "./types";

export const initialState = {
  loggedIn: null,
  user: null,
  audio: null,
  isPlaying: false,
  volume: 50,
  currentTime: 0,
  sidePageClassName: "hide",
  sidePage: "",
  eventList: [],
  width: null,
  audioFileToUpload: null,
  audioLoaded: null,
  uploadedAudioUrl: null,
  uploadedAudioInfo: null,
  audioUploadReferences: [],
  audioUploadDate: "",
  audioUploadSeries: "",
  audioUploadSpeaker: "",
  audioUploadType: "",
  audioDataReady: false,
  event: {},
  theme: "light",
  adminShowcaseMode: false
};

export const logReducer = (state, action) => {
  switch (action.type) {
    case SIDE_PAGE_THEME:
      return {
        ...state,
        theme: action.theme
      }
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    case AUDIO_FILE:
      return {
        ...state,
        audio: action.audio,
      };
    case AUDIO_PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case AUDIO_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case AUDIO_VOLUME:
      return {
        ...state,
        volume: action.volume,
      };
    case AUDIO_TIME:
      return {
        ...state,
        time: action.time,
      };
    case DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    case HEADER:
      return {
        ...state,
        headerTitle: action.headerTitle,
      };
    case CLEAR_AUDIO:
      return {
        ...state,
        isPlaying: false,
        audio: null,
      };
    case OPEN_SIDE_PAGE:
      return {
        ...state,
        sidePageClassName: "",
      };
    case CLOSE_SIDE_PAGE:
      return {
        ...state,
        sidePageClassName: "hide",
      };
    case SIDE_PAGE:
      return {
        ...state,
        sidePage: action.sidePage,
      };
    case AUDIO_LIST:
      return {
        ...state,
        audioList: action.audioList,
      };
    case AUDIO_TO_EDIT:
      return {
        ...state,
        audioToEdit: action.audioToEdit,
      };
    case CLEAR_AUDIO_TO_EDIT:
      return {
        ...state,
        audioToEdit: null,
      };
    case ADD_EVENT_LIST:
      return {
        ...state,
        eventList: action.list,
      };
    case RESIZE:
      return {
        ...state,
        width: action.size,
      };
    case AUDIO_FILE_TO_UPLOAD:
      return {
        ...state,
        audioFileToUpload: action.audioFile,
      };
    case LOADED_STATE:
      return {
        ...state,
        audioLoaded: action.loaded,
      };
    case UPLOADED_AUDIO_URL:
      return {
        ...state,
        uploadedAudioUrl: action.url,
      };
    case UPLOADED_AUDIO_INFORMATION:
      return {
        ...state,
        uploadedAudioInfo: action.data,
      };
    case AUDIO_UPLOAD_DATE:
      return {
        ...state,
        audioUploadDate: action.date,
      };
    case AUDIO_UPLOAD_SERIES:
      return {
        ...state,
        audioUploadSeries: action.series,
      };
    case AUDIO_UPLOAD_TYPE:
      return {
        ...state,
        audioUploadType: action.audioType,
      };
    case AUDIO_UPLOAD_SPEAKER:
      return {
        ...state,
        audioUploadSpeaker: action.speaker,
      };
    case AUDIO_UPLOAD_REFERENCES:
      return {
        ...state,
        audioUploadReferences: action.references,
      };
    case CLEAR_UPLOADED_AUDIO_DATA:
      return {
        ...state,
        audioFileToUpload: null,
        audioLoaded: null,
        uploadedAudioUrl: null,
        audioDataReady: false,
        audioUploadSpeaker: "",
        audioUploadSeries: "",
        audioUploadDate: "",
        audioUploadType: "",
        audioUploadReferences: []
      };
    case AUDIO_DATA_READY:
        return {
            ...state,
            audioDataReady: true
        }
    case AUDIO_EDIT_ID:
        return {
            ...state,
            audioToEditId: action.id
        }
    case CURRENT_EVENT:
      return {
        ...state,
        event: action.event
      }
    case ADMIN_SHOWCASE_TOGGLE_ON:
        return {
          ...state,
          adminShowcaseMode: true
        }
      case ADMIN_SHOWCASE_TOGGLE_OFF:
        return {
          ...state,
          adminShowcaseMode: false
        }
    default:
      return state;
  }
};
