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
      return state.filter(element => element !== action.payload);
		default:
			return state;
	}
}
