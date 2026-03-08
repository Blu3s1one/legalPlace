import {
  AGED_CONFIG,
  DROPOFF_CONFIG,
  FAST_CONFIG,
  STANDARD_CONFIG,
  getFastFactor,
} from "./drugsConfig";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  increaseBenefit(amount) {
    this.benefit = Math.min(50, this.benefit + amount);
  }

  decreaseBenefit(amount) {
    this.benefit = Math.max(0, this.benefit - amount);
  }

  decreaseExpiration() {
    this.expiresIn -= 1;
  }

  isExpired() {
    return this.expiresIn < 0;
  }
}

export class StandardDrug extends Drug {
  updateState() {
    super.decreaseExpiration();

    if (this.isExpired()) {
      this.decreaseBenefit(
        STANDARD_CONFIG.benefitDecrease * STANDARD_CONFIG.expirationMultiplier,
      );
      return;
    }

    this.decreaseBenefit(STANDARD_CONFIG.benefitDecrease);
  }
}

export class AgedDrug extends Drug {
  updateState() {
    super.decreaseExpiration();

    if (this.isExpired()) {
      this.increaseBenefit(
        AGED_CONFIG.benefitIncrease * AGED_CONFIG.expirationMultiplier,
      );
      return;
    }

    this.increaseBenefit(AGED_CONFIG.benefitIncrease);
  }
}

export class DropoffDrug extends Drug {
  updateState() {
    super.decreaseExpiration();

    if (this.isExpired()) {
      this.benefit = DROPOFF_CONFIG.expiredBenefit;
      return;
    }

    this.increaseBenefit(DROPOFF_CONFIG.benefitIncrease);

    if (this.expiresIn < DROPOFF_CONFIG.firstThreshold) {
      this.increaseBenefit(DROPOFF_CONFIG.firstBonus);
    }

    if (this.expiresIn < DROPOFF_CONFIG.secondThreshold) {
      this.increaseBenefit(DROPOFF_CONFIG.secondBonus);
    }
  }
}

export class ImmutableDrug extends Drug {
  updateState() {}
}

export class FastDrug extends Drug {
  updateState() {
    super.decreaseExpiration();

    const factor = getFastFactor(this.name);

    if (this.isExpired()) {
      this.decreaseBenefit(
        FAST_CONFIG.benefitDecrease * FAST_CONFIG.expirationMultiplier * factor,
      );
      return;
    }

    this.decreaseBenefit(FAST_CONFIG.benefitDecrease * factor);
  }
}
