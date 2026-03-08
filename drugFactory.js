import {
  AgedDrug,
  DropoffDrug,
  FastDrug,
  ImmutableDrug,
  StandardDrug,
} from "./drug";
import { DRUG_TYPES, getDrugType, isStandardDrugName } from "./drugsConfig";

export default function drugFactory(name, expiresIn, benefit) {
  const type = getDrugType(name);

  if (type === DRUG_TYPES.STANDARD && !isStandardDrugName(name)) {
    throw new Error(`Unknown drug: "${name}"`);
  }

  switch (type) {
    case DRUG_TYPES.AGED:
      return new AgedDrug(name, expiresIn, benefit);
    case DRUG_TYPES.DROPOFF:
      return new DropoffDrug(name, expiresIn, benefit);
    case DRUG_TYPES.FAST:
      return new FastDrug(name, expiresIn, benefit);
    case DRUG_TYPES.IMMUTABLE:
      return new ImmutableDrug(name, expiresIn, benefit);
    case DRUG_TYPES.STANDARD:
    default:
      return new StandardDrug(name, expiresIn, benefit);
  }
}
