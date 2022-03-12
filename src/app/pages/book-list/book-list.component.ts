import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource:any = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit () {
    this.dataSource.paginator = this.paginator;
  }
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Test1', weight: 1.0079, symbol: '100'},
  {position: 2, name: 'Test2', weight: 4.0026, symbol: '200'},
  {position: 3, name: 'Test3', weight: 6.941, symbol: '300'},
  {position: 4, name: 'Test4', weight: 9.0122, symbol: '400'},
  {position: 5, name: 'Test5', weight: 10.811, symbol: '500'},
  {position: 6, name: 'Test6', weight: 12.0107, symbol: '600'},
  {position: 7, name: 'Test7', weight: 14.0067, symbol: '700'},
  {position: 8, name: 'Test8', weight: 15.9994, symbol: '800'},
  {position: 9, name: 'Test9', weight: 18.9984, symbol: '900'},
  {position: 10, name: 'Test10', weight: 20.1797, symbol: '1000'},
];

