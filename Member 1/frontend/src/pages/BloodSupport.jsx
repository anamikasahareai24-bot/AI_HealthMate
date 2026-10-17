import React, { useMemo, useState } from "react";
import {
  Droplets,
  HeartPulse,
  Search,
  MapPin,
  Phone,
  Clock3,
  ShieldCheck,
  AlertTriangle,
  Navigation,
  ExternalLink,
} from "lucide-react";

import { getCurrentCoordinates, getNearbyCarePlaces } from "../services/liveLocations.js";
import "./BloodSupport.css";

const ERaktKoshStockUrl = "https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/stockAvailability.cnt";

function BloodSupport() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [search, setSearch] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const filteredBanks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bloodBanks.filter((bank) =>
      `${bank.name} ${bank.location} ${bank.type}`.toLowerCase().includes(query)
    );
  }, [bloodBanks, search]);

  const loadNearbyBanks = async () => {
    setLoading(true);
    setLocationStatus("Getting your location and loading fresh nearby listings…");
    try {
      const coordinates = await getCurrentCoordinates();
      const results = await getNearbyCarePlaces({ ...coordinates, bloodBanksOnly: true });
      setBloodBanks(results);
      setLocationStatus(
        results.length
          ? `Loaded ${results.length} mapped blood-centre listings. Confirm the centre is active and check current stock on eRaktKosh.`
          : "No mapped blood centres were found within 10 km. Check live availability on eRaktKosh."
      );
    } catch (error) {
      setBloodBanks([]);
      setLocationStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openMaps = (bank) => {
    const query = `${bank.latitude},${bank.longitude}`;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openLiveStock = () => {
    window.open(ERaktKoshStockUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="blood-page">
      <section className="blood-header">
        <div>
          <div className="blood-eyebrow">
            <Droplets size={14} />
            BLOOD SUPPORT
          </div>
          <h1>Find Blood. <span>Save Lives.</span></h1>
          <p>Find nearby blood-centre map listings and check current blood stock on the Government of India eRaktKosh portal.</p>
        </div>
        <div className="blood-header-icon"><Droplets size={38} /></div>
      </section>

      <section className="blood-emergency">
        <div className="blood-emergency-icon"><AlertTriangle size={22} /></div>
        <div className="blood-emergency-text">
          <strong>Need blood urgently?</strong>
          <span>Check current blood-group availability with eRaktKosh. Stock can change; confirm with the blood centre.</span>
        </div>
        <a className="live-blood-stock-button" href={ERaktKoshStockUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          Check Live Stock
        </a>
      </section>

      <section className="blood-search-card">
        <div className="blood-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search live blood-centre listings..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="blood-group-label">Choose a blood group for the eRaktKosh stock search</div>
        <div className="blood-groups">
          {bloodGroups.map((group) => (
            <button
              type="button"
              key={group}
              className={bloodGroup === group ? "blood-group active" : "blood-group"}
              aria-pressed={bloodGroup === group}
              onClick={() => setBloodGroup((current) => current === group ? "" : group)}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="blood-live-actions">
          <button type="button" className="location-button" onClick={loadNearbyBanks} disabled={loading}>
            <MapPin size={17} />
            {loading ? "Finding nearby centres…" : "Use My Location"}
          </button>
          <button type="button" className="blood-stock-link" onClick={openLiveStock}>
            <ExternalLink size={15} />
            {bloodGroup ? `Open eRaktKosh · select ${bloodGroup}` : "Open eRaktKosh live stock"}
          </button>
        </div>
      </section>

      {locationStatus && <div className="blood-live-status" role="status">{locationStatus} {bloodBanks.length > 0 && "Source: OpenStreetMap live query."}</div>}

      <section className="blood-stats">
        <div className="blood-stat">
          <div><MapPin size={20} /></div>
          <section><strong>{locationStatus ? bloodBanks.length : "—"}</strong><span>Nearby map listings</span></section>
        </div>
        <div className="blood-stat">
          <div><Droplets size={20} /></div>
          <section><strong>{bloodGroup || "—"}</strong><span>Selected blood group</span></section>
        </div>
        <div className="blood-stat">
          <div><HeartPulse size={20} /></div>
          <section><strong>eRaktKosh</strong><span>Official stock source</span></section>
        </div>
        <div className="blood-stat">
          <div><ShieldCheck size={20} /></div>
          <section><strong>Live query</strong><span>Nearby map source</span></section>
        </div>
      </section>

      <section className="donor-section">
        <div className="donor-heading">
          <div>
            <span>NEARBY BLOOD CENTRES</span>
            <h2>Blood-centre map listings</h2>
          </div>
          <p>{locationStatus ? `${filteredBanks.length} listings found` : "Search your location to see results"}</p>
        </div>

        {filteredBanks.length === 0 ? (
          <div className="no-donors">
            <Droplets size={34} />
            <h3>{bloodBanks.length ? "No matching blood centres" : "No live listings loaded yet"}</h3>
            <p>{bloodBanks.length ? "Try another search." : "Use My Location to load fresh nearby map listings. No sample donors or locations are shown."}</p>
            <a href={ERaktKoshStockUrl} target="_blank" rel="noreferrer" className="blood-stock-link">
              <ExternalLink size={15} /> Check live stock on eRaktKosh
            </a>
          </div>
        ) : (
          <div className="donor-grid">
            {filteredBanks.map((bank) => (
              <article className="donor-card" key={bank.id}>
                <div className="donor-top">
                  <div className="donor-avatar"><Droplets size={22} /></div>
                  <div className="donor-blood">BLOOD CENTRE</div>
                </div>

                <h3>{bank.name}</h3>
                <div className="verified-donor"><MapPin size={12} /> Map listing · stock not verified</div>

                <div className="donor-info">
                  <div><MapPin size={14} /><span>{bank.location}</span></div>
                  <div><Navigation size={14} /><span>{bank.distance}</span></div>
                  <div><Clock3 size={14} /><span>{bank.open}</span></div>
                </div>

                <div className="availability unavailable"><span />Check live stock with eRaktKosh</div>

                <div className="donor-actions">
                  {bank.phone ? (
                    <a href={`tel:${bank.phone}`} className="contact-donor"><Phone size={14} />Call centre</a>
                  ) : (
                    <button className="contact-donor" type="button" onClick={openLiveStock}><ExternalLink size={14} />eRaktKosh</button>
                  )}
                  <button className="donor-map" type="button" onClick={() => openMaps(bank)} aria-label={`Open map for ${bank.name}`}>
                    <Navigation size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="blood-info">
        <div className="blood-info-icon"><ShieldCheck size={24} /></div>
        <div>
          <h3>Use current availability information</h3>
          <p>Nearby map listings do not confirm blood stock or donor availability. eRaktKosh provides current blood availability from registered centres; call the centre to confirm before travelling.</p>
        </div>
      </section>
    </div>
  );
}

export default BloodSupport;
