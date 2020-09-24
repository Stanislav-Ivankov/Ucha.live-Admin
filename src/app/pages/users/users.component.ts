import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEditComponent } from './add-edit/add-edit.component';
import { DetailsComponent } from "./details/details.component";
import { UsersService } from '../../core/services/users.service';
import { GroupsService } from '../../core/services/groups.service';
import { AuthService } from '../../core/services/auth.service';

import Swal from 'sweetalert2'

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
		this.fetchAll();
	}

	columns = [
		// {
		// 	iconColumn: true, 
		// 	elementAttribute: 'positionOpenIcon'
		// },
		{
		  iconColumn: true, 
		  elementAttribute: 'positionEditIcon'
		},
		{
		  label: 'Име',
		  elementAttribute: 'name'
		},
		{
			label: 'Фамилия',
			elementAttribute: 'surname'
		},
		{
			label: 'Клас',
			elementAttribute: 'group',
			formatFn: this.format.bind(this)
		},
		{
			label: 'Потребителско Име',
			elementAttribute: 'username'
		},
		{
			label: 'Парола',
			elementAttribute: 'password'
		},
		{
		  iconColumn: true,
		  elementAttribute: 'positionDeleteIcon'
		},
	];

	users = [];
	groups = [];

	constructor(private changeDetectorRef: ChangeDetectorRef, private usersService: UsersService, private groupService: GroupsService, public dialog: MatDialog, private _authService: AuthService) {}

	fetchAll() {
		this.groupService.getGroups().then((groups: any) => {
			this.groups = groups;
			this.usersService.getUsers().then((users: any) => {
				this.users = users;
				this.changeDetectorRef.detectChanges();
			});
		})
	}

	onAddNew() {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '400px',
			data: {
				item: {
					name: '',
					surname: '',
					group: '',
					username: '',
					password: '',
					salt: '',
					hash: ''
				},
				groups: this.groups
			}
		});

		dialogRef.afterClosed().subscribe(async result => {
			if(!result) return;

			await this.usersService.createUser({
				'name': result.item.name,
				'surname': result.item.surname,
				'group': result.item.group,
				'username': result.item.username,
				'password': result.item.password,
				'salt': '',
				'hash' : ''
			});
			this.fetchAll();
		});
	}

	onOpen(item) {
		this.dialog.open(DetailsComponent, {
			width: '45vw',
			height: '75vh',
			data: { item }
		});
	}

	onEdit(item) {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '500px',
			data: {
				item,
				salt: '',
				hash: '',
				groups: this.groups
			}
		});

		dialogRef.afterClosed().subscribe(async result => {
			if(!result) return;

			await this.usersService.updateUser(result.item);
			this.fetchAll();
		});
	}

	onDelete(item) {
		let id = item._id;
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: 'mat-focus-indicator right mat-button mat-flat-button mat-button-base btn-success',
			  cancelButton: 'mat-focus-indicator right mat-button mat-flat-button mat-button-base btn-danger'
			},
			buttonsStyling: false
		  })

		  swalWithBootstrapButtons.fire({
			title: 'Сигурни Ли Сте ?',
			text: "Няма Да Можете Да Върнете Изтритото !",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Да, Изтрии Го !',
			cancelButtonText: 'Не, Остави Го !',
			reverseButtons: false
		}).then(async result => {
			if (result.value) {
				this.usersService.deleteUser(id, { id: item._id })
				.then(_response => {
					swalWithBootstrapButtons.fire('Deleted!', 'Row is deleted.', 'success');
					this.fetchAll();

				}).catch(e => {
					swalWithBootstrapButtons.fire('Not Deleted!', 'Row was not deleted.', 'error');
				});
			}
		});
	}

	formatMonday(items) {
		// TODO Make it like list
		return this.formatFnBasic(items);
	}

	formatFnBasic(items) {
		let response = '';
		for(let key in items) {
			response += `${ key }: ${ items[key] }, `;
		}
		return response;
	}

	format(classId) {
		let group = this.groups.filter((group) => group._id === classId)[0];
		return group ? group.name : '';
	}
}