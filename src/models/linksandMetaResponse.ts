export interface linksandMetaResponse {
  links?: Links;
  meta?: Meta;
}

export interface Links {
  self?: string;
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
}

export interface Meta {
  totalRecords?: number;
  totalPages?: number;
}
