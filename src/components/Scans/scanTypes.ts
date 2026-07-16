export type ScanDetails = {
  clientType: string;
  referredBy: string;
  ledgerName: string;
  name: string;
  age: string;
  phone: string;
  gender: string;
  mrp: string;
};

export type ScanRecordStatus = 'Draft' | 'Saved' | 'Exported' | 'Processing';

export type ScanRecord = {
  id: string;
  scanId: string;
  fileName: string;
  fileUrl?: string;
  size: string;
  uploadedAt: string;
  exportedAt?: string;
  status: ScanRecordStatus;
  details: ScanDetails;
  detailsSaved: boolean;
  exported: boolean;
};

export const defaultScanDetails = (): ScanDetails => ({
  clientType: 'Individual',
  referredBy: 'SELF',
  ledgerName: '9597770205',
  name: '',
  age: '',
  phone: '',
  gender: '',
  mrp: '',
});

let scanIdCounter = 42488;

export function nextScanId() {
  scanIdCounter += 1;
  return `S${scanIdCounter}`;
}
