import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentSelectorComponent } from './list/department-selector/department-selector.component';
import { ItemComponent } from './list/item/item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { appRoutes } from './app.routes';
import { listReducer } from './shared/list.service';
import { DepartmentComponent } from './departments/department/department.component';
import { MapValuesPipe } from './shared/map-values.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatMenuModule, MatButtonModule, MatTabsModule, MatInputModule,
  MatCheckboxModule, MatListModule, MatSelectModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DepartmentsComponent,
    DepartmentSelectorComponent,
    ItemComponent,
    PageNotFoundComponent,
    DepartmentComponent,
    MapValuesPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    appRoutes,
    StoreModule.forRoot(
      { list: listReducer }
    ),
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    // StoreDevtoolsModule.instrumentOnlyWithExtension({
    //   maxAge: 20
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
