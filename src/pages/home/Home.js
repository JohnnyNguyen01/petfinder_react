import React, { useState, useContext, useEffect } from "react";
import MapComponent from "../../components/googleMap/MapComponent";
import MapComponentContext from "../../contexts/mapComponent/mapComponentContext";
import { InfoWindow, Marker } from "@react-google-maps/api";

const Home = () => {
  const mapComponentContext = useContext(MapComponentContext);
  const [markerSelected, setMarkerSelected] = useState(false);
  const { marker } = mapComponentContext;
  
  //Methods
  //todo: add timer onto this function to run every 5-15 seconds
  const getLatestMarker = async () => mapComponentContext.setLatestMarker();

  useEffect(() => {
    getLatestMarker();
    setTimeout(getLatestMarker, 5000);
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
            onClick={() => {
              setMarkerSelected(!markerSelected);
              console.log(markerSelected);
            }}
          >
            {
              //todo: turn into separate component
              markerSelected ? (
                <InfoWindow>
                  <div>
                    <h2>
                      <span role="img" aria-label="puppy-img">
                        🐶 
                      </span>
                      {` Pet Name Here`}
                    </h2>
                    <p>Tarzan has run the fuck away boyyyy</p>
                  </div>
                </InfoWindow>
              ) : null
            }
          </Marker>
        ) : null}
      </MapComponent>
    </div>
  );
};

export default Home;
