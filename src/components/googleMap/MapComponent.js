import React, { useState, useContext, useEffect } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import "./MapComponent.css";
import AuthContext from "../../contexts/auth/authContext";
import MapComponentContext from "../../contexts/mapComponent/mapComponentContext";
import CustomPopover from "../CustomPopover";
import { DropdownButton, Dropdown, OverlayTrigger } from "react-bootstrap";

const MapComponent = (props) => {
  const [map, setMap] = useState(null);
  const authContext = useContext(AuthContext);
  const mapComponentContext = useContext(MapComponentContext);

  const {
    geofencePoints,
    canSetGeofence,
    addGeofencePoint,
    resetGeofencePoints,
  } = mapComponentContext;

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: -33.865143,
    lng: 151.2099,
  };

  const handleLogoutBtn = () => {
    authContext.logoutUser();
  };

  const handleSetGeofenceBtn = () => {
    mapComponentContext.setCanSetGeofence(true);
  };

  const handleRemoveGeofenceBtn = () => resetGeofencePoints();

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onPolygonLoad = (polygon) => {
    console.log("polygon: ", polygon);
  };

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const polygonOptions = {
    fillColor: "lightblue",
    fillOpacity: 0.5,
    strokeColor: "lightblue",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: true,
    geodesic: false,
    zIndex: 1,
  };

  useEffect(() => {}, [canSetGeofence, geofencePoints]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true }}
        onClick={
          (e) => addGeofencePoint({ lat: e.latLng.lat(), lng: e.latLng.lng() }) //{ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
      >
        {props.children}
        {Object.keys(geofencePoints).length !== 0 ? (
          <Polygon
            onLoad={onPolygonLoad}
            paths={geofencePoints}
            options={polygonOptions}
            editable={true}
            draggable={true}
          />
        ) : null}
        <DropdownButton
          id="dropdown-basic-button"
          title="Actions"
          className="button-group mb-2"
          size="lg"
        >
          <OverlayTrigger
            trigger="click"
            key="set-geofence-trigger"
            placement="left"
            overlay={
              <CustomPopover
                placement="right"
                title="Set Geofence Activated"
                content={
                  "You can now set your geofence on the map, when finished, click on Set Geofence again."
                }
              />
            }
          >
            <Dropdown.Item href="#/action-1" onClick={handleSetGeofenceBtn}>
              Set Geofence
            </Dropdown.Item>
          </OverlayTrigger>
          <Dropdown.Item href="#/action-2" onClick={handleRemoveGeofenceBtn}>
            Remove Geofence{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogoutBtn}>Logout</Dropdown.Item>
        </DropdownButton>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
