import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { CityComponent } from './city/city.component';

import {YahooWeatherService} from './services/yahoo-weather.service';
import { CelsiusPipe } from './pipes/celsius.pipe';
import { MpsPipe } from './pipes/mps.pipe'


@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		SearchBarComponent,
		WeatherListComponent,
		CityComponent,
		CelsiusPipe,
		MpsPipe,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ReactiveFormsModule,
	],
	providers: [YahooWeatherService],
	bootstrap: [AppComponent]
})
export class AppModule { }
