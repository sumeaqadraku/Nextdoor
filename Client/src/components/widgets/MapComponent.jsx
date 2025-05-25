import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Vendndodhja e qendrës

const MapComponent = ({longitude,latitude,address}) => {
    console.log("🛰️ MapComponent received →", { latitude, longitude, address });

   const rawLat = latitude;
  const rawLng = longitude;

  const lat = parseFloat(rawLat);
  const lng = parseFloat(rawLng);

  // Bail out early if coords are invalid
  

  const center = [lat, lng];

  return (
    <MapContainer center={center} zoom={12} style={{ height: "300px", width: "100%" }}>
      {/* OpenStreetMap Tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Example Property Marker */}
      <Marker position={center}>
        <Popup>Real Estate Property</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
