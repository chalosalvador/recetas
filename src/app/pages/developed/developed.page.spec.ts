import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevelopedPage } from './developed.page';

describe('DevelopedPage', () => {
  let component: DevelopedPage;
  let fixture: ComponentFixture<DevelopedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevelopedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
