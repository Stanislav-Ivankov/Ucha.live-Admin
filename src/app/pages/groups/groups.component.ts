import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEditComponent } from './add-edit/add-edit.component';
import { GroupsService } from '../../core/services/groups.service';
import Swal from 'sweetalert2'
import { AuthService } from '../../core/services/auth.service';
import { CameraCheckService } from '../../core/services/camera-check.service';

@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

	columns = [
		{
		  iconColumn: true, 
		  elementAttribute: 'positionEditIcon'
		},
		{
		  label: 'Име',
		  elementAttribute: 'name'
		},
		// {
		//   label: 'График',
		//   elementAttribute: 'schedule',
		//   formatFn: this.format.bind(this)
		// },
		{
		  iconColumn: true,
		  elementAttribute: 'positionDeleteIcon'
		},
	];

	groups = [];
	cameras = [];
	loading = true;

	constructor(
		private cameraCheckService: CameraCheckService,
		private changeDetectorRef: ChangeDetectorRef,
		private groupsService: GroupsService,
		public dialog: MatDialog,
		private _authService: AuthService
	) {
		this.fetchAll();
	}

	fetchAll() {
		this.groupsService.getGroups().then((data: any) => {
			this.groups = data
			this.changeDetectorRef.detectChanges()
			this.loading = false;
		});

		this.cameraCheckService.getCameras().then((data: any) => {
			this.cameras = data;
		});
	}

	onAddNew() {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '500px',
			data: {
				item: {
					mon: [],
					tue: [],
					wed: [],
					thu: [],
					fri: [],
					sat: [],
					sun: []
				},
				cameras: this.cameras
			}
		});
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}		
			this.loading = true;
			let request = this.formatData(result.item);
			let response = await this.groupsService.createGroup(request);
			this.loading = false;
			this.fetchAll();
		});
	}

	onEdit(item) {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '500px',
			data: {
				item: {
					mon: item.schedule.filter((el) => el.dayOfWeek == 0).map((el) => this.fixDates(el)),
					tue: item.schedule.filter((el) => el.dayOfWeek == 1).map((el) => this.fixDates(el)),
					wed: item.schedule.filter((el) => el.dayOfWeek == 2).map((el) => this.fixDates(el)),
					thu: item.schedule.filter((el) => el.dayOfWeek == 3).map((el) => this.fixDates(el)),
					fri: item.schedule.filter((el) => el.dayOfWeek == 4).map((el) => this.fixDates(el)),
					sat: item.schedule.filter((el) => el.dayOfWeek == 5).map((el) => this.fixDates(el)),
					sun: item.schedule.filter((el) => el.dayOfWeek == 6).map((el) => this.fixDates(el)),
					name: item.name,
					_id: item._id,

				},
				cameras: this.cameras
			}
		});
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			this.loading = true;
			let request = this.formatData(result.item);
			let response = await this.groupsService.updateGroup(request);
			this.loading = false;
			this.fetchAll();
		});
	}

	onDelete(item) {
		var id = item._id;
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: 'mat-focus-indicator right mat-button mat-flat-button mat-button-base btn-success',
			  cancelButton: 'mat-focus-indicator right mat-button mat-flat-button mat-button-base btn-danger'
			},
			buttonsStyling: false
		  })
		  
		  swalWithBootstrapButtons.fire({
			title: 'Сигурни ли сте?',
			text: "Вие няма да можете да върнете изтритото!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Да, изтрии го!',
			cancelButtonText: 'Не, остави го!',
			reverseButtons: true
		  }).then(async (result) => {
			if (result.value) {
				let response = await this.groupsService.deleteGroup(id);
				if(response === null) {
					swalWithBootstrapButtons.fire(
						'Изтрито!',
						'Класът беше изтрит.',
						'success'
					)
					this.fetchAll();
				} else {
					swalWithBootstrapButtons.fire(
						'Не е изтрито!',
						'Класът не е изтрит.',
						'error'
					)
				}
			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {}
		  })
	}

	format(items) {
		// TODO Make it like list
		let response = this.makeMon(items) + this.makeTue(items) + this.makeWed(items) + this.makeThu(items)+ this.makeFri(items);
		response = response.replace(/\n/g, '<br />');
		return response;
	}

	fixDates(el) {
		let offset = (new Date()).getTimezoneOffset();
		let startSplit = el.start.split(':');
		let startHours = +startSplit[0].split('T')[1] - Math.floor(offset/60);
		let startMinutes = +startSplit[1] - Math.floor(offset%60);
		let endSplit = el.end.split(':');
		let endHours = endSplit[0].split('T')[1]  - Math.floor(offset/60);
		let endMinutes = endSplit[1] - Math.floor(offset%60);
		return {
			...el,
			start: (startHours > 9 ? startHours : '0' + startHours) + ':' + (startMinutes > 9 ? startMinutes : '0' + startMinutes),
			end: (endHours > 9 ? endHours : '0' + endHours) + ':' + (endMinutes > 9 ? endMinutes : '0' + endMinutes) ,
		}
	}

	formatData(data) {
		let result: any = {
			name: data.name,
			schedule: [
				...data.mon.map((el) => this.buildData(el, 0)),
				...data.tue.map((el) => this.buildData(el, 1)),
				...data.wed.map((el) => this.buildData(el, 2)),
				...data.thu.map((el) => this.buildData(el, 3)),
				...data.fri.map((el) => this.buildData(el, 4)),
				...data.sat.map((el) => this.buildData(el, 5)),
				...data.sun.map((el) => this.buildData(el, 6)),
			]
		};
		if(data._id) {
			result._id = data._id
		}
		return result;
	}

	buildData(el, index = 0) {
		let offset = (new Date()).getTimezoneOffset();
		let startHour = +el.start.split(':')[0] + Math.floor(offset/60);
		let startMinutes = +el.start.split(':')[1] + Math.floor(offset%60);
		let endHour = +el.end.split(':')[0] + Math.floor(offset/60);
		let endMinutes = +el.end.split(':')[1] + Math.floor(offset%60);
		return {
			start: `T${startHour > 9 ? startHour : '0' + startHour}:${startMinutes > 10 ? startMinutes : '0' + startMinutes}:00.000Z`,
			end: `T${endHour > 9 ? endHour : '0' + endHour}:${endMinutes > 10 ? endMinutes : '0' + endMinutes}:00.000Z`,
			dayOfWeek: index,
			title: el.title,
			description: el.description,
			camera: el.camera,
		}
	}

	getDate(date) {
		let scrap = date.split('T')[1].split('Z')[0].split('.')[0];
		let splitDays = scrap.split(':');
		let offset = -(new Date().getTimezoneOffset());
		let hours = +splitDays[0] + Math.floor(offset/60);
		let minutes = +splitDays[1] + Math.floor(offset%60);
		return {
			hours: hours,
			minutes: minutes > 9 ? minutes : '0' + minutes
		}
	}

	makeMon(items) {
		let response = ``;
		// TODO Make it like list
		response += `Понеделник:` + items.filter((el) => el.dayOfWeek === 0).map((el) => {
			let start = this.getDate(el.start);
			let end = this.getDate(el.end);
			return `
${start.hours}:${start.minutes} - ${end.hours}:${end.minutes} - ${el.title} - ${el.description}`
		}).join('');
		return response;
	}

	makeTue(items) {
		let response = ``;
		// TODO Make it like list
		response += `
Вторник:` + items.filter((el) => el.dayOfWeek === 1).map((el) => {
			let start = this.getDate(el.start);
			let end = this.getDate(el.end);
			return `
${start.hours}:${start.minutes} - ${end.hours}:${end.minutes} - ${el.title} - ${el.description}`
		}).join('');
		return response;
	}

	makeWed(items) {
		let response = ``;
		// TODO Make it like list
		response += `
Сряда:` + items.filter((el) => el.dayOfWeek === 2).map((el) => {
			let start = this.getDate(el.start);
			let end = this.getDate(el.end);
			return `
${start.hours}:${start.minutes} - ${end.hours}:${end.minutes} - ${el.title} - ${el.description}`
		}).join('');
		return response;
	}

	makeThu(items) {
		let response = ``;
		// TODO Make it like list
		response += `
Четвъртък:` + items.filter((el) => el.dayOfWeek === 3).map((el) => {
			let start = this.getDate(el.start);
			let end = this.getDate(el.end);
			return `
${start.hours}:${start.minutes} - ${end.hours}:${end.minutes} - ${el.title} - ${el.description}`
		}).join('');
		return response;
	}

	makeFri(items) {
		let response = ``;
		// TODO Make it like list
		response += `
Петък:` + items.filter((el) => el.dayOfWeek === 4).map((el) => {
			let start = this.getDate(el.start);
			let end = this.getDate(el.end);
			return `
${start.hours}:${start.minutes} - ${end.hours}:${end.minutes} - ${el.title} - ${el.description}`
		}).join('');
		return response;
	}
}