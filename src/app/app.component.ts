import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { OpenTripMapService } from './services/open-trip-map.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  providers: [OpenTripMapService],
})
export class AppComponent implements OnInit {
  constructor(private openTripService: OpenTripMapService) {}

  async ngOnInit() {
    console.log('prueba');
    const lugares = await this.openTripService.getLugares('concepcion');
    console.log(lugares);
  }
}
