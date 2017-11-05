import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCatalogusFormComponent } from './add-to-catalogus-form.component';

describe('AddToCatalogusFormComponent', () => {
  let component: AddToCatalogusFormComponent;
  let fixture: ComponentFixture<AddToCatalogusFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCatalogusFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCatalogusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
