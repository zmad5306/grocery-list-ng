import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationStrategy } from '@angular/common';

describe('AppComponent', () => {
  it('should create the app', async(() => {
    expect(1).toBe(1);
    expect(false).toBeTruthy();
  }));
});
