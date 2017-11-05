import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaalFormComponent } from './materiaal-form.component';

describe('MateriaalFormComponent', () => {
  let component: MateriaalFormComponent;
  let fixture: ComponentFixture<MateriaalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
