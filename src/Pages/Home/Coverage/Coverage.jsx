import React, { useRef } from "react";
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
  const division = useLoaderData();
  const mapRef = useRef(null);
  const position = [23.8103, 90.4125]; // Dhaka (example)
  console.log(division);
  const handleSerach = (e) => {
    e.preventDefault();
    const data = e.target.search.value;
    const districtData = division.find((d) =>
      d.district.toLowerCase().includes(data.toLowerCase())
    );
    if (districtData) {
      const ordinate = [districtData.latitude, districtData.longitude];
      console.log(ordinate);
      mapRef.current.flyTo(ordinate, 13);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl my-5">Our Service in 64 Districts</h1>
      <div>
        {/* Serach */}
        <form onSubmit={handleSerach}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              name="search"
              type="search"
              className="grow"
              placeholder="Search"
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
        </form>
      </div>
      {/* Map */}
      <div className="h-[600px] w-11/12 mx-auto">
        <MapContainer
          className="h-[600px]"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {division.map((singleDivision) => (
            <Marker
              position={[singleDivision.latitude, singleDivision.longitude]}
            >
              <Popup>
                <strong>District: {singleDivision.district}</strong>
                <br />
                Covered-Area: {singleDivision.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
