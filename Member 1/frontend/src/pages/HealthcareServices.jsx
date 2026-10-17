import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Hospital,
  Pill,
  FlaskConical,
  Ambulance,
  Stethoscope,
  Clock3,
  Phone,
  Navigation,
  HeartPulse,
  X,
} from "lucide-react";

import { getCurrentCoordinates, getNearbyCarePlaces } from "../services/liveLocations.js";
import "./HealthcareServices.css";

function HealthcareServices() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");

  const filters = [
    "All",
    "Hospital",
    "Clinic",
    "Pharmacy",
    "Diagnostic Lab",
  ];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesFilter = activeFilter === "All" || service.type === activeFilter;
      const searchText = search.toLowerCase();
      const matchesSearch =
        service.name.toLowerCase().includes(searchText) ||
        service.type.toLowerCase().includes(searchText) ||
        service.location.toLowerCase().includes(searchText);
      return matchesFilter && matchesSearch;
    });
  }, [services, search, activeFilter]);

  const loadNearbyServices = async () => {
    setLoading(true);
    setLocationStatus("Getting your location and loading fresh nearby listings…");
    try {
      const coordinates = await getCurrentCoordinates();
      const results = await getNearbyCarePlaces(coordinates);
      setServices(results);
      setLocationStatus(
        results.length
          ? `Loaded ${results.length} nearby listings from OpenStreetMap. Confirm hours and services directly with the provider.`
          : "No mapped healthcare services were found within 10 km of your location. Try again later or widen your search area."
      );
    } catch (error) {
      setServices([]);
      setLocationStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDirections = (service) => {
    const query = `${service.latitude},${service.longitude}`;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const iconForService = (type) => ({
    Hospital,
    Clinic: Stethoscope,
    Pharmacy: Pill,
    "Diagnostic Lab": FlaskConical,
    Doctor: Stethoscope,
    Healthcare: HeartPulse,
  }[type] || HeartPulse);

  return (
    <div className="healthcare-page">

      {/* HEADER */}

      <section className="healthcare-header">

        <div>

          <div className="healthcare-eyebrow">
            <MapPin size={14} />
            HEALTHCARE SERVICES
          </div>

          <h1>
            Find Healthcare <span>Near You</span>
          </h1>

          <p>
            Find nearby hospitals, clinics, pharmacies and diagnostic labs using your current location.
          </p>

        </div>

        <div className="healthcare-header-icon">
          <HeartPulse size={35} />
        </div>

      </section>


      {/* SEARCH */}

      <section className="search-card">

        <div className="search-box">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search hospital, clinic, pharmacy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="clear-search"
            >
              <X size={16} />
            </button>
          )}

        </div>

        <button
          className="location-button"
          type="button"
          onClick={loadNearbyServices}
          disabled={loading}
        >
          <MapPin size={17} />
          {loading ? "Finding nearby services…" : "Use My Location"}
        </button>

      </section>

      {locationStatus && (
        <div className="live-location-status" role="status">
          {locationStatus}
          {services.length > 0 && <span> Source: OpenStreetMap live query.</span>}
        </div>
      )}


      {/* FILTERS */}

      <section className="healthcare-filters">

        {filters.map((filter) => (

          <button
            key={filter}
            className={
              activeFilter === filter
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>

        ))}

      </section>


      {/* QUICK SERVICES */}

      <section className="quick-services">

        <div className="quick-service emergency-quick">
          <div>
            <Ambulance size={22} />
          </div>

          <section>
            <span>EMERGENCY</span>
            <strong>Call 112</strong>
          </section>

          <a href="tel:112" aria-label="Call emergency services">
            <Phone size={17} />
          </a>
        </div>


        <div className="quick-service">
          <div>
            <Hospital size={22} />
          </div>

          <section>
            <span>HOSPITALS</span>
            <strong>{locationStatus ? services.filter((service) => service.type === "Hospital").length : "Search nearby"}</strong>
          </section>
        </div>


        <div className="quick-service">
          <div>
            <Pill size={22} />
          </div>

          <section>
            <span>MEDICINES</span>
            <strong>{locationStatus ? services.filter((service) => service.type === "Pharmacy").length : "Search nearby"}</strong>
          </section>
        </div>


        <div className="quick-service">
          <div>
            <FlaskConical size={22} />
          </div>

          <section>
            <span>TESTS</span>
            <strong>{locationStatus ? services.filter((service) => service.type === "Diagnostic Lab").length : "Search nearby"}</strong>
          </section>
        </div>

      </section>


      {/* RESULTS */}

      <section className="services-section">

        <div className="services-title">

          <div>
            <span>NEARBY SERVICES</span>

            <h2>
              Healthcare Providers
            </h2>
          </div>

          <p>
            {locationStatus ? `${filteredServices.length} services found` : "Search your location to see results"}
          </p>

        </div>


        {filteredServices.length === 0 ? (

          <div className="empty-services">

            <Search size={32} />

            <h3>
              {services.length === 0 ? "No live listings loaded yet" : "No matching healthcare service found"}
            </h3>

            <p>
              {services.length === 0
                ? "Use My Location to search current nearby healthcare listings. No sample locations are shown."
                : "Try a different search or category."}
            </p>

          </div>

        ) : (

          <div className="services-grid">

            {filteredServices.map((service) => {

              const Icon = iconForService(service.type);

              return (
                <article
                  className="service-card"
                  key={service.id}
                >

                  <div className="service-card-top">

                    <div className="service-icon">
                      <Icon size={23} />
                    </div>

                    <span className="live-source-badge">MAP LISTING</span>

                  </div>


                  <div className="service-type">
                    {service.type}
                  </div>

                  <h3>
                    {service.name}
                  </h3>

                  <p className="service-description">
                    {service.description}
                  </p>


                  <div className="service-details">

                    <div>
                      <MapPin size={14} />
                      <span>
                        {service.location}
                      </span>
                    </div>

                    <div>
                      <Navigation size={14} />
                      <span>
                        {service.distance}
                      </span>
                    </div>

                    <div>
                      <Clock3 size={14} />
                      <span>
                        {service.open}
                      </span>
                    </div>

                  </div>


                  <div className="service-actions">

                    <button
                      className="details-button"
                      onClick={() =>
                        setSelectedService(service)
                      }
                    >
                      View Details
                    </button>

                    <button
                      className="direction-button"
                      onClick={() =>
                        handleDirections(service)
                      }
                    >
                      <Navigation size={15} />
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        )}

      </section>


      {/* MODAL */}

      {selectedService && (

        <div
          className="service-modal-overlay"
          onClick={() => setSelectedService(null)}
        >

          <div
            className="service-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedService(null)}
            >
              <X size={18} />
            </button>

            <div className="modal-icon">
              {React.createElement(
                iconForService(selectedService.type),
                { size: 28 }
              )}
            </div>

            <span className="modal-type">
              {selectedService.type}
            </span>

            <h2>
              {selectedService.name}
            </h2>

            <p>
              {selectedService.description}
            </p>

            <div className="modal-details">

              <div>
                <MapPin size={17} />
                {selectedService.location}
              </div>

              <div>
                <Navigation size={17} />
                {selectedService.distance}
              </div>

              <div>
                <Clock3 size={17} />
                {selectedService.open}
              </div>

              {selectedService.phone && (
                <div>
                  <Phone size={17} />
                  {selectedService.phone}
                </div>
              )}

            </div>

            <div className="modal-actions">

              <button
                onClick={() =>
                  handleDirections(selectedService)
                }
              >
                <Navigation size={16} />
                Get Directions
              </button>

              {selectedService.phone && (
                <a href={`tel:${selectedService.phone}`}>
                  <Phone size={16} />
                  Call
                </a>
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default HealthcareServices;
