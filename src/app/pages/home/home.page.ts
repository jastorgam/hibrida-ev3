import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { airplaneOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import { ListPlacesComponent } from 'src/app/components/list-places/list-places.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { TravelValueComponent } from 'src/app/components/travel-value/travel-value.component';
import { Feature } from 'src/app/models/open-trip.model';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonImg,
    IonIcon,
    TravelValueComponent,
    SearchBarComponent,
    ListPlacesComponent,
  ],
})
export class HomePage implements OnInit {
  places: Feature[] = [];
  isLoading = false;

  constructor(private storageService: StorageService) {}

  async ngOnInit(): Promise<void> {
    if (!environment.production) console.log('HomePage', 'Init');
    this.places = await this.storageService.getPlaces();
    addIcons({ airplaneOutline, cameraOutline, trashOutline });
  }

  async onSavePrice($event: Feature) {
    await this.storageService.savePlace($event);
    this.places = await this.storageService.getPlaces();
  }

  async addPlace($event: Feature) {
    await this.storageService.savePlace($event);
    this.places = await this.storageService.getPlaces();
  }

  async onDeletePlace($event: Feature) {
    await this.storageService.deletePlace($event);
    this.places = await this.storageService.getPlaces();
  }

  async onSaveImage($event: Feature) {
    await this.storageService.savePlace($event);
    this.places = await this.storageService.getPlaces();
  }
}
