import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSlideshowComponent } from './img-slideshow.component';

describe('ImgSlideshowComponent', () => {
  let component: ImgSlideshowComponent;
  let fixture: ComponentFixture<ImgSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImgSlideshowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
