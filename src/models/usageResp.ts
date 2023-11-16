import { linksandMetaResponse } from './linksandMetaResponse';

export interface UsageResponse extends linksandMetaResponse {
  data: Data;
}

export interface Data {
  reads: Reads[];
}

export interface Reads {
  servicePointId: string;
  registerId?: string;
  registerSuffix: string;
  meterId?: string;
  controlledLoad?: true;
  readStartDate: string;
  readEndDate?: string;
  unitOfMeasure?: string;
  readUType: 'basicRead' | 'intervalRead';
  basicRead?: BasicRead;
  intervalRead?: IntervalRead;
}

export interface BasicRead {
  quality?: 'ACTUAL' | 'SUBSTITUTE' | 'FINAL_SUBSTITUTE';
  value: number;
}

export interface IntervalRead {
  readIntervalLength?: number;
  aggregateValue: number;
  intervalReads: number[];
  readQualities: ReadQualities;
}

export interface ReadQualities {
  startInterval: number;
  endInterval: number;
  quality: 'ACTUAL' | 'SUBSTITUTE' | 'FINAL_SUBSTITUTE';
}
