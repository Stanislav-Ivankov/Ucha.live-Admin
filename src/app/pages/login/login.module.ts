import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login.component';

const ComponentRoutes: Routes = [
	{ path: '', component: LoginComponent }
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
		LoginComponent,
	],
	exports: [
		LoginComponent
	]
})

export class LoginModule {}