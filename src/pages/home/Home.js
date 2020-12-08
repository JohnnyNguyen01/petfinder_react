import React, { useState, useContext, useEffect } from "react";
import MapComponent from "../../components/googleMap/MapComponent";
import MapComponentContext from "../../contexts/mapComponent/mapComponentContext";
import { Marker } from "@react-google-maps/api";

const Home = () => {
  const mapComponentContext = useContext(MapComponentContext);
  const { marker } = mapComponentContext;
  //Methods
  const getLatestMarker = async () => mapComponentContext.setLatestMarker();

  useEffect(() => {
    getLatestMarker();
    console.log(`${marker} obtained`);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <MapComponent>
        {Object.keys(marker).length !== 0 ? (
          <Marker
            position={{
              lat: marker.coordinates.latitude,
              lng: marker.coordinates.longitude,
            }}
          />
        ) : null}
      </MapComponent>
    </div>
  );
};

export default Home;
