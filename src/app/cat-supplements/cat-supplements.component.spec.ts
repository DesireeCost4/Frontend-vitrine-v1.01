import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSupplementsComponent } from './cat-supplements.component';

describe('CatSupplementsComponent', () => {
  let component: CatSupplementsComponent;
  let fixture: ComponentFixture<CatSupplementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatSupplementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatSupplementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
