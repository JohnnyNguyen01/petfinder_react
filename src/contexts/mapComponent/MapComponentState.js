import React, { useReducer } from "react";
import MapComponentContext from "./mapComponentContext";
import MapComponentReducer from "./MapComponentReducer";
import { db } from "../../firebase";
import { SET_LATEST_MARKER } from "../types";

const MapComponentState = props => {
  const initialState = {
    marker: { lat: null, lng: null },
  };

  const [state, dispatch] = useReducer(MapComponentReducer, initialState);

  const getLatestMarker = async () => {
    const latestGeoPoint = await db
      .collection("DeviceCoordinates")
      .doc("67a4d2ba4065c76e")
      .collection("LatLng")
      .orderBy("date-time", "desc")
      .limit(1)
      .get();
    console.log(latestGeoPoint);
    dispatch({type: SET_LATEST_MARKER, payload: latestGeoPoint})
  };

  return (
    <MapComponentContext.Provider value={{ marker: state.marker, getLatestMarker }}>
      {props.children}
    </MapComponentContext.Provider>
  );
};

export default MapComponentState;
