import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    @ViewChild('table') table: any;

    public rows = [];
    public dataTable: DataTable;

    ngOnInit() {
        this.dataTable = new DataTable();
    }

    ionViewWillEnter() {

        this.dataTable = new DataTable();
        this.dataTable.page.limit = 5;
        this.dataTable.page.skip = 0;
        this.setPage({ offset: 0 });
    }

    public getRows() {

        // Mimic API call with delay.
        of(null).pipe(
            delay(100),
            map(() => {
                let data = JSON.parse('[{"id":"1", "name":"Row 1"}, {"id":"2", "name":"Row 2"}, {"id":"3", "name":"Row 3"}, {"id":"4", "name":"Row 4"}, {"id":"5", "name":"Row 5"}, {"id":"6", "name":"Row 6"}, {"id":"7", "name":"Row 7"}, {"id":"8", "name":"Row 8"}, {"id":"9", "name":"Row 9"}, {"id":"10", "name":"Row 10"}]');
                return data.slice(this.dataTable.page.offset * 5, this.dataTable.page.offset * 5 + 5);

            }) 
        ).subscribe(data => {
            this.rows = data;
            
            this.dataTable.page.skip = this.dataTable.page.offset * 5;
            this.dataTable.page.count = 10;
        })
    }

    public getId(row) {
        return row.id;
    }

    onSelect({ selected }) {
        console.log('selected', selected);
        this.dataTable.selected.splice(0, this.dataTable.selected.splice.length);
        this.dataTable.selected.push(...selected);
    }

    setPage(event) {
        this.dataTable.page.offset = event.offset;
        this.getRows();
    }
}

export class DataTable {

    public selected: any[] = new Array;
    public page = new DataTable.Page();

    constructor() { }
}

export namespace DataTable {

    export class Page {
        limit: number = 0;
        offset: number = 0;
        skip: number = 0;
        count: number = 0;
    }
}
