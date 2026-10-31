import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuzzwordsComponent } from './buzzwords.component';

describe('BuzzwordsComponent', () => {
  let component: BuzzwordsComponent;
  let fixture: ComponentFixture<BuzzwordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuzzwordsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuzzwordsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
