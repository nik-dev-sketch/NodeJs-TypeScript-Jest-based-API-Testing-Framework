import { linksandMetaResponse } from './linksandMetaResponse';

export interface DerResponseSingleRecord extends linksandMetaResponse {
  data: DerRecords;
}

export interface DerResponseArrayRecords extends linksandMetaResponse {
  data: Data;
}

export interface Data {
  derRecords: DerRecords[];
}

export interface DerRecords {
  servicePointId: string;
  approvedCapacity: number;
  availablePhasesCount: number;
  installedPhasesCount: number;
  islandableInstallation: boolean;
  hasCentralProtectionControl?: boolean;
  protectionMode?: ProtectionMode;
  acConnections: AcConnections[];
}

export interface ProtectionMode {
  exportLimitKva?: number;
  underFrequencyProtection?: number;
  underFrequencyProtectionDelay?: number;
  overFrequencyProtection?: number;
  overFrequencyProtectionDelay?: number;
  underVoltageProtection?: number;
  underVoltageProtectionDelay?: number;
  overVoltageProtection?: number;
  overVoltageProtectionDelay?: number;
  sustainedOverVoltage?: number;
  sustainedOverVoltageDelay?: number;
  frequencyRateOfChange?: number;
  voltageVectorShift?: number;
  interTripScheme?: string;
  neutralVoltageDisplacement?: number;
}

export interface AcConnections {
  connectionIdentifier: number;
  count: number;
  equipmentType: 'INVERTER' | 'OTHER';
  manufacturerName?: string;
  inverterSeries?: string;
  inverterModelNumber?: string;
  commissioningDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DECOMMISSIONED';
  inverterDeviceCapacity?: number;
  derDevices: DerDevices[];
}

export interface DerDevices {
  deviceIdentifier: number;
  count: number;
  manufacturer?: string;
  modelNumber?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'DECOMMISSIONED';
  type: 'FOSSIL' | 'HYDRO' | 'WIND' | 'SOLAR_PV' | 'RENEWABLE' | 'GEOTHERMAL' | 'STORAGE' | 'OTHER';
  subtype?: string;
  nominalRatedCapacity: number;
  nominalStorageCapacity?: number;
}
