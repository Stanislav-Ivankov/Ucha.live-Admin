import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { UsersComponent } from './users.component';
import { AddEditComponent } from "./add-edit/add-edit.component";
import { DetailsComponent } from "./details/details.component";

const ComponentRoutes: Routes = [
	{
		path: '',
		component: UsersComponent
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
		UsersComponent,
		AddEditComponent,
		DetailsComponent
	],
	exports: [
		UsersComponent
	]
})

export class UsersModule {}