import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksComponent } from './links.component';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open link in new tab', () => {
    const spy = spyOn(window, 'open');
    const testUrl = 'https://test.com';
    component.openLink(testUrl);
    expect(spy).toHaveBeenCalledWith(testUrl, '_blank');
  });
});
