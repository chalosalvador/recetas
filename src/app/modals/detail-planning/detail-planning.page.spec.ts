import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPlanningPage } from './detail-planning.page';

describe('DetailPlanningPage', () => {
  let component: DetailPlanningPage;
  let fixture: ComponentFixture<DetailPlanningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPlanningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPlanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
