import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ADD_ITEM, CLEAR_LIST } from './../shared/list.service';
import { Item } from './../shared/item';
import { Department } from './../shared/department';

interface AppState {
  list: Map<Department, Item[]>;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: Observable<Map<Department, Item[]>>;
  department: Department;
  calls: number = 0;

	constructor(private store: Store<AppState>){
    this.list = store.select('list');
	}

  ngOnInit() {
    this.list.subscribe((list: Map<Department, Item[]>) => {
      this.calls++;
      if (!this.department && list.size > 0) {
        this.department = list.keys().next().value;
      }
    });
  }

  add(itemName: string) {
    this.store.dispatch({ type: ADD_ITEM, payload: new Item(itemName, false, this.department) });
  }

  clear() {
    this.store.dispatch({ type: CLEAR_LIST });
  }

  onDepartmentSelected(department: Department) {
    this.department = department;
  }

}