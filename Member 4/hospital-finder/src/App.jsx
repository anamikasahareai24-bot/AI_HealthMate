
import { useState, useEffect } from "react";

import {

  MapContainer,

  TileLayer,

  Marker,

  Popup,

  useMap,

} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import "./App.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:

    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:

    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:

    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

});

function MapUpdater({ position }) {

  const map = useMap();

  useEffect(() => {

    if (position) map.setView(position, 14);

  }, [position, map]);

  return null;

}

function getDistance(lat1, lon1, lat2, lon2) {

  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;

  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =

    Math.sin(dLat / 2) ** 2 +

    Math.cos((lat1 * Math.PI) / 180) *

      Math.cos((lat2 * Math.PI) / 180) *

      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

}

export default function HospitalFinder() {

  const [position, setPosition] = useState(null);

  const [hospitals, setHospitals] = useState([]);

  const [manualLocation, setManualLocation] = useState("");

  const [locationLabel, setLocationLabel] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Find hospitals within 5 km of a location

  async function searchHospitals(lat, lon, label) {

    setPosition([lat, lon]);

    setLocationLabel(label);

    setHospitals([]);

    setLoading(true);

    setError("");

    try {

      const query = `

      [out:json];

       (

        node["amenity"="hospital"](around:10000,${lat},${lon});

        way["amenity"="hospital"](around:10000,${lat},${lon});

        relation["amenity"="hospital"](around:10000,${lat},${lon});

       );

       out center;

       `;

      const response = await fetch(

        "https://overpass-api.de/api/interpreter",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/x-www-form-urlencoded;charset=UTF-8",

          },

          body: "data=" + encodeURIComponent(query),

        }

      );

      if (!response.ok) {

        throw new Error("Hospital service is busy. Try again later.");

      }

      const data = await response.json();

      const elements = Array.isArray(data.elements) ? data.elements : [];

      const results = elements
          .filter((item) => item.tags?.name?.trim())
          .map((item) => {

          const hospitalLat = item.lat ?? item.center?.lat;

          const hospitalLon = item.lon ?? item.center?.lon;

          if (hospitalLat == null || hospitalLon == null) return null;

          const tags = item.tags || {};

          const address = [

            tags["addr:housenumber"],

            tags["addr:street"],

            tags["addr:suburb"],

            tags["addr:city"],

            tags["addr:postcode"],

          ].filter(Boolean).join(", ");

          return {

            id: `${item.type}-${item.id}`,

            name: tags.name || "Hospital name unavailable",

            address: tags["addr:full"] || address || "Address unavailable",

            phone: tags["contact:phone"] || tags.phone || "",

            website: tags["contact:website"] || tags.website || "",

            lat: Number(hospitalLat),

            lon: Number(hospitalLon),

            distance: getDistance(

              lat, lon, Number(hospitalLat), Number(hospitalLon)

            ),

          };

        })

        .filter(Boolean);

      const unique = Array.from(

        new Map(results.map((h) => [h.id, h])).values()

      );

      const nearby = unique.filter((h) => h.distance <= 10);
      nearby.sort((a, b) => a.distance - b.distance);
      setHospitals(nearby);

      if (unique.length === 0) {

        setError("No mapped hospitals found within 5 km. Try another location.");

      }

    } catch (err) {

      setError(err.message || "Unable to load hospitals.");

    } finally {

      setLoading(false);

    }

  }

  // Use current GPS location

  function findByLiveLocation() {

    if (!navigator.geolocation) {

      setError("Your browser does not support location services.");

      return;

    }

    setLoading(true);

    setError("");

    navigator.geolocation.getCurrentPosition(

      (result) => {

        searchHospitals(

          result.coords.latitude,

          result.coords.longitude,

          "Current GPS location"

        );

      },

      (err) => {

        setLoading(false);

        if (err.code === 1) {

          setError("Location permission denied. Use manual search instead.");

        } else if (err.code === 3) {

          setError("Location request timed out. Please try again.");

        } else {

          setError("Unable to get your location. Try manual search.");

        }

      },

      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }

    );

  }

  // Search a manually entered place

  async function findByManualLocation(event) {

    event.preventDefault();

    const place = manualLocation.trim();

    if (!place) {

      setError("Enter a city, area, landmark or PIN code.");

      return;

    }

    setLoading(true);

    setError("");

    setHospitals([]);

    setPosition(null);

    setLocationLabel("");

    try {

      let found = null;

      for (const q of [place, `${place}, Chhattisgarh, India`]) {

        const params = new URLSearchParams({

          format: "jsonv2",

          q,

          limit: "1",

          countrycodes: "in",

        });

        const response = await fetch(

          `https://nominatim.openstreetmap.org/search?${params.toString()}`

        );

        if (!response.ok) {

          throw new Error("Location service is unavailable. Try again later.");

        }

        const locations = await response.json();

        if (locations.length > 0) {

          found = locations[0];

          break;

        }

      }

      if (!found) {

        throw new Error(

          "Location not found. Try a more specific area, city or PIN code."

        );

      }

      await searchHospitals(

        Number(found.lat),

        Number(found.lon),

        found.display_name || place

      );

    } catch (err) {

      setError(err.message || "Unable to search this location.");

      setLoading(false);

    }

  }

  return (

    <div className="app">

      <header className="header">

        <div>

          <div className="logo">🏥 Hospital Finder</div>

          <h1>Nearby Hospital Finder</h1>

          <p>Find hospitals using GPS or enter a location manually.</p>

          <form className="manual-search" onSubmit={findByManualLocation}>

            <input

              value={manualLocation}

              onChange={(e) => setManualLocation(e.target.value)}

              placeholder="Enter city, area, landmark or PIN code"

              disabled={loading}

            />

            <button type="submit" disabled={loading}>

              {loading ? "Searching..." : "Search"}

            </button>

          </form>

          {locationLabel && (

            <div className="location-label">

              Selected location: {locationLabel}

            </div>

          )}

        </div>

        <button

          className="location-button"

          onClick={findByLiveLocation}

          disabled={loading}

        >

          {loading ? "Finding Hospitals..." : "📍 Use My Current Location"}

        </button>

      </header>

      {error && <div className="error-box">⚠️ {error}</div>}

      <main className="content">

        <section className="map-section">

          <MapContainer

            center={[20.5937, 78.9629]}

            zoom={5}

            className="map"

          >

            <TileLayer

              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

            {position && <MapUpdater position={position} />}

            {position && (

              <Marker position={position}>

                <Popup>{locationLabel}</Popup>

              </Marker>

            )}

            {hospitals.map((h) => (

              <Marker key={h.id} position={[h.lat, h.lon]}>

                <Popup>

                  <strong>{h.name}</strong>

                  <br />

                  {h.distance.toFixed(2)} km away

                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </section>

        <section className="hospital-section">

          <div className="section-heading">

            <h2>Nearby Hospitals</h2>

            <span>{hospitals.length} found</span>

          </div>

          {loading && <p>Searching for hospitals. Please wait...</p>}

          {!loading && hospitals.length === 0 && (

            <div className="empty-state">

              <div className="empty-icon">🏥</div>

              <h3>No hospitals to display</h3>

              <p>Search by location or use your current GPS location.</p>

            </div>

          )}

          <div className="hospital-list">

            {hospitals.map((h) => (

              <article className="hospital-card" key={h.id}>

                <div className="hospital-icon">🏥</div>

                <div className="hospital-info">

                  <h3>{h.name}</h3>

                  <p>📍 {h.address}</p>

                  <p>📏 <strong>{h.distance.toFixed(2)} km</strong> away</p>

                  <p>

                    📞{" "}

                    {h.phone ? <a href={`tel:${h.phone}`}>{h.phone}</a> : "Phone number unavailable"}

                  </p>

                  <div className="hospital-actions">

                    <a

                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(

                        `${h.name}, ${h.lat}, ${h.lon}`

                      )}`}

                      target="_blank"

                      rel="noopener noreferrer"

                    >

                      🧭 Open in Maps

                    </a>

                    {h.website && (

                      <a

                        href={

                          /^https?:\/\//i.test(h.website)

                            ? h.website

                            : `https://${h.website}`

                        }

                        target="_blank"

                        rel="noopener noreferrer"

                      >

                        🌐 Official Website

                      </a>

                    )}

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

      <footer>

        <p>

          Hospital information comes from OpenStreetMap. Details may be

          incomplete or outdated. Verify hospital information before visiting.

        </p>

      </footer>

    </div>

  );

}

