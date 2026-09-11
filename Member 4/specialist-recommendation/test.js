import { getRecommendedSpecialist } from "./specialistMapping.js";

console.log("Migraine →", getRecommendedSpecialist("Migraine"));
console.log("Acne →", getRecommendedSpecialist("Acne"));
console.log("Diabetes →", getRecommendedSpecialist("Diabetes"));
console.log("Asthma →", getRecommendedSpecialist("Asthma"));
console.log("Unknown →", getRecommendedSpecialist("Something"));