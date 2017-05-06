import { Injectable } from '@angular/core';

import { ActionReducer, Action } from '@ngrx/store';

import { Department } from './department';
import { Item } from './item';

const DEPARTMENTS: Array<Department> = new Array<Department>(
  new Department('Produce'),
  new Department('Meat'),
  new Department('Frozen'),
  new Department('Baking', true),
  new Department('Dairy'),
  new Department('Deli'),
);

let LIST: Map<Department, Array<Item>> = new Map<Department, Array<Item>>();

function copyState(state: Map<Department, Array<Item>>): Map<Department, Array<Item>> {
  const toState = new Map<Department, Array<Item>>();
  state.forEach((value: Item[], key: Department) => toState.set(key, [...value]));
  return toState;
}

function sortState(state: Map<Department, Array<Item>>): Map<Department, Array<Item>> {
  let depts: Array<Department> = new Array<Department>();
  state.forEach((value: Item[], key: Department) => depts.push(key));

  depts.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  const toState = new Map<Department, Array<Item>>();
  depts.forEach((value: Department) => {
    toState.set(value, state.get(value));
  });

  return toState;
}

function addItem(state: Map<Department, Array<Item>>, {department, item}): Map<Department, Array<Item>> {
  if (state.has(department)) {
    return sortState(copyState(state).set(department, [...state.get(department), item]));
  }
  return state;
}

function removeItem(state: Map<Department, Array<Item>>, {department, item}): Map<Department, Array<Item>> {
  if (state.has(department)) {
    return sortState(copyState(state).set(department, [...state.get(department).filter(titem => item !== titem)]));
  }
  return state;
}

function toggleItem(state: Map<Department, Array<Item>>, {department, item}): Map<Department, Array<Item>> {
  if (state.has(department)) {
    return sortState(copyState(state).set(department, [...state.get(department).map(titem => {
      if (item !== titem)  {
        return titem;
      }
      return new Item(item.name, !item.done);
    })]));
  }
  return state;
}

function clearList(state: Map<Department, Array<Item>>): Map<Department, Array<Item>> {
  const toState = copyState(state);
  const keys: Array<Department> = new Array<Department>();
  toState.forEach((value: Item[], key: Department) => keys.push(key));
  keys.forEach((value: Department) => toState.set(value, new Array<Item>()));
  return sortState(toState);
}

function removeDepartment(state: Map<Department, Array<Item>>, department): Map<Department, Array<Item>> {
  if (state.has(department)) {
    const toState = copyState(state);
    toState.delete(department);
    return sortState(toState);
  }
  return state;
}

function addDepartment(state: Map<Department, Array<Item>>, department): Map<Department, Array<Item>> {
  return sortState(copyState(state).set(department, new Array<Item>()));
}

function selectDepartment(state: Map<Department, Array<Item>>, department): Map<Department, Array<Item>> {
  const toState: Map<Department, Array<Item>> = copyState(state);
    let prevSelectedDept: Department;

    //find previously selected and rebuild entry in map
    //marking department unselected
    toState.forEach((value: Item[], key: Department) => {
      if (key.selected) {
        prevSelectedDept = key;
      }
    });

    if(prevSelectedDept) {
      const items: Array<Item> = toState.get(prevSelectedDept);
      toState.delete(prevSelectedDept);
      toState.set(new Department(prevSelectedDept.name, false), items);  
    }

    //find new selected and rebuild entry in map
    //marking new department selected
    const items: Array<Item> = toState.get(department);
    toState.delete(department);
    toState.set(new Department(department.name, true), items);

    return sortState(toState);
}

function clearDepartment(state: Map<Department, Array<Item>>, department): Map<Department, Array<Item>> {
  return sortState(copyState(state).set(department, new Array<Item>()));
}

/////////////////////////////////////////////////////////////////////////////////////////////
//                      TODO remove this, its just for testing...
(function() {
  DEPARTMENTS.forEach((department: Department) => LIST.set(department, new Array<Item>(
    new Item(department.name + ' item1', false),
    new Item(department.name + ' item2', false),
    new Item(department.name + ' item3', false),
    new Item(department.name + ' item4', false),
    new Item(department.name + ' item5', false),
    new Item(department.name + ' item6', false),
  )));
  LIST = sortState(LIST);
})();
/////////////////////////////////////////////////////////////////////////////////////////////

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const CLEAR_LIST = 'CLEAR_LIST';
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
export const REMOVE_DEPARTMENT = 'REMOVE_DEPARTMENT';
export const SELECT_DEPARTMENT = 'SELECT_DEPARTMENT';
export const CLEAR_DEPARTMENT = 'CLEAR_DEPARTMENT';

@Injectable()
export class ListService {
  constructor() { }
}

export function listReducer(state: Map<Department, Array<Item>> = LIST, action: Action) {
	switch (action.type) {

		case ADD_ITEM:
      return addItem(state, action.payload);

    case REMOVE_ITEM: 
      return removeItem(state, action.payload);

    case TOGGLE_ITEM: 
      return toggleItem(state, action.payload);

    case CLEAR_LIST:
      return clearList(state);

    case ADD_DEPARTMENT:
      return addDepartment(state, action.payload);
      
    case REMOVE_DEPARTMENT:
      return removeDepartment(state, action.payload);

    case SELECT_DEPARTMENT:
      return selectDepartment(state, action.payload);

    case CLEAR_DEPARTMENT:
      return clearDepartment(state, action.payload);

		default:
			return state;

	}
}