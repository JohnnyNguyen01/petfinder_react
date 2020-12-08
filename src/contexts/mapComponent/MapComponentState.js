import React, { useReducer } from "react";
import MapComponentContext from "./mapComponentContext";
import MapComponentReducer from "./MapComponentReducer";
import Database from "../../utils/database";
import { SET_LATEST_MARKER } from "../types";

const MapComponentState = (props) => {
  const initialState = {
    marker: {},
  };

  const [state, dispatch] = useReducer(MapComponentReducer, initialState);

  const setLatestMarker = async () => {
    const latestGeoPoint = await Database.instance.getLatestMarker();
    dispatch({ type: SET_LATEST_MARKER, payload: latestGeoPoint });
  };

  return (
    <MapComponentContext.Provider
      value={{ marker: state.marker, setLatestMarker }}
    >
      {props.children}
    </MapComponentContext.Provider>
  );
};

export default MapComponentState;
