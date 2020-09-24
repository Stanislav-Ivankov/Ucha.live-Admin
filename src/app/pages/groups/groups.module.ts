import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { GroupsComponent } from "./groups.component";
import { AddEditComponent } from "./add-edit/add-edit.component"

const ComponentRoutes: Routes = [
	{
		path: '',
		component: GroupsComponent
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
		GroupsComponent,
		AddEditComponent
	],
	exports: [
		GroupsComponent
	]
})

export class GroupsModule {}