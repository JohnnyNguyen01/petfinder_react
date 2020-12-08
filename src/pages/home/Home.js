import React from "react";
import MapComponent from "../../components/googleMap/MapComponent";
import { Marker } from '@react-google-maps/api';

const Home = () => {
  return (
    <div>
      <MapComponent>
        <Marker position={{ lat: -33.865143, lng: 151.2099 }}/>
        <p position={{ lat: -33.865143, lng: 151.2099 }}>Hello there</p>
      </MapComponent>
    </div>
  );
};

export default Home;
