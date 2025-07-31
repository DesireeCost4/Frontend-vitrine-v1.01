import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDestaquesComponent } from './cat-destaques.component';

describe('CatDestaquesComponent', () => {
  let component: CatDestaquesComponent;
  let fixture: ComponentFixture<CatDestaquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatDestaquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatDestaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
