import { Injectable } from '@angular/core';

import { ActionReducer, Action } from '@ngrx/store';

import { Department } from './department';

export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
export const REMOVE_DEPARTMENT = 'REMOVE_DEPARTMENT';

const DEPARTMETNS = [
  new Department('Produce'), 
  new Department('Dairy'), 
  new Department('Frozen'), 
  new Department('Cereal'), 
  new Department('Snacks'), 
  new Department('Meat')
];

@Injectable()
export class DepartmentService {
  constructor() {}
}

export function departmentReducer(state: Array<Department> = DEPARTMETNS, action: Action) {
	switch (action.type) {
		case ADD_DEPARTMENT:
      return [...state, action.payload];
    case REMOVE_DEPARTMENT: 
      return state.filter(dept => dept !== action.payload);
		default:
			return state;
	}
}
