import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrolleesService } from './enrollees.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollees',
  templateUrl: './enrollees.component.html',
  styleUrls: ['./enrollees.component.scss']
})

export class EnrolleesComponent implements OnInit {
  listOfEnrollees: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'dateOfBirth', 'active', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;

  constructor(
    private _enrolleesService: EnrolleesService,
    private _router: Router) 
    { }

  ngOnInit(): void {
    this.getEnrollees();
  }

  getEnrollees() {
    this._enrolleesService.getEnrollees().subscribe((enrollees) => {
      let totalEnrollees = enrollees;
      console.log(enrollees)
      this.listOfEnrollees = new MatTableDataSource(totalEnrollees);
      this.listOfEnrollees.paginator = this.paginator;
      this.listOfEnrollees.sort = this.sort;
    });
  }

  getEnrolleeById(id: number) {
    this._router.navigate(['/enrollees',id])
  }

  filter() {
    console.log()
    // if (this.searchKey.trim().toLowerCase() === 'activated') {
    //   this.searchKey = 'true';
    // }
    this.listOfEnrollees.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.filter();
  }

}
