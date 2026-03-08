import {
  AgedDrug,
  DropoffDrug,
  FastDrug,
  ImmutableDrug,
  StandardDrug,
} from "./drug";
import { DRUG_TYPES, getDrugType } from "./drugsConfig";

export default function drugFactory(name, expiresIn, benefit) {
  const type = getDrugType(name);

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
