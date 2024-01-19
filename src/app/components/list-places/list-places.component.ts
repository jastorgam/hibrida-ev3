import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonIcon, IonImg, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { airplaneOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import { Feature } from 'src/app/models/open-trip.model';
import { TravelValueComponent } from '../travel-value/travel-value.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.scss'],
  standalone: true,
  imports: [IonItem, IonIcon, IonLabel, TravelValueComponent, IonImg],
  providers: [CurrencyPipe],
})
export class ListPlacesComponent implements OnInit {
  @Input() place!: Feature;
  @Output() savePrice: EventEmitter<Feature> = new EventEmitter();
  @Output() deletePlace: EventEmitter<Feature> = new EventEmitter();
  @Output() saveImage: EventEmitter<Feature> = new EventEmitter();

  constructor(private currencyPipe: CurrencyPipe) {}

  get price(): string {
    return this.currencyPipe.transform(this.place.price, 'USD') ?? '';
  }

  ngOnInit() {
    if (!environment.production) console.log('ListPlacesComponent', 'Init');
    addIcons({ airplaneOutline, cameraOutline, trashOutline });
  }

  onSavePrice($event: Feature) {
    this.savePrice.emit($event);
  }

  onDeletePrice(place: Feature) {
    this.deletePlace.emit(place);
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      const imageUrl = `data:image/jpeg;base64,${image.base64String}`;
      if (this.place.xidInfo) {
        if (!this.place.xidInfo?.preview) {
          this.place.xidInfo.preview = {
            height: 0,
            width: 0,
            source: imageUrl,
          };
        } else {
          this.place.xidInfo.preview.source = imageUrl;
        }
      }

      this.saveImage.emit(this.place);

      console.log(imageUrl);
    } catch (error) {
      console.error(error);
    }
  }
}
