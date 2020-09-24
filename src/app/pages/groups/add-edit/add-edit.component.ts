import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.scss']
})

export class AddEditComponent {

	cameras = [];

	constructor(public dialogRef: MatDialogRef<AddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
		console.log(data);
	}

	onYesClick() {
		this.dialogRef.close(this.data);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onSelectChange(e) {
		console.log(e);
	}

	addHour(dayOfWeek) {
		this.data.item[dayOfWeek].push({
			start: '08:00',
			end: '09:00',
			dayOfWeek: this.getDayOfWeek(dayOfWeek),
			title: '',
			description: '',
			camera: '',
		});
	}

	getDayOfWeek(dayOfWeek) {
		switch(dayOfWeek) {
			case 'mon':
				return 0;
			case 'tue':
				return 1;
			case 'wed':
				return 2;
			case 'thu':
				return 3;
			case 'fri':
				return 4;
			case 'sat':
				return 5;
			case 'sun':
				return 6;
		}
	}

	removeHour(dayOfWeek, index) {
		this.data.item[dayOfWeek].splice(index, 1);
	}
}