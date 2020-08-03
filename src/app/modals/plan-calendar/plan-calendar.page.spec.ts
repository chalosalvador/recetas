import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanCalendarPage } from './plan-calendar.page';

describe('PlanCalendarPage', () => {
  let component: PlanCalendarPage;
  let fixture: ComponentFixture<PlanCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
