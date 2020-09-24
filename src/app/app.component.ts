import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
	selector: 'jilanov-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {

	loggedIn;

	logout() {
		this._authService.logout();
		document.body.style.background = `url('./assets/login.jpg') no-repeat center center fixed`;
	}

	constructor(private _authService: AuthService) {
		this._authService.loggedStatus.subscribe(status => {
			this.loggedIn = status;
			document.body.style.background = 'white';
		});
	}
}