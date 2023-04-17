import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalDataComponent } from './hierarchical-data.component';

describe('HierarchicalDataComponent', () => {
  let component: HierarchicalDataComponent;
  let fixture: ComponentFixture<HierarchicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchicalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
