import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Feature } from '../models/open-trip.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async getPlaces(): Promise<Feature[]> {
    const places: string | null = (await Preferences.get({ key: 'data' }))
      .value;
    return JSON.parse(places ?? '[]');
  }

  async savePlaces(places: Feature[]) {
    await Preferences.set({ key: 'data', value: JSON.stringify(places) });
  }

  async savePlace(place: Feature): Promise<void> {
    let places = await this.getPlaces();

    const result = this.deletePlacePrivate(places, place);

    // si estoy actualizando un elemento que ya existe se cambiaba de posicion
    // logica para recordar posicion al actualizar un elemento existente
    if (result.idxRemove >= 0) {
      places.splice(result.idxRemove, 0, place);
    } else {
      places.push(place);
    }

    await Preferences.set({ key: 'data', value: JSON.stringify(places) });
  }

  async deletePlace(place: Feature) {
    let places = await this.getPlaces();
    places = await this.deletePlacePrivate(places, place).updatedPlaces;
    this.savePlaces(places);
  }

  private deletePlacePrivate(
    places: Feature[],
    place: Feature
  ): { updatedPlaces: Feature[]; idxRemove: number } {
    const idxRemove = places.findIndex(
      (i) => i.properties.xid == place.properties.xid
    );
    if (idxRemove !== -1) places.splice(idxRemove, 1);
    return { updatedPlaces: places, idxRemove: idxRemove };
  }
}
