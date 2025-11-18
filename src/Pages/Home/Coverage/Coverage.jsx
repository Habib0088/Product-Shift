import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
const Coverage = () => {
    const division=useLoaderData()
  const position = [23.8103, 90.4125]; // Dhaka (example)
console.log(division);

  return (
    <div>
      <h1 className="font-bold text-2xl my-5">Our Service in 64 Districts</h1>
      <div></div>
      {/* Map */}
      <div className="h-[600px] w-11/12 mx-auto">
        <MapContainer
          className="h-[600px]"
          center={position}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            division.map(singleDivision=><Marker position={[singleDivision.latitude,singleDivision.longitude]}>
            <Popup>
             <strong>District: {singleDivision.district}</strong>
             <br />
             Covered-Area: {singleDivision.covered_area.join(', ')}
            </Popup>
          </Marker>)
          }
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
