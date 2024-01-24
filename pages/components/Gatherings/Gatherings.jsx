'use client';

import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";
import axios from 'axios';
var OpenLocationCode = require('open-location-code').OpenLocationCode;
var openLocationCode = new OpenLocationCode();

var raw_gatherings = [];
var _gatherings = [];
axios.get("http://localhost:3000/api/gatherings")
  .then(res => {
  raw_gatherings = res.data;
  raw_gatherings?.forEach(({ig_name, ig_link, plus_code}) => { 
    var coord = openLocationCode.decode(plus_code);
    var gather = {
      "name": ig_name,
      "link": ig_link,
      "lat": coord.latitudeCenter,
      "lng": coord.longitudeCenter,
    }
    _gatherings.push(gather);
  });
})

const gatherings = _gatherings;

export const Gatherings = () => {
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    // const center = useMemo(() => ({ lat: -34.7, lng: -58.5 }), []);
    
    const onMapLoad = (map) => {
      setMapRef(map);
      const bounds = new window.google.maps.LatLngBounds();
      gatherings?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);
    };
  
    const handleMarkerClick = (id, lat, lng, name, link) => {
      mapRef?.panTo({ lat, lng });
      setInfoWindowData({ id, name, link });
      setIsOpen(true);
    };

    return (
      <GoogleMap
        mapContainerClassName="map-container"
        onLoad={onMapLoad}
        onClick={() => setIsOpen(false)}
      >
        {gatherings.map(({ name, link, lat, lng }, ind) => (
          <Marker
            key={ind}
            position={{ lat, lng }}
            onClick={() => {
              handleMarkerClick(ind, lat, lng, name, link);
            }}
          >
            {isOpen && infoWindowData?.id === ind && (
              <InfoWindow
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <a href={infoWindowData.link}><h3>{infoWindowData.name}</h3></a>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    );
  };