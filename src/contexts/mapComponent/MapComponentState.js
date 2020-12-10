import React, { useReducer } from "react";
import MapComponentContext from "./mapComponentContext";
import MapComponentReducer from "./MapComponentReducer";
import Database from "../../utils/database";
import {
  SET_GEOFENCE_POINTS,
  SET_LATEST_MARKER,
  SET_CAN_SET_GEOGENCE,
  ADD_GEOFENCE_POINT,
  RESET_GEOFENCE,
  SET_GEOFENCE_POINTS_FROM_FIREBASE,
} from "../types";

const MapComponentState = (props) => {
  const initialState = {
    marker: {},
    geofencePoints: [],
    canSetGeofence: false,
  };

  const [state, dispatch] = useReducer(MapComponentReducer, initialState);

  /**
   * Obtain the latest geopoint from firebase then set the latest marker
   * according to it's latitude - longitude properties
   */
  const setLatestMarker = async () => {
    const latestGeoPoint = await Database.instance.getLatestMarker();
    dispatch({ type: SET_LATEST_MARKER, payload: latestGeoPoint });
  };

  /**
   * Set the geofencePoints context variable that's used to create the geofence
   * polygon.
   * @param {list} latLngArray - array of latitude longitude points for the
   * geofence
   */
  const setGeofencePoints = (latLngArray) =>
    dispatch({ type: SET_GEOFENCE_POINTS, payload: latLngArray });

  /**
   * Add a new Latitude Longitude object to the `geofencePoints` array.
   * @param {object} latLngObject - the lat lng to be added
   */
  const addGeofencePoint = (latLngObject) => {
    const updatedGeofencePoints = [...state.geofencePoints, latLngObject];
    dispatch({ type: ADD_GEOFENCE_POINT, payload: updatedGeofencePoints });
  };

  /**
   * used to set the `canSetGeofence` boolean in the mapComponentContext.
   * Used to determine user button presses on the map are added to the
   * `geofencePoints` array.
   */
  const setCanSetGeofence = () =>
    dispatch({ type: SET_CAN_SET_GEOGENCE, payload: !state.canSetGeofence });

  /**
   * Uppload the geofencePoints array to the `firestore` database
   */
  const uploadGeofencePoints = async () =>
    await Database.instance.uploadGeofenceCoordinates(state.geofencePoints);

  /**
   * Reset the `geofencePoints` array.
   */
  const resetGeofencePoints = () => {
    Database.instance.uploadGeofenceCoordinates([]);
    dispatch({ type: RESET_GEOFENCE });
  };

  /**
   * Used to update geofencePoints state from Firebase - Firestore values
   */
  const setGeofencePointsFromFirebase = async () => {
    const payload = await Database.instance.getGeofenceCoordinates();
    dispatch({ type: SET_GEOFENCE_POINTS_FROM_FIREBASE, payload: payload });
  };

  return (
    <MapComponentContext.Provider
      value={{
        marker: state.marker,
        geofencePoints: state.geofencePoints,
        canSetGeofence: state.canSetGeofence,
        setLatestMarker,
        setGeofencePoints,
        setCanSetGeofence,
        addGeofencePoint,
        resetGeofencePoints,
        uploadGeofencePoints,
        setGeofencePointsFromFirebase,
      }}
    >
      {props.children}
    </MapComponentContext.Provider>
  );
};

export default MapComponentState;
