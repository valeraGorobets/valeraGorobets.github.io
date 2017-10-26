import { Component, OnInit, OnChanges, SimpleChange  } from '@angular/core';
import getClassNameByCondition from './weatherImages';

@Component({
	selector: 'app-city',
	templateUrl: './city.component.html',
	styleUrls: ['./city.component.css'],
	inputs: ['weatherInfo'],
})
export class CityComponent implements OnInit, OnChanges  {
	public weatherInfo;
	public units;
	public location;
	public humidity;
	public windSpeed;
	public condition;
	public temp;
	public imageClassName;

	constructor() { }
	ngOnInit() {
	}

	ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
		if (changes['weatherInfo'] && this.weatherInfo) {
			this.weatherInfo = this.filterToUsefulData(this.weatherInfo);
			this.units = this.weatherInfo.units;
			this.location = this.weatherInfo.location;
			this.humidity = this.weatherInfo.atmosphere.humidity;
			this.windSpeed = this.weatherInfo.wind.speed;
			this.condition = this.weatherInfo.item.condition;
			this.temp = this.weatherInfo.item.condition.temp;
			this.imageClassName = getClassNameByCondition(this.condition.text);
		}
	}

	filterToUsefulData(info): any{
		return info.query.results.channel;
	}



}

