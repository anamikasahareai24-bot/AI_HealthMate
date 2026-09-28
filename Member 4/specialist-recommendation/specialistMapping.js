const specialistMapping = {
  migraine: {
    specialist: "Neurologist",
    department: "Neurology",
    reason:
      "Neurologists evaluate and treat conditions involving the brain, nerves, and nervous system."
  },

  headache: {
    specialist: "Neurologist",
    department: "Neurology",
    reason:
      "Persistent or recurrent headaches may require evaluation by a neurologist."
  },

  epilepsy: {
    specialist: "Neurologist",
    department: "Neurology",
    reason:
      "Epilepsy involves recurrent seizures and is generally evaluated by a neurologist."
  },

  acne: {
    specialist: "Dermatologist",
    department: "Dermatology",
    reason:
      "Dermatologists diagnose and treat conditions affecting the skin."
  },

  eczema: {
    specialist: "Dermatologist",
    department: "Dermatology",
    reason:
      "Eczema is a skin condition commonly managed by a dermatologist."
  },

  psoriasis: {
    specialist: "Dermatologist",
    department: "Dermatology",
    reason:
      "Psoriasis is a chronic skin condition commonly treated by a dermatologist."
  },

  diabetes: {
    specialist: "Endocrinologist",
    department: "Endocrinology",
    reason:
      "Endocrinologists specialize in hormonal and metabolic conditions such as diabetes."
  },

  asthma: {
    specialist: "Pulmonologist",
    department: "Pulmonology",
    reason:
      "Pulmonologists specialize in diseases affecting the lungs and respiratory system."
  },

  pneumonia: {
    specialist: "Pulmonologist",
    department: "Pulmonology",
    reason:
      "Pneumonia affects the lungs and may require evaluation by a respiratory specialist."
  },

  hypertension: {
    specialist: "Cardiologist",
    department: "Cardiology",
    reason:
      "High blood pressure can require cardiovascular evaluation, especially when persistent or complicated."
  },

  "heart disease": {
    specialist: "Cardiologist",
    department: "Cardiology",
    reason:
      "Cardiologists diagnose and manage diseases involving the heart and cardiovascular system."
  },

  "kidney disease": {
    specialist: "Nephrologist",
    department: "Nephrology",
    reason:
      "Nephrologists specialize in kidney diseases and kidney function."
  },

  arthritis: {
    specialist: "Rheumatologist",
    department: "Rheumatology",
    reason:
      "Rheumatologists manage many inflammatory and autoimmune conditions affecting joints and connective tissues."
  },

  glaucoma: {
    specialist: "Ophthalmologist",
    department: "Ophthalmology",
    reason:
      "Ophthalmologists diagnose and treat diseases affecting the eyes."
  },

  depression: {
    specialist: "Psychiatrist",
    department: "Psychiatry",
    reason:
      "Psychiatrists evaluate and treat mental health conditions."
  },

  anxiety: {
    specialist: "Psychiatrist",
    department: "Psychiatry",
    reason:
      "Persistent or severe anxiety may require assessment by a mental health professional."
  },

  gastritis: {
    specialist: "Gastroenterologist",
    department: "Gastroenterology",
    reason:
      "Gastroenterologists specialize in conditions affecting the digestive system."
  }
};

function getRecommendedSpecialist(disease) {
  if (!disease) {
    return null;
  }

  const normalizedDisease = disease.trim().toLowerCase();

  return specialistMapping[normalizedDisease] || null;
}

export { specialistMapping, getRecommendedSpecialist };