import * as moment from "moment";

import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {

	constructor(private _router: Router) {}

	loggedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

	getLoggedStatus() {
		return this.loggedStatus;
	}

	emitLoggedStatus(status: boolean) {
		this.loggedStatus.emit(status);
	}

	setLocalStorage(response) {
		const expiresAt = moment().add(response.Expires[0], response.Expires[1]).valueOf();

		localStorage.setItem('Token', response.Token);
		localStorage.setItem("Expires", JSON.stringify(expiresAt));
		this.emitLoggedStatus(true);
	}

	logout() {
		localStorage.removeItem("Token");
		localStorage.removeItem("Expires");
		this._router.navigate(['/login']);
		this.emitLoggedStatus(false);
	}

	public isLoggedIn() {
		return moment().isBefore(this.getExpiration()) && localStorage.getItem('Token');
	}

	isLoggedOut() {
		return !this.isLoggedIn();
	}

	getExpiration() {
		const expiration = localStorage.getItem("Expires");
		const expiresAt = JSON.parse(expiration);
		return moment(expiresAt);
	}
}