import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'

import { CameraCheckService } from '../../core/services/camera-check.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-camera-check',
	templateUrl: './camera-check.component.html',
	styleUrls: ['./camera-check.component.scss']
})

export class CameraCheckComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

	cameras = [];
	visibleCamera = null;
	loading = true;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private cameraCheckService: CameraCheckService,
		public dialog: MatDialog,
		private _authService: AuthService
	) {
		this.fetchAllCameras();
	}

	fetchAllCameras() {
		this.cameraCheckService.getCameras().then((data: any) => {
			this.cameras = data
			this.changeDetectorRef.detectChanges()
			this.loading = false;
		})
	}
}