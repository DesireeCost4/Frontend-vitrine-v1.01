import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatShoesComponent } from './cat-shoes.component';

describe('CatShoesComponent', () => {
  let component: CatShoesComponent;
  let fixture: ComponentFixture<CatShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatShoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
