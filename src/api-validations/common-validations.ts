import { expect } from '@jest/globals';
import request from 'supertest';

import { HttpStatus } from '../constants/httpStatus';
import { Links } from '../models/linksandMetaResponse';

export async function validateSuccessfulResponse(resp: request.Response) {
  expect(resp.status).toBe(HttpStatus.OK);
  const response = JSON.parse(JSON.stringify(resp.body));
  expect(response.data).toBeTruthy();
  expect(response.links).toBeTruthy();
  expect(response.links.self).toBeTruthy();
  expect(response.meta).toBeTruthy();
  expect(response.meta.totalPages).toBeGreaterThanOrEqual(0);
  expect(response.meta.totalRecords).toBeGreaterThanOrEqual(0);
}

export async function validatePageParams(response: request.Response, page: number, maxpage = 7) {
  const links: Links = JSON.parse(JSON.stringify(response.body.links));
  if (page === maxpage) {
    expect(links.self).toContain(`?page=${page}`);
    expect(links.first).toContain('?page=1');
    expect(links.prev).toContain(`?page=${page - 1}`);
  } else if (page === 1 || null) {
    expect(links.self).toContain(`?page=${page}`);
    expect(links.last).toContain(`?page=${maxpage}`);
    expect(links.next).toContain(`?page=${page + 1}`);
  } else {
    expect(links.self).toContain(`?page=${page}`);
    expect(links.first).toContain('?page=1');
    expect(links.last).toContain(`?page=${maxpage}`);
    expect(links.next).toContain(`?page=${page + 1}`);
    expect(links.prev).toContain(`?page=${page - 1}`);
  }
}

export function validateResponseHeaderFapiInteractionId(response: Response, fapiInteractionId?: string): void {
  expect(response.status).toBe(HttpStatus.OK);
  if (fapiInteractionId) {
    expect(response.headers['x-fapi-interaction-id']).toBe(fapiInteractionId);
  } else {
    expect(response.headers).toHaveProperty('x-fapi-interaction-id');
    expect(isValidUuid(response.headers['x-fapi-interaction-id'])).toBeTruthy();
  }
}

export function isValidUuid(id: string): boolean {
  //eslint-disable-next-line
  const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return uuidRegexExp.test(id);
}

export function isValidEmailAddress(emailAddresses: string): boolean {
  //eslint-disable-next-line
  const emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegEx.test(emailAddresses);
}
