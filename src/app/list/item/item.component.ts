import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { REMOVE_ITEM, TOGGLE_ITEM } from './../../shared/list.service';

import { Item } from './../../shared/item';
import { Department } from './../../shared/department';

interface AppState {
  list: Map<Department, Item[]>;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;
  @Input() department: Department;

  constructor(private store: Store<AppState>){}

  ngOnInit() {
  }

  remove(item: Item) {
    this.store.dispatch({ 
      type: REMOVE_ITEM
      , payload: {
        item: item, 
        department: this.department 
      }
    });
  }

  toggle(item: Item) {
    this.store.dispatch({ 
      type: TOGGLE_ITEM, 
      payload: {
        item:item, 
        department: this.department
      } 
    });
  }

}
