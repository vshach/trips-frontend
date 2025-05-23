import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsComponent } from './stops.component';

describe('StopsComponent', () => {
  let component: StopsComponent;
  let fixture: ComponentFixture<StopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
