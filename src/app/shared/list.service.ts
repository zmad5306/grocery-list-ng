import { Injectable } from '@angular/core';

import { ActionReducer, Action } from '@ngrx/store';

import { Department } from './department';
import { Item } from './item';

const LIST = new Map<Department, Array<Item>>([
  [new Department('Produce'), new Array<Item>()],
  [new Department('Dairy'), new Array<Item>()],
  [new Department('Frozen'), new Array<Item>()],
  [new Department('Cereal'), new Array<Item>()],
  [new Department('Snacks'), new Array<Item>()],
  [new Department('Meat'), new Array<Item>()],
]);

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

function copyState(state: Map<Department, Array<Item>>): Map<Department, Array<Item>> {
  const daState = new Map<Department, Array<Item>>();
  state.forEach((value: Item[], key: Department) => daState.set(key, [...value]));
  return daState;
}

export function listReducer(state: Map<Department, Array<Item>> = LIST, action: Action) {
	switch (action.type) {

		case ADD_ITEM:
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.depatrment, [...state.get(action.payload.department), action.payload])
      }
      return state;

    case REMOVE_ITEM: 
      if (state.has(action.payload.department)) {
        return copyState(state).set(action.payload.depatrment, [...state.get(action.payload.department).filter(item => item !== action.payload)])
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