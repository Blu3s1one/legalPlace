export const DRUG_TYPES = {
  STANDARD: "standard",
  FAST: "fast",
  AGED: "aged",
  DROPOFF: "dropoff",
  IMMUTABLE: "immutable",
};

export const STANDARD_CONFIG = {
  benefitDecrease: 1,
  expirationMultiplier: 2,
};

export const FAST_CONFIG = {
  benefitDecrease: STANDARD_CONFIG.benefitDecrease,
  expirationMultiplier: STANDARD_CONFIG.expirationMultiplier,
  factorByName: {
    Dafalgan: 2,
  },
};

export const AGED_CONFIG = {
  benefitIncrease: 1,
  expirationMultiplier: 2,
};

export const DROPOFF_CONFIG = {
  benefitIncrease: 1,
  firstThreshold: 10,
  secondThreshold: 5,
  firstBonus: 1,
  secondBonus: 1,
  expiredBenefit: 0,
};

export const IMMUTABLE_CONFIG = {
  benefitChange: 0,
  expirationMultiplier: 0,
};

const DRUG_NAME_TO_TYPE = {
  Dafalgan: DRUG_TYPES.FAST,
  "Herbal Tea": DRUG_TYPES.AGED,
  Fervex: DRUG_TYPES.DROPOFF,
  "Magic Pill": DRUG_TYPES.IMMUTABLE,
  Doliprane: DRUG_TYPES.STANDARD,
};

export function getDrugType(name) {
  const drugType = DRUG_NAME_TO_TYPE[name];

  if (drugType) {
    return drugType;
  }

  throw new Error("Unknown drug");
}

export function getDrugNamesByType(type) {
  return Object.keys(DRUG_NAME_TO_TYPE).filter(
    (name) => DRUG_NAME_TO_TYPE[name] === type,
  );
}

export function getFastFactor(name) {
  return FAST_CONFIG.factorByName[name];
}
