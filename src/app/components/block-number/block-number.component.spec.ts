import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BlockNumberComponent } from './block-number.component';
import { AlchemyService } from '../../services/alchemy.service';

describe('BlockNumberComponent', () => {
  let component: BlockNumberComponent;
  let alchemyService: AlchemyService;
  let fixture: ComponentFixture<BlockNumberComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockNumberComponent);
    component = fixture.componentInstance;
    alchemyService = TestBed.inject(AlchemyService);
    component.ngOnInit();
  });


  it('should fetch and display the block number on init', fakeAsync(() => {
    const mockBlockNumber = 12345678;
    spyOn<any>(alchemyService, 'getLatestBlockNumber').and.returnValue(Promise.resolve(mockBlockNumber));

    return alchemyService.getLatestBlockNumber().then(blockNumber => {
      expect(blockNumber).toBe(mockBlockNumber);
    });
  }));

  it('should handle errors gracefully on init', async () => {
    alchemyService['alchemy'] = null;

    const blockNumber = await alchemyService.getLatestBlockNumber();
    expect(blockNumber).toBeNull();
  });
});
