import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.css'],
	inputs: ['courseInfo'],
})

export class CourseItemComponent implements OnInit {
	public isEdited = false;
	public courseInfo;
	public chartDataKeys;
	public editForm = new FormGroup({
		name: new FormControl(),
		description: new FormControl(),
		creationDate: new FormControl(),
		duration: new FormControl(),
		review: new FormControl(),
	})

	@Output() notifyDelete: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
		if (this.courseInfo.chartData) {
			this.chartDataKeys = this.courseInfo.chartData.data.map((obj) => { return obj.key; });
		}
	}

	edit() {
		this.isEdited = true;
	}

	submitChanges(changes) {
		let oldReview = this.courseInfo.review;
		let newReview = changes.review;
		let cleanedObject = this.clean(changes);

		this.courseInfo.chartData = {
			"title": this.courseInfo.chartData.title,
			"data": this.reassignChartData(oldReview, newReview)
		};
		Object.assign(this.courseInfo, changes);
		this.closeEditing();
	}

	clean(myObj) {
		Object.keys(myObj).forEach((key) => (myObj[key] == null) && delete myObj[key]);
		return myObj;
	}
	reassignChartData(oldValue, newValue) {
		if (!oldValue || !newValue) {
			return this.courseInfo.chartData.data;
		}
		let res = this.courseInfo.chartData.data.map((obj) => {
			if (obj.key == oldValue) {
				obj.value -= 1;
			} else if (obj.key == newValue) {
				obj.value += 1;
			}
			return obj;

		})
		return res;
	}

	closeEditing() {
		this.isEdited = false;
	}

	deleteItem(courseName: string) {
		this.notifyDelete.emit(courseName);
	}
}
