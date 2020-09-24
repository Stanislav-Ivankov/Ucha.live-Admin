import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class GroupsService {

	groups = [];

	constructor(private apiService: ApiService) {}

	public async getGroupById(id) {
		console.log(id);
			return await this.apiService.get(`group/${ id }`);
	}

	public async getGroups() {
		if(!this.groups.length) {
			return await this.apiService.get('groups');
		} else {
			return this.groups;
		}
	}

	public async updateGroup(group) {
		return await this.apiService.patch(`groups/${group._id}`, group);
	}

	public async createGroup(group) {
		return await this.apiService.post('groups', group);
	}

	public async deleteGroup(id, body?) {
		return await this.apiService.delete(`groups/${id}`, body);
	}
}