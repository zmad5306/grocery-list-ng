import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ADD_DEPARTMENT } from './../shared/department.service';
import { Department } from '../shared/department';

interface AppState {
  departments: Array<Department>;
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: Observable<Array<Department>>;

 constructor(private store: Store<AppState>){
		this.departments = store.select('department');
	}

  ngOnInit() {
  }

  add(name: string) {
    this.store.dispatch({ type: ADD_DEPARTMENT, payload: new Department(name) });
  }



}
