import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { IonModalCustomEvent, OverlayEventDetail } from '@ionic/core';
import { Feature } from 'src/app/models/open-trip.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-travel-value',
  templateUrl: './travel-value.component.html',
  styleUrls: ['./travel-value.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonModal,
    IonList,
    IonItem,
    IonInput,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    ReactiveFormsModule,
    IonText,
    IonButtons,
    IonTitle,
  ],
})
export class TravelValueComponent implements OnInit {
  miFormulario!: FormGroup;
  @ViewChild(IonModal) modal!: IonModal;
  currency!: string;
  @Input() place!: Feature;
  @Input() nameModal!: string;
  @Output() savePrice: EventEmitter<Feature> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (!environment.production) console.log('TravelValueComponent', 'Init');
    this.miFormulario = this.formBuilder.group({
      price: [
        this.place.price,
        [Validators.required, Validators.minLength(1), Validators.min(0)],
      ],
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.miFormulario.touched;
    console.log('form', this.miFormulario.valid);
    if (this.miFormulario.valid) {
      this.place.price = this.miFormulario.get('price')?.value;
      this.savePrice.emit(this.place);
      this.modal.dismiss(null, 'confirm');
    }
  }

  onWillDismiss($event: IonModalCustomEvent<OverlayEventDetail<any>>) {
    console.log('onWillDismiss', 'role', $event.detail.role);
    if ($event.detail.role === 'confirm') {
      this.modal.dismiss(null, 'onWillDismiss');
    }
  }
}
