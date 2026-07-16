export type FingerprintSet = {
  label: string;
  slot: number;
};

/** Demo fingerprint sets — replace with API image URLs when zip is processed */
export const defaultFingerprintSets: FingerprintSet[] = [
  { label: 'L1', slot: 0 },
  { label: 'L2', slot: 1 },
  { label: 'L3', slot: 2 },
  { label: 'R1', slot: 3 },
  { label: 'R2', slot: 4 },
  { label: 'R3', slot: 5 },
];

export function fingerprintSetsForScan(scanId: string): FingerprintSet[] {
  const seed = scanId.split('').reduce((n, c) => n + c.charCodeAt(0), 0);
  const count = 3 + (seed % 3);
  return defaultFingerprintSets.slice(0, count);
}
