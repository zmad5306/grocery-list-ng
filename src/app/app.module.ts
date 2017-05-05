import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentSelectorComponent } from './list/department-selector/department-selector.component';
import { ItemComponent } from './list/item/item.component';
import { DepartmentComponent } from './departments/department/department.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DepartmentsComponent,
    DepartmentSelectorComponent,
    ItemComponent,
    DepartmentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    appRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
