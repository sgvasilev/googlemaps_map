import { screen, debug, fireEvent, render } from "@testing-library/react"
import markersReducer from "../../reducers/markersReducer"

import {
  INITIAL_STATE,
  ADD_MARKER,
  DELETE_MARKER,
  RENEW_MARKER,
  REORDER_MARKERS,
  MARKER_LIST,
} from "../../components/const/userMarkers"

const initialState = {
  userMarkers: [],
  marker: [],
}

describe("reducers test", () => {
  it("initial state", () => {
    const update = { type: INITIAL_STATE, payload: [{ id: 1 }, { id: 2 }] }
    const updatedByInitialState = markersReducer(initialState, update)
    expect(updatedByInitialState).toEqual({
      marker: [],
      userMarkers: [{ id: 1 }, { id: 2 }],
    })
  })
  it("add marker", () => {
    const addMarker = {
      type: ADD_MARKER,
      payload: { id: 3 },
    }
    const updatedByAddingMarker = markersReducer(initialState, addMarker)
    expect(updatedByAddingMarker).toEqual({
      marker: [],
      userMarkers: [{ id: 3 }],
    })
  })
  it("delete marker", () => {
    const update = { type: INITIAL_STATE, payload: [{ id: 1 }, { id: 2 }] }
    const updated = markersReducer(initialState, update)
    const deleteMarker = {
      type: DELETE_MARKER,
      payload: [{ id: 1 }],
    }

    const updatedByDeletingMarker = markersReducer(updated, deleteMarker)
    expect(updatedByDeletingMarker).toEqual({
      marker: [],
      userMarkers: [{ id: 1 }],
    })
  })
  it("reorder markers", () => {
    const update = { type: INITIAL_STATE, payload: [{ id: 1 }, { id: 2 }] }
    const updated = markersReducer(initialState, update)
    const updateMarker = {
      type: REORDER_MARKERS,
      payload: [{ id: 2 }, { id: 1 }],
    }

    const updatedByReorderMarker = markersReducer(updated, updateMarker)
    expect(updatedByReorderMarker).toEqual({
      marker: [],
      userMarkers: [{ id: 2 }, { id: 1 }],
    })
  })
  it("marker (from google maps) list add", () => {
    const update = {
      type: MARKER_LIST,
      payload: { marker: 1 },
    }
    const updatedNyAddmingMarker = markersReducer(initialState, update)
    expect(updatedNyAddmingMarker).toEqual({
      marker: [{ marker: 1 }],
      userMarkers: [],
    })
  })
  it("update marker (from google maps)", () => {
    const initialState = {
      userMarkers: [{ marker: 1 }, { marker: 2 }],
      marker: [],
    }
    const reorderMarkers = {
      type: RENEW_MARKER,
      payload: [{ marker: 2 }, { marker: 1 }],
    }
    const updatedByReorderingMarkers = markersReducer(
      initialState,
      reorderMarkers
    )
    expect(updatedByReorderingMarkers).toEqual({
      marker: [],
      userMarkers: [{ marker: 2 }, { marker: 1 }],
    })
  })
  it("default case", () => {
    const initialState = {
      userMarkers: [{ id: 1 }, { id: 2 }],
      marker: [{ marker: 1 }, { marker: 2 }],
    }
    const defaultCase = {
      type: "RENEW_MARKER_DEFAULT",
      payload: [{ marker: 2 }, { marker: 1 }],
    }
    const updatedByDefaultCase = markersReducer(initialState, defaultCase)
    expect(updatedByDefaultCase).toEqual({
      userMarkers: [{ id: 1 }, { id: 2 }],
      marker: [{ marker: 1 }, { marker: 2 }],
    })
  })
})
