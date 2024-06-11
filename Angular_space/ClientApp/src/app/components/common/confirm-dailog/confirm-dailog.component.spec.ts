import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDailogComponent } from './confirm-dailog.component';

describe('ConfirmDailogComponent', () => {
  let component: ConfirmDailogComponent;
  let fixture: ComponentFixture<ConfirmDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDailogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
