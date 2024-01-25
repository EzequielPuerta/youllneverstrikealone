'use client';

import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from 'axios';
var OpenLocationCode = require('open-location-code').OpenLocationCode;
var openLocationCode = new OpenLocationCode();


export const Gatherings = () => {
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const [gatherings, setGatherings] = useState([]);
    
    useEffect(() => {
      axios
         .get("https://you-ll-never-strike-alone-backend.fly.dev/gatherings/?format=json")
         .then(( response ) => { 
            const raw_gatherings = response.data;
            const _gatherings = raw_gatherings.map(({ig_name, ig_link, plus_code}) => { 
                var coord = openLocationCode.decode(plus_code);
                return {
                  "name": ig_name,
                  "link": ig_link,
                  "lat": coord.latitudeCenter,
                  "lng": coord.longitudeCenter,
                }
            });
            setGatherings( _gatherings );
          })   
    }, []);

    const onMapLoad = (map) => {
      setMapRef(map);
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: 10, lng: -60 });
      bounds.extend({ lat: -53, lng: -75 });
      bounds.extend({ lat: 30, lng: 20 });
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