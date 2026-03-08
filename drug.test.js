import {
  AgedDrug,
  DropoffDrug,
  FastDrug,
  ImmutableDrug,
  StandardDrug,
} from "./drug";
import drugFactory from "./drugFactory";

describe("Drug", () => {
  const updateDrug = (name, expiresIn, benefit) => {
    const drug = drugFactory(name, expiresIn, benefit);
    drug.updateState();
    return drug;
  };

  describe("standard drugs", () => {
    it("decreases the benefit and expiresIn for a normal drug", () => {
      expect(updateDrug("Doliprane", 2, 3)).toEqual(
        drugFactory("Doliprane", 1, 2),
      );
    });

    it("decreases normal drugs twice as fast after expiration", () => {
      expect(updateDrug("Doliprane", 0, 3)).toEqual(
        drugFactory("Doliprane", -1, 1),
      );
    });

    it("never lets the benefit go below zero", () => {
      expect(updateDrug("Doliprane", 2, 0)).toEqual(
        drugFactory("Doliprane", 1, 0),
      );
    });
  });

  describe("aged drugs", () => {
    it("increases Herbal Tea benefit over time", () => {
      expect(updateDrug("Herbal Tea", 2, 3)).toEqual(
        drugFactory("Herbal Tea", 1, 4),
      );
    });

    it("increases Herbal Tea benefit twice as fast after expiration", () => {
      expect(updateDrug("Herbal Tea", 0, 3)).toEqual(
        drugFactory("Herbal Tea", -1, 5),
      );
    });

    it("caps Herbal Tea benefit at 50", () => {
      expect(updateDrug("Herbal Tea", 2, 50)).toEqual(
        drugFactory("Herbal Tea", 1, 50),
      );
    });
  });

  describe("dropoff drugs", () => {
    it("increases Fervex by 2 when there are 10 days or less", () => {
      expect(updateDrug("Fervex", 10, 20)).toEqual(
        drugFactory("Fervex", 9, 22),
      );
    });

    it("increases Fervex by 3 when there are 5 days or less", () => {
      expect(updateDrug("Fervex", 5, 20)).toEqual(drugFactory("Fervex", 4, 23));
    });

    it("drops Fervex benefit to zero after expiration", () => {
      expect(updateDrug("Fervex", 0, 20)).toEqual(drugFactory("Fervex", -1, 0));
    });

    it("caps Fervex benefit at 50", () => {
      expect(updateDrug("Fervex", 5, 49)).toEqual(drugFactory("Fervex", 4, 50));
    });
  });

  describe("immutable drugs", () => {
    it("keeps Magic Pill unchanged", () => {
      expect(updateDrug("Magic Pill", 15, 40)).toEqual(
        drugFactory("Magic Pill", 15, 40),
      );
    });
  });

  describe("fast drugs", () => {
    it("decreases Dafalgan benefit twice as fast as normal drugs", () => {
      expect(updateDrug("Dafalgan", 2, 10)).toEqual(
        drugFactory("Dafalgan", 1, 8),
      );
    });

    it("decreases Dafalgan benefit four points after expiration", () => {
      expect(updateDrug("Dafalgan", 0, 10)).toEqual(
        drugFactory("Dafalgan", -1, 6),
      );
    });
  });

  describe("typed construction", () => {
    it("creates a standard subclass for standard drugs", () => {
      expect(drugFactory("Doliprane", 2, 3)).toBeInstanceOf(StandardDrug);
    });

    it("creates an aged subclass for Herbal Tea", () => {
      expect(drugFactory("Herbal Tea", 2, 3)).toBeInstanceOf(AgedDrug);
    });

    it("creates a dropoff subclass for Fervex", () => {
      expect(drugFactory("Fervex", 2, 3)).toBeInstanceOf(DropoffDrug);
    });

    it("creates an immutable subclass for Magic Pill", () => {
      expect(drugFactory("Magic Pill", 2, 3)).toBeInstanceOf(ImmutableDrug);
    });

    it("creates a fast subclass for Dafalgan", () => {
      expect(drugFactory("Dafalgan", 2, 3)).toBeInstanceOf(FastDrug);
    });

    it("builds the right subclass from the extracted factory", () => {
      expect(drugFactory("Dafalgan", 2, 3)).toBeInstanceOf(FastDrug);
    });

    it("throws for an unknown drug in the extracted factory", () => {
      expect(() => drugFactory("Unknown Drug", 2, 3)).toThrow(
        'Unknown drug: "Unknown Drug"',
      );
    });
  });
});
