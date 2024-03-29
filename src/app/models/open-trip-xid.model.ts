export interface OpenTripXid {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
  xidInfo: XidInfo;
  preview?: Preview;
  address?: Address;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  xid: string;
  name: string;
  highlighted_name: string;
  dist: number;
  rate: number;
  wikidata?: string;
  kinds: string;
  osm?: string;
}

export interface XidInfo {
  xid: string;
  name: string;
  address: Address;
  rate: string;
  wikidata?: string;
  kinds: string;
  sources: Sources;
  otm: string;
  wikipedia?: string;
  image?: string;
  preview?: Preview;
  wikipedia_extracts?: WikipediaExtracts;
  point: Point;
  osm?: string;
  bbox?: Bbox;
  url?: string;
}

export interface Address {
  city?: string;
  state: string;
  country: string;
  country_code: string;
  county?: string;
  village?: string;
  state_district?: string;
  hamlet?: string;
  postcode?: string;
  road?: string;
  house?: string;
  house_number?: string;
  neighbourhood?: string;
  town?: string;
}

export interface Sources {
  geometry: string;
  attributes: string[];
}

export interface Preview {
  source: string;
  height: number;
  width: number;
}

export interface WikipediaExtracts {
  title: string;
  text: string;
  html: string;
}

export interface Point {
  lon: number;
  lat: number;
}

export interface Bbox {
  lon_min: number;
  lon_max: number;
  lat_min: number;
  lat_max: number;
}
