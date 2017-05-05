import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { REMOVE_DEPARTMENT } from './../../shared/department.service';
import { Department } from './../../shared/department';

interface AppState {
  departments: Array<Department>;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @Input() department: Department

  constructor(private store: Store<AppState>){
	}

  ngOnInit() {
  }
  
  remove(department: Department) {
    this.store.dispatch({ type: REMOVE_DEPARTMENT, payload: department });
  }
}
