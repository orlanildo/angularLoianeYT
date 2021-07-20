import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnploadFileComponent } from './unpload-file.component';

describe('UnploadFileComponent', () => {
  let component: UnploadFileComponent;
  let fixture: ComponentFixture<UnploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
