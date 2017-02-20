import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { GeocodeService } from '../providers/geocode-service';
import { WeatherService } from '../providers/weather-service';
import { LocationsService } from '../providers/locations-service';
import { Weathericon } from '../pipes/weathericon';

@NgModule({
  declarations: [
    MyApp,
    WeatherPage,
    LocationsPage,
    Weathericon
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    LocationsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},GeocodeService,WeatherService,LocationsService]
})
export class AppModule {}
