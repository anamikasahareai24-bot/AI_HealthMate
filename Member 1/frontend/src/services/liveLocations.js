const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

export function getCurrentCoordinates() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Your browser does not support location access."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? "Location permission was denied. Allow location access and try again."
          : error.code === error.TIMEOUT
            ? "Location request timed out. Please try again."
            : "Could not get your location. Please try again.";
        reject(new Error(message));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

function distanceInKm(lat1, lon1, lat2, lon2) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const deltaLat = radians(lat2 - lat1);
  const deltaLon = radians(lon2 - lon1);
  const value =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(radians(lat1)) * Math.cos(radians(lat2)) *
    Math.sin(deltaLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function facilityType(tags = {}) {
  const kind = tags.healthcare || tags.amenity || "healthcare";
  if (/blood_bank|blood_centre|blood_donation/i.test(kind) || tags.amenity === "blood_donation") return "Blood Bank";
  if (/hospital/i.test(kind)) return "Hospital";
  if (/clinic/i.test(kind)) return "Clinic";
  if (/pharmacy/i.test(kind)) return "Pharmacy";
  if (/laboratory/i.test(kind)) return "Diagnostic Lab";
  if (/doctor|doctors/i.test(kind)) return "Doctor";
  return "Healthcare";
}

function toFacility(element, origin) {
  const tags = element.tags || {};
  const point = element.type === "node" ? element : element.center;
  const name = tags.name || tags["name:en"] || tags.brand || tags.operator;
  if (!point?.lat || !point?.lon || !name) return null;

  const distance = distanceInKm(origin.latitude, origin.longitude, point.lat, point.lon);
  const location = [tags["addr:suburb"], tags["addr:city"], tags["addr:street"]]
    .filter(Boolean)
    .filter((part, index, items) => items.indexOf(part) === index)
    .join(", ") || "Address not listed";

  return {
    id: `${element.type}-${element.id}`,
    name,
    type: facilityType(tags),
    location,
    distanceKm: distance,
    distance: `${distance < 10 ? distance.toFixed(1) : Math.round(distance)} km`,
    latitude: point.lat,
    longitude: point.lon,
    phone: tags.phone || tags["contact:phone"] || tags["contact:mobile"] || "",
    open: tags.opening_hours || "Hours not listed",
    description: tags.description || "OpenStreetMap listing. Contact the facility to confirm current services.",
    source: "OpenStreetMap",
  };
}

export async function getNearbyCarePlaces({ latitude, longitude, bloodBanksOnly = false, radius = 10000 }) {
  const medicalQuery = `
    nwr["amenity"~"^(hospital|clinic|doctors|pharmacy|laboratory)$"](around:${radius},${latitude},${longitude});
    nwr["healthcare"~"^(hospital|clinic|doctor|pharmacy|laboratory)$"](around:${radius},${latitude},${longitude});
  `;
  const bloodQuery = `
    nwr["amenity"="blood_donation"](around:${radius},${latitude},${longitude});
    nwr["healthcare"~"^(blood_bank|blood_centre)$"](around:${radius},${latitude},${longitude});
    nwr["blood_bank"="yes"](around:${radius},${latitude},${longitude});
  `;
  const query = `[out:json][timeout:25];(${bloodBanksOnly ? bloodQuery : medicalQuery});out center tags;`;
  let lastError;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams({ data: query }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Nearby services could not be loaded right now.");
      const payload = await response.json();
      const unique = new Map();
      (payload.elements || []).forEach((element) => {
        const facility = toFacility(element, { latitude, longitude });
        if (!facility) return;
        const key = `${facility.name.toLowerCase()}-${facility.latitude.toFixed(4)}-${facility.longitude.toFixed(4)}`;
        if (!unique.has(key)) unique.set(key, facility);
      });
      return [...unique.values()].sort((a, b) => a.distanceKm - b.distanceKm);
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(lastError?.name === "AbortError"
    ? "Nearby search timed out. Please try again."
    : lastError?.message || "Nearby services could not be loaded right now.");
}
