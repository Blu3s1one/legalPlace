export { Drug } from "./drug";

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateDrugsState() {
    for (const drug of this.drugs) {
      drug.updateState();
    }

    return this.drugs;
  }
}
