import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements OnInit {

  data: any = [{ weatherDate: "", city: "", editFlag: undefined },
  { weatherDate: "", city: "", editFlag: undefined }
    , { weatherDate: "", city: "", editFlag: undefined }
    , { weatherDate: "", city: "", editFlag: undefined }
    , { weatherDate: "", city: "", editFlag: undefined }
    , { weatherDate: "", city: "", editFlag: undefined }
    , { weatherDate: "", city: "", editFlag: undefined }
    , { weatherDate: "", city: "", editFlag: undefined }
    , { weatherDate: "", city: "", editFlag: undefined }];

  onlineOffline: boolean = navigator.onLine

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
     
      setInterval(() => {
        this.data.forEach((element, index) => {
          setTimeout(() => {
            if(element.city !=""){
              this.getWeather(element.city,index);
            }
          }, 5000);
        });
      }, 1800000)
  }

  getWeather(city, i) {
    if (this.onlineOffline) {
      if (city.length > 0) {
        this.http.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0f4a1fe2f11da154d8032643a3628a02").subscribe(res => {
          if (res) {
            this.data[i].weatherDate = res;
            console.log(this.data);
            this.data[i].editFlag = true;
            this.setLocal(this.data);
          }
        }, err => {
          alert("Please enter valid city name.");
        });

      }
      else {
        alert("Please enter city name.");
      }
    }
    else {
      let allWeatherData:any;
      allWeatherData=this.getLocal();
      this.data[i]= allWeatherData[i];
    }
  }
  hideCard(i) {
    this.data[i].editFlag = false;
    this.setLocal(this.data);
  }
  reset(i) {
    this.data[i].editFlag = false;
    this.data[i].city = "";
    this.data[i].weatherDate = "";
    this.setLocal(this.data);
  }
  setLocal(val) {
    localStorage.setItem("weatherData", JSON.stringify(val));
  }
  getLocal() {
    return localStorage.getItem(JSON.parse("weatherData"));
  }
   

}

