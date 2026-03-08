export const DRUG_TYPES = {
  STANDARD: "standard",
  AGED: "aged",
  DROPOFF: "dropoff",
  IMMUTABLE: "immutable",
};

export const STANDARD_CONFIG = {
  benefitDecrease: 1,
  expirationMultiplier: 2,
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
  "Herbal Tea": DRUG_TYPES.AGED,
  Fervex: DRUG_TYPES.DROPOFF,
  "Magic Pill": DRUG_TYPES.IMMUTABLE,
};

export function getDrugType(name) {
  return DRUG_NAME_TO_TYPE[name] ?? DRUG_TYPES.STANDARD;
}

export function getDrugNamesByType(type) {
  return Object.keys(DRUG_NAME_TO_TYPE).filter(
    (name) => DRUG_NAME_TO_TYPE[name] === type,
  );
}
