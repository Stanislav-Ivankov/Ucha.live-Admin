import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";

import { ApiService } from './services/api.service';
import { AuthService } from "./services/auth.service";
import { GroupsService } from './services/groups.service';
import { UsersService } from './services/users.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
	],
	declarations: [],
	exports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
		AuthGuard,
		AuthService,
		ApiService,
		GroupsService,
		UsersService
	],
})

export class CoreModule {}