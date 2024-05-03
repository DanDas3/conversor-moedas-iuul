import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoedasComponent } from './moedas.component';

describe('MoedasComponent', () => {
  let component: MoedasComponent;
  let fixture: ComponentFixture<MoedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoedasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
