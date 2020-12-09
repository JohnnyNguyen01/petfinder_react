import React, { useState, useContext } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Button, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import "./MapComponent.css";
import AuthContext from "../../contexts/auth/authContext";

const MapComponent = (props) => {
  const [map, setMap] = useState(null);
  const authContext = useContext(AuthContext);

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

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true }}
        onClick={(e) =>
          console.log(`lat: ${e.latLng.lat()} \nlng: ${e.latLng.lng()}`)
        }
      >
        {props.children}
        <DropdownButton
          id="dropdown-basic-button"
          title="Actions"
          className="button-group mb-2"
          size="lg"
        >
          <Dropdown.Item href="#/action-1">Set Geofence</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Remove Geofence </Dropdown.Item>
          <Dropdown.Item onClick={handleLogoutBtn}>Logout</Dropdown.Item>
        </DropdownButton>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
