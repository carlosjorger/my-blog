import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollArrowsComponent } from './horizontal-scroll-arrows.component';

describe('HorizontalScrollArrowsComponent', () => {
  let component: HorizontalScrollArrowsComponent;
  let fixture: ComponentFixture<HorizontalScrollArrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalScrollArrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalScrollArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
