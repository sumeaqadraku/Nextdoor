import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Vendndodhja e qendrës
const center = [37.7749, -122.4194];

const MapComponent = () => {
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
