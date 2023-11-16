import { cdrQueryParameters } from '../../src/utils/headerUtils/queryParams-utils';

export const full_interval_reads: cdrQueryParameters = {
  'interval-reads': 'FULL',
  'oldest-date': '2018-02-01',
  'newest-date': '2023-04-22',
};

export const min_interval_reads: cdrQueryParameters = {
  'interval-reads': 'MIN_30',
  'oldest-date': '2018-02-01',
  'newest-date': '2023-04-22',
};

export const time_reads: cdrQueryParameters = {
  'oldest-time': '2020-04-18T15:43:00.12345Z',
};

export const date_reads: cdrQueryParameters = {
  'oldest-date': '2020-04-22',
};

export const invalidPageSize: cdrQueryParameters = {
  'page-size': '0',
};
