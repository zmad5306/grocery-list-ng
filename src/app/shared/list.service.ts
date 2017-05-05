import { Injectable } from '@angular/core';

import { ActionReducer, Action } from '@ngrx/store';

import { Department } from './department';
import { Item } from './item';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const CLEAR_LIST = 'TOGGLE_ITEM';

@Injectable()
export class ListService {
  constructor() { }
}

export function listReducer(state: Map<Department, Item[]> = new Map<Department, Item[]>(), action: Action) {
	switch (action.type) {
		case ADD_ITEM:
        if (!state.has(action.payload.department)) {
            return new Map<Department, Item[]>(state).set(action.payload.department, [action.payload]);
        }
        return new Map<Department, Item[]>(state).set(action.payload.department, [...state.get(action.payload.department), action.payload]);
    case REMOVE_ITEM: 
      if (!state.has(action.payload.department)) {
        var index = state.get(action.payload.department).indexOf(action.payload);
        if (index > -1) {
          return new Map<Department, Item[]>(state).set(action.payload.department, [...state.get(action.payload.department).splice(index, 1)]);
        }
      }
      return state;
    case TOGGLE_ITEM: 
      console.log('toggle item');
      if (!state.has(action.payload.department)) {
        
      }
      return state;
    case CLEAR_LIST:
      console.log('clear list');
		default:
			return state;
	}
}