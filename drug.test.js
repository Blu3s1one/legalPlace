import { Drug } from "./drug";
import expectedOutput from "./output.json";

describe("Drug", () => {
  const updateDrug = (name, expiresIn, benefit) => {
    const drug = new Drug(name, expiresIn, benefit);
    drug.updateState();
    return drug;
  };

  describe("standard drugs", () => {
    it("decreases the benefit and expiresIn for a normal drug", () => {
      expect(updateDrug("Doliprane", 2, 3)).toEqual(
        new Drug("Doliprane", 1, 2),
      );
    });

    it("decreases normal drugs twice as fast after expiration", () => {
      expect(updateDrug("Doliprane", 0, 3)).toEqual(
        new Drug("Doliprane", -1, 1),
      );
    });

    it("never lets the benefit go below zero", () => {
      expect(updateDrug("Doliprane", 2, 0)).toEqual(
        new Drug("Doliprane", 1, 0),
      );
    });
  });

  describe("aged drugs", () => {
    it("increases Herbal Tea benefit over time", () => {
      expect(updateDrug("Herbal Tea", 2, 3)).toEqual(
        new Drug("Herbal Tea", 1, 4),
      );
    });

    it("increases Herbal Tea benefit twice as fast after expiration", () => {
      expect(updateDrug("Herbal Tea", 0, 3)).toEqual(
        new Drug("Herbal Tea", -1, 5),
      );
    });

    it("caps Herbal Tea benefit at 50", () => {
      expect(updateDrug("Herbal Tea", 2, 50)).toEqual(
        new Drug("Herbal Tea", 1, 50),
      );
    });
  });

  describe("dropoff drugs", () => {
    it("increases Fervex by 2 when there are 10 days or less", () => {
      expect(updateDrug("Fervex", 10, 20)).toEqual(new Drug("Fervex", 9, 22));
    });

    it("increases Fervex by 3 when there are 5 days or less", () => {
      expect(updateDrug("Fervex", 5, 20)).toEqual(new Drug("Fervex", 4, 23));
    });

    it("drops Fervex benefit to zero after expiration", () => {
      expect(updateDrug("Fervex", 0, 20)).toEqual(new Drug("Fervex", -1, 0));
    });

    it("caps Fervex benefit at 50", () => {
      expect(updateDrug("Fervex", 5, 49)).toEqual(new Drug("Fervex", 4, 50));
    });
  });

  describe("immutable drugs", () => {
    it("keeps Magic Pill unchanged", () => {
      expect(updateDrug("Magic Pill", 15, 40)).toEqual(
        new Drug("Magic Pill", 15, 40),
      );
    });
  });

});
