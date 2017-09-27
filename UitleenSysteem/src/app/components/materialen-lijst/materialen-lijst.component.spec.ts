import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialenLijstComponent } from './materialen-lijst.component';

describe('MaterialenLijstComponent', () => {
  let component: MaterialenLijstComponent;
  let fixture: ComponentFixture<MaterialenLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialenLijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialenLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
