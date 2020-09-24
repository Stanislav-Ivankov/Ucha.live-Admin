import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UsersService {

	users = [];
	
	constructor(private apiService: ApiService) {}

	public async getUsers() {
		if(!this.users.length) {
			return await this.apiService.get('users');
		} else {
			return this.users;
		}
	}

	public async createUser(user) {
		return await this.apiService.post('user', user);
	}

	public async updateUser(user) {
		return await this.apiService.patch(`user/${ user._id }`, user);
	}

	public async deleteUser(id, body?) {
		return await this.apiService.delete(`user/${ id }`, body);
	}
}