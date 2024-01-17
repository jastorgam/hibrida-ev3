import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  SearchbarInputEventDetail,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonIcon,
} from '@ionic/angular/standalone';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { addIcons } from 'ionicons';
import { cameraOutline, airplaneOutline, trashOutline } from 'ionicons/icons';
import { Feature } from 'src/app/models/open-trip.model';
import { OpenTripMapService } from 'src/app/services/open-trip-map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
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
  ],
})
export class HomePage implements OnInit {
  places: Feature[] = [];
  isLoading = false;

  constructor(private openTripService: OpenTripMapService) {
    addIcons({ airplaneOutline, cameraOutline, trashOutline });
  }

  ngOnInit(): void {
    console.log('HomePage', 'Init');
  }

  async handleInput(
    $event: IonSearchbarCustomEvent<SearchbarInputEventDetail>
  ) {
    this.isLoading = true;
    const searchInput = $event.detail.value ?? '';
    this.places = await this.openTripService.getPlaces(searchInput);
    console.log('Places', this.places);
    this.isLoading = false;
  }
}
