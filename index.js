import drugFactory from "./drugFactory";
import { Pharmacy } from "./pharmacy";

import fs from "fs";

const drugs = [
  drugFactory("Doliprane", 20, 30),
  drugFactory("Herbal Tea", 10, 5),
  drugFactory("Fervex", 12, 35),
  drugFactory("Magic Pill", 15, 40),
];
const pharmacy = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
}

/* eslint-disable no-console */
fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);

/* eslint-enable no-console */
