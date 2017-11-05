import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogusListComponent } from './catalogus-list.component';

describe('CatalogusListComponent', () => {
  let component: CatalogusListComponent;
  let fixture: ComponentFixture<CatalogusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
