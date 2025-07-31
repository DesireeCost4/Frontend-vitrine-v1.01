import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatClothesComponent } from './cat-clothes.component';

describe('CatClothesComponent', () => {
  let component: CatClothesComponent;
  let fixture: ComponentFixture<CatClothesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatClothesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
