import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPhotosComponent } from './display-photos.component';

describe('DisplayPhotosComponent', () => {
  let component: DisplayPhotosComponent;
  let fixture: ComponentFixture<DisplayPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
