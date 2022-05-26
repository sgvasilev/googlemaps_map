import {
  INITIAL_STATE,
  ADD_MARKER,
  DELETE_MARKER,
  RENEW_MARKER,
  REORDER_MARKERS,
  MARKER_LIST,
} from "../components/const/userMarkers"

const markersReducer = (state, action) => {
  switch (action.type) {
    case INITIAL_STATE:
      return {
        ...state,
        userMarkers: action.payload,
      }
    case ADD_MARKER:
      return {
        ...state,
        userMarkers: [...state.userMarkers, action.payload],
      }
    case DELETE_MARKER:
      return {
        ...state,
        userMarkers: [...action.payload],
      }

    case REORDER_MARKERS:
      return {
        ...state,
        userMarkers: [...action.payload],
      }
    case MARKER_LIST:
      return {
        ...state,
        marker: [action.payload],
      }
    case RENEW_MARKER:
      return {
        ...state,
        userMarkers: [...action.payload],
      }

    default:
      return state
  }
}

export default markersReducer
