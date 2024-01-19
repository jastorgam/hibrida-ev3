import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  SearchbarInputEventDetail,
} from '@ionic/angular/standalone';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { Feature } from 'src/app/models/open-trip.model';
import { OpenTripMapService } from 'src/app/services/open-trip-map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonImg,
    CommonModule,
    FormsModule,
  ],
})
export class SearchBarComponent implements OnInit {
  places: Feature[] = [];
  @Output() addPlace: EventEmitter<Feature> = new EventEmitter();

  constructor(private openTripService: OpenTripMapService) {}

  ngOnInit() {
    if (!environment.production) console.log('SearchBarComponent', 'Init');
    addIcons({ addCircleOutline });
  }

  async handleInput(
    $event: IonSearchbarCustomEvent<SearchbarInputEventDetail>
  ) {
    const searchInput = $event.detail.value ?? '';
    if (searchInput != '') {
      this.places = await this.openTripService.getPlaces(searchInput);
      console.log('Places', this.places);
    } else {
      this.places = [];
    }
  }

  onAddPlace(place: Feature) {
    this.addPlace.emit(place);
    // this.places = [];
  }
}
