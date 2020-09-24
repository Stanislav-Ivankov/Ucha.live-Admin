import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from '../../../core/services/groups.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

	constructor(private groupsService: GroupsService, public dialogRef: MatDialogRef<DetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

	details: any;

	ngOnInit() {
		this.groupsService.getGroupById(this.data.item.group).then((groupDetails: any) => {
			this.details = groupDetails;
			console.log(this.details);
		});
	}

	onYesClick() {
		this.dialogRef.close(this.data);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}