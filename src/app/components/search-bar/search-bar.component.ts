import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  SearchbarInputEventDetail,
} from '@ionic/angular/standalone';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { Feature } from 'src/app/models/open-trip.model';
import { OpenTripMapService } from 'src/app/services/open-trip-map.service';
import { addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    CommonModule,
    FormsModule
  ],
})
export class SearchBarComponent implements OnInit {
  places: Feature[] = [];
  @Output() addPlace: EventEmitter<Feature> = new EventEmitter();

  constructor(private openTripService: OpenTripMapService) {}

  ngOnInit() {
    console.log('SearchBarComponent', 'Init');
    addIcons({ addCircleOutline });
  }

  async handleInput(
    $event: IonSearchbarCustomEvent<SearchbarInputEventDetail>
  ) {
    const searchInput = $event.detail.value ?? '';
    this.places = await this.openTripService.getPlaces(searchInput);
    console.log('Places', this.places);
  }

  onAddPlace(place: Feature) {
    this.addPlace.emit(place);
    this.places = [];
  }
}
