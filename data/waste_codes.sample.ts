// data/waste_codes.sample.ts
export type WasteCode = {
  code: string;
  type: string;
  title: string;
  cfr_ref: string;
};

export const WASTE_CODES: WasteCode[] = [
  { code: "D001", type: "Characteristic", title: "Ignitable waste", cfr_ref: "40 CFR 261.21" },
  { code: "D002", type: "Characteristic", title: "Corrosive waste", cfr_ref: "40 CFR 261.22" },
  { code: "F006", type: "F-listed", title: "Wastewater treatment sludges from electroplating", cfr_ref: "40 CFR 261.31" },
  { code: "U002", type: "U-listed", title: "Acetone", cfr_ref: "40 CFR 261.33(f)" }
];
