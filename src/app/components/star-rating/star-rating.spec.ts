import { ComponentFixture, TestBed } from '@angular/core/testing';


import { StarRating } from './star-rating';

describe('StarRating', () => {
  let component: StarRating;
  let fixture: ComponentFixture<StarRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRating);

    fixture.componentRef.setInput('rating', 3.5);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
