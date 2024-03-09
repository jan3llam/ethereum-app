import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockNumberComponent } from './block-number.component';

describe('BlockNumberComponent', () => {
  let component: BlockNumberComponent;
  let fixture: ComponentFixture<BlockNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
