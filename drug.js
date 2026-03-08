import {
  AGED_CONFIG,
  DROPOFF_CONFIG,
  FAST_CONFIG,
  DRUG_TYPES,
  STANDARD_CONFIG,
  getFastFactor,
  getDrugType,
} from "./drugsConfig";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateState() {
    if (this.#type === DRUG_TYPES.IMMUTABLE) {
      return;
    }

    this.#decreaseExpiration();
    this.#updateBenefit();
  }

  #increaseBenefit(amount) {
    this.benefit = Math.min(50, this.benefit + amount);
  }

  #decreaseBenefit(amount) {
    this.benefit = Math.max(0, this.benefit - amount);
  }

  get #type() {
    return getDrugType(this.name);
  }

  #updateBenefit() {
    if (this.#type === DRUG_TYPES.AGED) {
      this.#updateAgedBenefit();
      return;
    }

    if (this.#type === DRUG_TYPES.DROPOFF) {
      this.#updateDropoffBenefit();
      return;
    }

    if (this.#type === DRUG_TYPES.FAST) {
      this.#updateFastBenefit();
      return;
    }

    this.#updateStandardBenefit();
  }

  #updateAgedBenefit() {
    if (this.expiresIn < 0) {
      this.#increaseBenefit(
        AGED_CONFIG.benefitIncrease * AGED_CONFIG.expirationMultiplier,
      );
      return;
    }

    this.#increaseBenefit(AGED_CONFIG.benefitIncrease);
  }

  #updateDropoffBenefit() {
    if (this.expiresIn < 0) {
      this.benefit = DROPOFF_CONFIG.expiredBenefit;
      return;
    }

    this.#increaseBenefit(DROPOFF_CONFIG.benefitIncrease);

    if (this.expiresIn < DROPOFF_CONFIG.firstThreshold) {
      this.#increaseBenefit(DROPOFF_CONFIG.firstBonus);
    }

    if (this.expiresIn < DROPOFF_CONFIG.secondThreshold) {
      this.#increaseBenefit(DROPOFF_CONFIG.secondBonus);
    }
  }

  #updateStandardBenefit() {
    if (this.expiresIn < 0) {
      this.#decreaseBenefit(
        STANDARD_CONFIG.benefitDecrease *
          STANDARD_CONFIG.expirationMultiplier,
      );
      return;
    }

    this.#decreaseBenefit(STANDARD_CONFIG.benefitDecrease);
  }

  #updateFastBenefit() {
    const factor = getFastFactor(this.name);

    if (this.expiresIn < 0) {
      this.#decreaseBenefit(
        FAST_CONFIG.benefitDecrease *
          FAST_CONFIG.expirationMultiplier *
          factor,
      );
      return;
    }

    this.#decreaseBenefit(FAST_CONFIG.benefitDecrease * factor);
  }

  #decreaseExpiration() {
    this.expiresIn -= 1;
  }
}
