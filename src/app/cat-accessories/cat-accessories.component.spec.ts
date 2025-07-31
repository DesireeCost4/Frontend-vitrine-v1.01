import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatAccessoriesComponent } from './cat-accessories.component';

describe('CatAccessoriesComponent', () => {
  let component: CatAccessoriesComponent;
  let fixture: ComponentFixture<CatAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatAccessoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
