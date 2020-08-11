import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInfoPage } from './health-info.page';

describe('HealthInfoPage', () => {
  let component: HealthInfoPage;
  let fixture: ComponentFixture<HealthInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
