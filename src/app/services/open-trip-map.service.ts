import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feature, OpenTripAutoSuggest } from '../models/open-trip.model';

@Injectable({ providedIn: 'root' })
export class OpenTripMapService {
  constructor() {}

  async getLugares(place: string): Promise<Feature[]> {
    const resp = await fetch(
      `${environment.baseUrl}/autosuggest?name=${place}&radius=6371000&lon=0&lat=0&apikey=${environment.apiKey}`
    );

    const datos: OpenTripAutoSuggest = await resp.json();
    return datos.features;
  }
}
