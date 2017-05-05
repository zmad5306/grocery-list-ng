import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ADD_DEPARTMENT } from './../shared/list.service';
import { Department } from '../shared/department';
import { Item } from '../shared/item';

interface AppState {
  list: Map<Department, Array<Item>>;
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  list: Observable<Map<Department, Array<Item>>>;

 constructor(private store: Store<AppState>){
		this.list = store.select('list');
	}

  ngOnInit() {
  }

  add(name: string) {
    this.store.dispatch({ type: ADD_DEPARTMENT, payload: new Department(name) });
  }

}
