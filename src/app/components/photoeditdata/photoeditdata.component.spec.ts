import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoeditdataComponent } from './photoeditdata.component';

describe('PhotoeditdataComponent', () => {
  let component: PhotoeditdataComponent;
  let fixture: ComponentFixture<PhotoeditdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoeditdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoeditdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
