import { Injectable } from '@angular/core';

import { ActionReducer, Action } from '@ngrx/store';

import { Department } from './department';
import { Item } from './item';

const DEPARTMENTS: Array<Department> = new Array<Department>(
  new Department('Produce', true),
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

//TODO remove this, its just for testing...
(function() {
  DEPARTMENTS.forEach((department: Department) => LIST.set(department, new Array<Item>(
    new Item(department.name + ' item1', false),
    new Item(department.name + ' item2', false),
    new Item(department.name + ' item3', false),
    new Item(department.name + ' item4', false),
    new Item(department.name + ' item5', false),
    new Item(department.name + ' item6', false),
  )));
})();

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const CLEAR_LIST = 'TOGGLE_ITEM';
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
export const REMOVE_DEPARTMENT = 'REMOVE_DEPARTMENT';
export const SELECT_DEPARTMENT = 'SELECT_DEPARTMENT';

@Injectable()
export class ListService {
  constructor() { }
}

export function listReducer(state: Map<Department, Array<Item>> = LIST, action: Action) {
	switch (action.type) {

		case ADD_ITEM:
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.department, [...state.get(action.payload.department), action.payload.item])
      }
      return state;

    case REMOVE_ITEM: 
      console.log(REMOVE_ITEM, action.payload.item, action.payload.department);
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.department, [...state.get(action.payload.department).filter(item => item !== action.payload.item)])
      }
      return state;

    case TOGGLE_ITEM: 
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.department, [...state.get(action.payload.department).map(item => {
          if (item !== action.payload)  {
            return item;
          }
          return new Item(item.name, !item.done);
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

    case SELECT_DEPARTMENT:
      const daState: Map<Department, Array<Item>> = copyState(state);
      let prevSelectedDept: Department;

      //find previously selected and rebuild entry in map
      //marking department unselected
      daState.forEach((value: Item[], key: Department) => {
        if (key.selected) {
          prevSelectedDept = key;
        }
      });

      if(prevSelectedDept) {
        const items: Array<Item> = daState.get(prevSelectedDept);
        daState.delete(prevSelectedDept);
        daState.set(new Department(prevSelectedDept.name, false), items);  
      }

      //find new selected and rebuild entry in map
      //marking new department selected
      const items: Array<Item> = daState.get(action.payload);
      daState.delete(action.payload);
      daState.set(new Department(action.payload.name, true), items);

      return daState;

		default:
			return state;

	}
}