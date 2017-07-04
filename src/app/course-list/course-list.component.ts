import { Component, OnInit } from '@angular/core';
import { CourseManagementService } from '../services/course-management.service';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {
	public courseList = [];
	public filteredCourseList = [];

	constructor(private courseManagementService: CourseManagementService) {
		this.courseList = this.courseManagementService.getSongCollection();
		this.filteredCourseList = this.courseList;
	}

	ngOnInit() { }

	onNotifySearch(message: string): void {
		this.search(message);
	}

	search(searchValue: string): void {
		this.filteredCourseList = this.courseList.filter((course) => {
			return course.name.indexOf(searchValue) >= 0 || course.creationDate.indexOf(searchValue) >= 0;
		});
	}

	onNotifyDelete(message: string): void {
		this.deleteItem(message);
	}

	deleteItem(deleteValue: string): void {
		this.courseManagementService.deleteSongFromCollection(deleteValue);
		this.filteredCourseList = this.courseList;
	}

	onNotifyAddNewItem(message: any): void {
		this.addNewItem(message);
	}

	addNewItem(newItem: any): void {
		this.courseManagementService.addSongToCollection(newItem);
		this.filteredCourseList = this.courseList;
	}
}
