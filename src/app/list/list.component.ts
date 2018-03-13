import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ADD_ITEM, CLEAR_LIST, SELECT_DEPARTMENT, CLEAR_DEPARTMENT } from './../shared/list.service';
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
  theList: Array<Item> = new Array<Item>();
  department: Department;

  constructor(private store: Store<AppState>) {
    this.list = store.select('list');
  }

  ngOnInit() {
    this.list.subscribe((list: Map<Department, Item[]>) => {
      list.forEach((value: Item[], key: Department) => {
        if (key.selected) {
          this.department = key;
          this.theList = value;
        }
      });
    });
  }

  add(itemName: string) {
    this.store.dispatch({
      type: ADD_ITEM,
      payload: {
        item: new Item(itemName, false),
        department: this.department
      }
    });
  }

  clear() {
    this.store.dispatch({ type: CLEAR_LIST });
  }

  clearDepartment() {
    this.store.dispatch({ type: CLEAR_DEPARTMENT, payload: this.department });
  }

  onDepartmentSelected(department: Department) {
    this.department = department;
    this.store.dispatch({ type: SELECT_DEPARTMENT, payload: department });
  }

}
