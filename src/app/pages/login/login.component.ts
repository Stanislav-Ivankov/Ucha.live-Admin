import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	title: string = 'уча.live';
	form: NgForm
	username: string = '';
	password: string = '';

	constructor(private _apiService: ApiService, private _authService: AuthService, private _router: Router) {}

	ngOnInit() {}

	login(form: NgForm) {
		this._apiService.post('admin/login', form.value)
			.then(response => {
				this._authService.setLocalStorage(response);
				this._router.navigate(['/users']);
			})
			.catch(err => console.log(err));
	}
}