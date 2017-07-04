import { Component, OnInit, OnChanges, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css'],
	inputs: ['chartData', 'id'],
})

export class ChartComponent implements OnInit, OnChanges {
	public chartData;
	public id;
	public isInited = false;
	private width: number = 350;
	private height: number = 300;
	private radius: number = Math.min(this.width, this.height) / 2;;

	private arc: any;
	private labelArc: any;
	private pie: any;
	private color: any;
	private svg: any;


	constructor() { }
	ngOnInit() {
		this.replaceID();
		this.drawPieChart();
	}
	replaceID() {
		document.getElementById("chartID").id = this.id;

	}
	ngOnChanges(changes: any) {
		this.drawPieChart();
	}

	private drawPieChart() {
		this.initSvg();
		this.drawPie();
	}

	private initSvg() {

		this.color = d3Scale.scaleOrdinal()
			.range(["#93E44D", "#FECC09", "#FF8900", "#F54A1F", "#EC1429"]);
		this.arc = d3Shape.arc()
			.outerRadius(this.radius - 10)
			.innerRadius(40);
		this.labelArc = d3Shape.arc()
			.outerRadius(this.radius - 50)
			.innerRadius(this.radius - 70);
		this.pie = d3Shape.pie()
			.sort(null)
			.value((d: any) => d.value);

		this.svg = d3.select("#" + this.id)
			.attr('width', this.width)
			.attr('height', this.height)
			.append('g')
			.attr('transform', 'translate(' + (this.width / 2) +
			',' + (this.height / 2) + ')');

	}

	private drawPie() {
		let g = this.svg.selectAll(".arc").data(this.pie(this.chartData.data))
			.enter().append("g")
			.attr("class", "arc");
		g.append("path").attr("d", this.arc)
			.style("fill", (d: any) => this.color(d.data.key));
		g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
			.attr("dy", ".35em")
			.text((d: any) => d.data.key);
	}
}