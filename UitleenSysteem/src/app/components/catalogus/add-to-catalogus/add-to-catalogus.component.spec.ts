import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCatalogusComponent } from './add-to-catalogus.component';

describe('AddToCatalogusComponent', () => {
  let component: AddToCatalogusComponent;
  let fixture: ComponentFixture<AddToCatalogusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCatalogusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCatalogusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
