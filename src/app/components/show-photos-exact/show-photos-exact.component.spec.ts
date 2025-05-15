import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhotosExactComponent } from './show-photos-exact.component';

describe('ShowPhotosExactComponent', () => {
  let component: ShowPhotosExactComponent;
  let fixture: ComponentFixture<ShowPhotosExactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPhotosExactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPhotosExactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
