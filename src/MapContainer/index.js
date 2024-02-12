import React, { useEffect, useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import GoogleMapReact from 'google-map-react';
import { Button } from "@mui/material";
import "./index.css";

const BlinkingMarker = ({ text }) => (
  <div className="blinking-marker">
    <MyLocationIcon /> {text}
  </div>
);

const MapContainer = ({ vehicles }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);

  const defaultCenter = {
    lat: 17.4555136,
    lng: 78.39744
  };


  const getAddress = async () => {
    setAddressLoading(true)
    try {
      const apiUrl = `https://geocode.maps.co/reverse?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&api_key=65c8f824c0927427556021bste98107`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch address. Status: ${response.status}`);
      }

      const data = await response.json();
      const { address } = data;
      const {
        county,
        residential,
        suburb,
        state,
        state_district,
        postcode,
      } = address;

      setStreet(
        `${residential !== undefined ? residential : ""} ${suburb && suburb}`
      );
      setCity(county && county);
      setState(state);
      setDistrict(state_district);
      setPostalCode(postcode);
    } catch (error) {
      console.error("Error fetching address:", error);
    } finally {
      setAddressLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (currentLocation) getAddress();
  }, [currentLocation]);

  const handleMapChange = ({ bounds }) => {
    console.log(bounds);
  };

  const handleZoomAnimationStart = ({ bounds}) => {
    console.log(bounds);
  };

  const handleZoomAnimationEnd = ({ bounds }) => {
    console.log(bounds);
  };

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <Button
        variant="contained"
        color="success"
        className="location-button"
        onClick={getCurrentLocation}
      >
        Get Current Location
      </Button>
      {!addressLoading && vehicles && Array.isArray(vehicles) && (
        <div className="vehicles">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDst7aYJ5JHFBHsB0uEgd9OyfYNPDHIMC4" }}
            mapContainerStyle={{
              width: '100%',
              height: '40vh',
            }}
            defaultZoom={10}
            center={defaultCenter}
            onChange={handleMapChange}
            onZoomAnimationStart={handleZoomAnimationStart}
            onZoomAnimationEnd={handleZoomAnimationEnd}
          >
            {currentLocation && <BlinkingMarker key={10} text={"My Location"} />}

          
            {vehicles.map((vehicle) => (
            <BlinkingMarker
              key={vehicle.id}
              text={vehicle.name}
              lat={vehicle.position[0]}
              lng={vehicle.position[1]}
            />
          ))}
          </GoogleMapReact>
        </div>
      )}
      <div>
        {addressLoading && <p>Loading...</p>}
        {!addressLoading && (
          <div>
            <p>{street}</p>
            <p>{city}</p>
            <p>{state}</p>
            <p>{district}</p>
            <p>{postalCode}</p>
            <p id="locationOutput">
            {currentLocation && (
              `Latitude: ${currentLocation.latitude}
              Longitude: ${currentLocation.longitude}`
            )}
          </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapContainer;
