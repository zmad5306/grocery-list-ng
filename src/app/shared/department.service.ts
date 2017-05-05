import { Injectable } from '@angular/core';

import { ActionReducer, Action } from '@ngrx/store';

import { Department } from './department';

export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
export const REMOVE_DEPARTMENT = 'REMOVE_DEPARTMENT';

@Injectable()
export class DepartmentService {
  constructor() {}
}

export function departmentReducer(state: Array<Department> = [new Department('Produce'), new Department('Meat')], action: Action) {
	switch (action.type) {
		case ADD_DEPARTMENT:
      return [...state, action.payload];
    case REMOVE_DEPARTMENT: 
      var index = state.indexOf(action.payload);
      if (index > -1) {
         let depts = [...state];
         depts.splice(index, 1);
         return depts;
      }
      return state;
		default:
			return state;
	}
}
