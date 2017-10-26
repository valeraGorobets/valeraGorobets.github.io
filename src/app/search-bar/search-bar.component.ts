import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
	public searchCityValue: string = "";
	@Output() notifySearch: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	onkeypress(event) {
		if (event.keyCode == 13) {
			this.submitSearch();
		}
	}

	submitSearch() {
		if(!this.searchCityValue){
			return;
		}
		this.notifySearch.emit(this.searchCityValue);
		this.searchCityValue = "";
	}
}
