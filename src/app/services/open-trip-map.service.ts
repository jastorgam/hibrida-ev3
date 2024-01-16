import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feature, OpenTripAutoSuggest } from '../models/open-trip.model';
import { OpenTripXid } from '../models/open-trip-xid.model';

@Injectable({ providedIn: 'root' })
export class OpenTripMapService {
  constructor() {}

  async getPlaces(place: string): Promise<Feature[]> {
    const resp = await fetch(
      `${environment.baseUrl}/autosuggest?name=${place}&radius=6381000&lat=-33&lon=-70&apikey=${environment.apiKey}`
    );

    const datos: OpenTripAutoSuggest = await resp.json();

    datos.features.forEach(async (f) => {
      const xidInfo = await this.getImage(f.properties.xid);
      f.xidInfo = xidInfo;
      f.xidInfo.preview?.source ??
        '/assets/images/Simple-Image-Not-Found-Icon.png';
    });

    return datos.features;
  }

  async getImage(xid: string): Promise<OpenTripXid> {
    const resp = await fetch(
      `${environment.baseUrl}/xid/${xid}?apikey=${environment.apiKey}`
    );
    const datos: OpenTripXid = await resp.json();
    return datos;
  }
}
