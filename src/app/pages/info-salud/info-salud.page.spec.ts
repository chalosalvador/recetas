import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSaludPage } from './info-salud.page';

describe('InfoSaludPage', () => {
  let component: InfoSaludPage;
  let fixture: ComponentFixture<InfoSaludPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSaludPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
