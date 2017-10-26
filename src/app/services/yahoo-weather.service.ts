import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class YahooWeatherService {

	constructor(private http: Http) {
	}

	public requestWeather(city: string): Observable<any> {
		const url = `https://query.yahooapis.com/v1/public/yql?q=select * 
			from weather.forecast where woeid in (select woeid from geo.places(1)
			where text="${city}")&format=json`;
		return this.http.get(url).map((responce) => responce.json());
	}
}
