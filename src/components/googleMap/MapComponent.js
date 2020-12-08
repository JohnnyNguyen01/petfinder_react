import React, {useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = (props) => {
  const [map, setMap] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: -33.865143,
    lng: 151.2099,
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
      >
        {props.children}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
