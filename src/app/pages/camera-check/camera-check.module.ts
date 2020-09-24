import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { CameraCheckComponent } from "./camera-check.component";

const ComponentRoutes: Routes = [
	{
		path: '',
		component: CameraCheckComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		CameraCheckComponent,
	],
	exports: [
		CameraCheckComponent
	]
})

export class CameraCheckModule {}