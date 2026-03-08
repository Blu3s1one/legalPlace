import { Drug, Pharmacy } from "./pharmacy";
import expectedOutput from "./output.json";
import expectedOutputWithDafalgan from "./outputWithDafalgan.json";

describe("Pharmacy", () => {
  it("stores the provided drugs", () => {
    const drugs = [new Drug("Doliprane", 2, 3)];
    const pharmacy = new Pharmacy(drugs);

    expect(pharmacy.drugs).toBe(drugs);
  });

  it("updates every drug in the collection", () => {
    const drugs = [new Drug("Doliprane", 2, 3), new Drug("Herbal Tea", 2, 3)];
    const pharmacy = new Pharmacy(drugs);

    pharmacy.updateBenefitValue();

    expect(drugs).toEqual([
      new Drug("Doliprane", 1, 2),
      new Drug("Herbal Tea", 1, 4),
    ]);
  });

  it("returns the mutated drugs collection", () => {
    const drugs = [new Drug("Doliprane", 2, 3)];
    const pharmacy = new Pharmacy(drugs);

    expect(pharmacy.updateBenefitValue()).toBe(drugs);
  });

  it("matches the reference simulation output", () => {
    const drugs = [
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 12, 35),
      new Drug("Magic Pill", 15, 40),
    ];
    const pharmacy = new Pharmacy(drugs);
    const result = [];

    for (let elapsedDays = 0; elapsedDays < 30; elapsedDays += 1) {
      result.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
    }

    expect({ result }).toEqual(expectedOutput);
  });

  it("matches the simulation output when Dafalgan is included", () => {
    const drugs = [
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 12, 35),
      new Drug("Magic Pill", 15, 40),
      new Drug("Dafalgan", 10, 20),
    ];
    const pharmacy = new Pharmacy(drugs);
    const result = [];

    for (let elapsedDays = 0; elapsedDays < 30; elapsedDays += 1) {
      result.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
    }

    expect({ result }).toEqual(expectedOutputWithDafalgan);
  });
});
