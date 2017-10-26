import { Component, OnInit } from '@angular/core';
import {YahooWeatherService} from '../services/yahoo-weather.service';

@Component({
	selector: 'app-weather-list',
	templateUrl: './weather-list.component.html',
	styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
	public weatherList = [];
	public isLoading = false;
	public isError = false;
	constructor(private yahooWeatherService: YahooWeatherService) { }

	ngOnInit() {
	}

	onNotifySearch(message: string): void {
		this.requestWeatherByCity(message);
	}
	
	requestWeatherByCity(city: string){
		this.isLoading = true;
		this.isError = false;
		this.yahooWeatherService.requestWeather(city).subscribe((data) => {
			if(!this.ifResponseData(data)){
				alert("error");
				this.isError = true;
				this.isLoading = false;
				return;
			}
			setTimeout(()=>{
				this.weatherList.push(data);
				this.isLoading = false;
			},220)
		})
	}

	ifResponseData(data): boolean{
		return data.query.results && data.query.results.channel;
	}

}
