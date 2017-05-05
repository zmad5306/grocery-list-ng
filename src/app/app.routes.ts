import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { 
      path: 'list',
      component: ListComponent,
      data: { title: 'List'}
  },
  { 
      path: 'departments',
      component: DepartmentsComponent,
      data: { title: 'Departments'}
 },
 {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
 },
 {
     path: '**', 
     component: PageNotFoundComponent 
 }
];

export const appRoutes = RouterModule.forRoot(routes);