import { Component, Input, ViewChild, ContentChildren, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef } from '@angular/material/table';

@Component({
    selector: 'app-inforce-table',
    templateUrl: './inforce-table.component.html',
    styleUrls: ['./inforce-table.component.css']
})

export class InforceTableComponent {
    @Input() columns: Array<Column> = [];
    @Input() hasOpenIcon = false;
    @Input() hasPreviewIcon = false;
    @Input() hasDeleteIcon = false;
    @Input() onOpen = (el) => console.log('Open handler not implemented');
    @Input() onEdit = (el) => console.log('Edit handler not implemented');
    @Input() onDelete = (el) => console.log('Delete handler not implemented');
    @Input() set dataSource(value) {
        this._dataSource = new MatTableDataSource(value);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<{}>;
    @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

    ngAfterContentInit() {
        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    }

    _columns;
    _dataSource;

    filter() {
        return this.columns.map((el) => el.elementAttribute);
    }

    public accessNestedProperty(obj: Object, prop: string) {
        const index = prop.indexOf('.');

        if(typeof obj === 'undefined') {
            return;
        }

        if (index > -1) {
            return this.accessNestedProperty(obj[prop.substring(0, index)], prop.substr(index + 1));
        }

        return obj[prop];
    }
}

export interface Column {
    label: string;
    elementAttribute: string;
    isProjected: boolean;
    hidden: boolean;
    iconColumn: boolean;
    options?: Array<string>;
    formatFn?;
}