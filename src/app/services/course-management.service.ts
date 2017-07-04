import { Injectable } from '@angular/core';

@Injectable()
export class CourseManagementService {

	private collection = [
		{
			"id": "Videocourse0",
			"name": "Videocourse 0",
			"description": "Health and social security Cases",
			"creationDate": "2017-03-28",
			"duration": "01:28:05",
			"review": "Good",
			"chartData": {
				"title": "Worldwide Review",
				"data": [
					{ key: "Perfect", value: 1 },
					{ key: "Good", value: 1 },
					{ key: "Ok", value: 1 },
					{ key: "Bad", value: 1 },
					{ key: "Awful", value: 1 },
				]
			}

		},
		{
			"id": "Videocourse1",
			"name": "Videocourse 1",
			"description": "Social security Cases",
			"creationDate": "2016-01-05",
			"duration": "01:28:05",
			"review": "Ok",
			"chartData": {
				"title": "Worldwide Review",
				"data": [
					{ key: "Perfect", value: 10 },
					{ key: "Good", value: 7 },
					{ key: "Ok", value: 4 },
					{ key: "Bad", value: 9 },
					{ key: "Awful", value: 3 },
				]
			}

		},
		{
			"id": "Videocourse2",
			"name": "Videocourse 2",
			"description": "Tax Collection",
			"creationDate": "2017-02-11",
			"duration": "01:28:05",
			"review": "Bad",
			"chartData": {
				"title": "Worldwide Review",
				"data": [
					{ key: "Perfect", value: 10 },
					{ key: "Good", value: 20 },
					{ key: "Ok", value: 6 },
					{ key: "Bad", value: 2 },
					{ key: "Awful", value: 21},
				]
			}

		}
		,{
			"id": "Videocourse3",
			"name": "Videocourse 3",
			"description": "Management Cases",
			"creationDate": "2016-05-08",
			"duration": "01:28:05",
			"review": "Perfect",
			"chartData": {
				"title": "Worldwide Review",
				"data": [
					{ key: "Perfect", value: 10 },
					{ key: "Good", value: 5 },
					{ key: "Ok", value: 17 },
					{ key: "Bad", value: 21 },
					{ key: "Awful", value: 20 },
				]
			}

		}
	];

	constructor() { }

	getSongCollection() {
		return this.collection;
	}

	addSongToCollection(value: any) {
		this.collection.push(value);
	}

	deleteSongFromCollection(song) {
		let deletingSongIndex = this.collection.findIndex((element) => {
			return element.name === song.name;
		});
		this.collection.splice(deletingSongIndex, 1);
	}
}
