import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ActionPanelComponent } from './action-panel/action-panel.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { FooterComponent } from './footer/footer.component';

import { CourseManagementService } from './services/course-management.service';
import { PopupComponent } from './popup/popup.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ActionPanelComponent,
		CourseListComponent,
		CourseItemComponent,
		FooterComponent,
		PopupComponent,
		ChartComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ReactiveFormsModule,
	],
	providers: [CourseManagementService],
	bootstrap: [AppComponent]
})
export class AppModule { }
