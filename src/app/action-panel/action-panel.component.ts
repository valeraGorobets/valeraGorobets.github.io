import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-action-panel',
	templateUrl: './action-panel.component.html',
	styleUrls: ['./action-panel.component.css']

})
export class ActionPanelComponent implements OnInit {
	public isAddingNewCourse = false;
	public searchValue: string;
	public editForm = new FormGroup({
		name: new FormControl("default"),
		description: new FormControl("new Course"),
		creationDate: new FormControl(new Date()),
		duration: new FormControl("00:00:00"),
		review: new FormControl("Perfect"),
	})

	@Output() notifySearch: EventEmitter<string> = new EventEmitter<string>();
	@Output() notifyAddNewItem: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit() { }

	onFindClick() {
		this.notifySearch.emit(this.searchValue);
		this.searchValue = "";
	}

	addNewCourse(newCourse) {
		newCourse.id = newCourse.name.replace(/\s/g, '');
		newCourse.chartData = this.initChartData("Worldwide Review");
		this.notifyAddNewItem.emit(newCourse);
		this.closePopup();
	}

	initChartData(title: string) {
		return {
				"title": "Worldwide Review",
				"data": [
					{ key: "Perfect", value: 1},
					{ key: "Good", value: 0},
					{ key: "Ok", value: 0 },
					{ key: "Bad", value: 0 },
					{ key: "Awful", value: 0 },
				]
			}
	}

	openPopup() {
		this.isAddingNewCourse = true;
	}
	
	closePopup() {
		this.isAddingNewCourse = false;
	}
}
