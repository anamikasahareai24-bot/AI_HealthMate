import { useState } from "react";
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

// Fix Leaflet marker icons in Vite
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

  if (position) {
    map.setView(position, 14);
  }

  return null;
}

function getDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

function HospitalFinder() {
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findHospitals = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        setPosition([latitude, longitude]);

        try {
          const query = `
            [out:json][timeout:25];
            (
              node["amenity"="hospital"](around:5000,${latitude},${longitude});
              way["amenity"="hospital"](around:5000,${latitude},${longitude});
              relation["amenity"="hospital"](around:5000,${latitude},${longitude});
              node["healthcare"="hospital"](around:5000,${latitude},${longitude});
              way["healthcare"="hospital"](around:5000,${latitude},${longitude});
              relation["healthcare"="hospital"](around:5000,${latitude},${longitude});
            );
            out center tags;
          `;

          const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
              method: "POST",
              body: query,
            }
          );

          if (!response.ok) {
            throw new Error("Hospital search service is unavailable.");
          }

          const data = await response.json();

          const results = data.elements
            .map((item) => {
              const lat = item.lat ?? item.center?.lat;
              const lon = item.lon ?? item.center?.lon;

              if (!lat || !lon) return null;

              const tags = item.tags || {};

              const addressParts = [
                tags["addr:housenumber"],
                tags["addr:street"],
                tags["addr:city"],
                tags["addr:postcode"],
              ].filter(Boolean);

              return {
                id: `${item.type}-${item.id}`,
                name: tags.name || "Hospital name unavailable",
                address:
                  tags["addr:full"] ||
                  addressParts.join(", ") ||
                  "Address unavailable",
                phone:
                  tags["contact:phone"] ||
                  tags.phone ||
                  "Phone number unavailable",
                website:
                  tags["contact:website"] ||
                  tags.website ||
                  "",
                lat,
                lon,
                distance: getDistance(
                  latitude,
                  longitude,
                  lat,
                  lon
                ),
              };
            })
            .filter(Boolean)
            .filter(
               (hospital) =>
                  hospital.name !== "Hospital name unavailable"
            );

            const uniqueHospitals = Array.from(
            new Map(results.map((hospital) => [hospital.id, hospital])).values()
          );

          uniqueHospitals.sort((a, b) => a.distance - b.distance);

          setHospitals(uniqueHospitals);
        } catch (searchError) {
          setError(
            searchError.message ||
              "Unable to find nearby hospitals. Please try again."
          );
        } finally {
          setLoading(false);
        }
      },
      (locationError) => {
        setLoading(false);

        if (locationError.code === 1) {
          setError(
            "Location permission was denied. Please allow location access and try again."
          );
        } else if (locationError.code === 2) {
          setError("Your location could not be determined.");
        } else if (locationError.code === 3) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Unable to access your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="logo">🏥 AI HealthMate</div>
          <h1>Nearby Hospital Finder</h1>
          <p>
            Find real hospitals near your current location.
          </p>
        </div>

        <button
          className="location-button"
          onClick={findHospitals}
          disabled={loading}
        >
          {loading ? "Finding Hospitals..." : "📍 Find Nearby Hospitals"}
        </button>
      </header>

      {error && (
        <div className="error-box">
          ⚠️ {error}
        </div>
      )}

      <main className="content">
        <section className="map-section">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="map"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {position && <MapUpdater position={position} />}

            {position && (
              <Marker position={position}>
                <Popup>
                  <strong>Your Location</strong>
                  <br />
                  This is your current location.
                </Popup>
              </Marker>
            )}

            {hospitals.map((hospital) => (
              <Marker
                key={hospital.id}
                position={[hospital.lat, hospital.lon]}
              >
                <Popup>
                  <strong>{hospital.name}</strong>
                  <br />
                  {hospital.distance.toFixed(2)} km away
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

          {hospitals.length === 0 && !loading && (
            <div className="empty-state">
              <div className="empty-icon">🏥</div>
              <h3>No hospitals loaded yet</h3>
              <p>
                Click <strong>Find Nearby Hospitals</strong> to search
                for hospitals around your location.
              </p>
            </div>
          )}

          <div className="hospital-list">
            {hospitals.map((hospital) => (
              <article className="hospital-card" key={hospital.id}>
                <div className="hospital-icon">🏥</div>

                <div className="hospital-info">
                  <h3>{hospital.name}</h3>

                  <p>📍 {hospital.address}</p>

                  <p>
                    📏{" "}
                    <strong>
                      {hospital.distance.toFixed(2)} km
                    </strong>{" "}
                    away
                  </p>

                  <p>
                  📞{" "}
                  {hospital.phone === "Phone number unavailable"
                     ? "Phone: Not available in hospital database"
                     : hospital.phone}
                  </p>

                  <div className="hospital-actions">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${hospital.name}, ${hospital.lat}, ${hospital.lon}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🧭 Open in Maps
                    </a>

                    {hospital.website && (
                      <a
                        href={hospital.website}
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
          Hospital information is retrieved from OpenStreetMap data.
          Always verify hospital details directly before visiting.
        </p>
      </footer>
    </div>
  );
}

export default HospitalFinder;