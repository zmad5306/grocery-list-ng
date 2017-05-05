import { Injectable } from '@angular/core';

import { ActionReducer, Action } from '@ngrx/store';

import { Department } from './department';
import { Item } from './item';

const DEPARTMENTS: Array<Department> = new Array<Department>(
  new Department('Produce'),
  new Department('Meat'),
  new Department('Frozen'),
  new Department('Baking'),
  new Department('Dairy'),
  new Department('Deli'),
);

const LIST: Map<Department, Array<Item>> = new Map<Department, Array<Item>>();

function copyState(state: Map<Department, Array<Item>>): Map<Department, Array<Item>> {
  const daState = new Map<Department, Array<Item>>();
  state.forEach((value: Item[], key: Department) => daState.set(key, [...value]));
  return daState;
}

(function() {
  DEPARTMENTS.forEach((department: Department) => LIST.set(department, new Array<Item>(
    new Item('item1', false, department),
    new Item('item2', false, department),
    new Item('item3', false, department),
    new Item('item4', false, department),
    new Item('item5', false, department),
    new Item('item6', false, department),
  )));
})();

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const CLEAR_LIST = 'TOGGLE_ITEM';
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
export const REMOVE_DEPARTMENT = 'REMOVE_DEPARTMENT';

@Injectable()
export class ListService {
  constructor() { }
}

export function listReducer(state: Map<Department, Array<Item>> = LIST, action: Action) {
	switch (action.type) {

		case ADD_ITEM:
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.department, [...state.get(action.payload.department), action.payload])
      }
      return state;

    case REMOVE_ITEM: 
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.department, [...state.get(action.payload.department).filter(item => item !== action.payload)])
      }
      return state;

    case TOGGLE_ITEM: 
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.department, [...state.get(action.payload.department).map(item => {
          if (item !== action.payload)  {
            return item;
          }
          return new Item(item.name, !item.done, item.department);
        })]);
      }
      return state;

    case CLEAR_LIST:
      return copyState(state).forEach(value => value.splice(0));

    case ADD_DEPARTMENT:
      return copyState(state).set(action.payload, new Array<Item>());

    case REMOVE_DEPARTMENT:
      if (state.has(action.payload)) {
        const daState = copyState(state);
        daState.delete(action.payload);
        return daState;
      }
      return state;

		default:
			return state;

	}
}