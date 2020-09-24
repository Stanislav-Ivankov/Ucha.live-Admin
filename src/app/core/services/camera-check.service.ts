import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CameraCheckService {

	constructor(private apiService: ApiService) {}

	public async getCameraById(id) {
        return await this.apiService.get(`camera/${ id }`);
    }
    
    public async getCameras() {
        return await this.apiService.get(`cameras`);
    }
}