import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Department } from './../../shared/department';
import { Item } from './../../shared/item';

interface AppState {
  list: Map<Department, Array<Item>>;
}

@Component({
  selector: 'app-department-selector',
  templateUrl: './department-selector.component.html',
  styleUrls: ['./department-selector.component.css']
})
export class DepartmentSelectorComponent implements OnInit {

  list: Observable<Map<Department, Array<Item>>>;
  @Input() department: Department;
  @Output() departmentSelected = new EventEmitter();

  constructor(private store: Store<AppState>) {
    this.list = store.select('list');
  }

  ngOnInit() {
  }

  select(department: Department) {
    this.departmentSelected.emit(department);
    this.department = department;
  }

}
