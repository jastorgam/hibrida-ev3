import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  ActionSheetController,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { airplaneOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import { Feature } from 'src/app/models/open-trip.model';
import { environment } from 'src/environments/environment';
import { TravelValueComponent } from '../travel-value/travel-value.component';

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

  constructor(
    private currencyPipe: CurrencyPipe,
    private actionSheetCtrl: ActionSheetController
  ) {}

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

  async onDeletePlace(place: Feature) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Esta seguro?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    if (role === 'confirm') this.deletePlace.emit(place);
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
      // console.log(imageUrl);
    } catch (error) {
      // console.error(error);
    }
  }
}
