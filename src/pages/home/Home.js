import React, { useState, useContext, useEffect } from "react";
import MapComponent from "../../components/googleMap/MapComponent";
import MapComponentContext from "../../contexts/mapComponent/mapComponentContext";
import { Marker } from "@react-google-maps/api";

const Home = () => {
  const [markerPosition, setMarkerPosition] = useState({
    latitude: -33.865143,
    longitude: 151.2099,
  });
  const mapComponentContext = useContext(MapComponentContext);

  //Methods
  const getLatestMarker = async () => mapComponentContext.setLatestMarker();
  const setMarker = () => {
    const { coordinates } = mapComponentContext.marker;
    setMarkerPosition(coordinates);
  };

  useEffect(() => {
    getLatestMarker();
    setMarker();
    console.log(markerPosition);
    // eslint-disable-next-line
  }, [markerPosition]);

  return (
    <div>
      <MapComponent>
        <Marker
          position={{
            lat: markerPosition.latitude,
            lng: markerPosition.longitude,
          }}
        />
      </MapComponent>
    </div>
  );
};

export default Home;
