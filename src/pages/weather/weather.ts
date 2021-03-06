import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { WeatherService } from '../../providers/weather-service';
import { Geolocation } from 'ionic-native';
import { CurrentLoc } from '../../interfaces/current-loc';
/*
  Generated class for the Weather page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  loader: LoadingController;
  refresher: Refresher;
  currentLoc: CurrentLoc = { lat: 0, lon: 0 };
  pageTitle: string = 'Current Location';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public weatherService: WeatherService,
    public loadingCtr: LoadingController) {

    let loader = this.loadingCtr.create({ content: "Loading weather data ... " });
    loader.present();
    let loc = this.navParams.get('geoloc');
    this.pageTitle = this.navParams.get('title') ? this.navParams.get('title') : 'Current Loc';

    // this.weatherService.getWeather().then(theResult => {
    //   this.theWeather = theResult;
    //   this.currentData = this.theWeather.currently;
    //   this.daily = this.theWeather.daily;
    // });

    if (loc === undefined) {
      Geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.currentLoc.lat = pos.coords.latitude;
        this.currentLoc.lon = pos.coords.longitude;
        this.currentLoc.timestamp = pos.timestamp;
        return this.currentLoc;
      }).then(currentLoc => {
        weatherService.getWeather(currentLoc).then(theResult => {
          this.theWeather = theResult;
          this.currentData = this.theWeather.currently;
          this.daily = this.theWeather.daily;
          loader.dismiss();
        });

      });
    } else {
      this.currentLoc = loc;

      weatherService.getWeather(this.currentLoc).then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
        loader.dismiss();
      });

    }


  }

  doRefresh(refresher) {
    this.weatherService.getWeather(this.currentLoc).then(theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;
      refresher.complete();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

}
