import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsdtBalanceComponent } from './usdt-balance.component';
import { AlchemyService } from '../../services/alchemy.service';
import { fakeAsync} from '@angular/core/testing';


describe('UsdtBalanceComponent', () => {
  let component: UsdtBalanceComponent;
  let alchemyService: AlchemyService;
  let fixture: ComponentFixture<UsdtBalanceComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(UsdtBalanceComponent);
    component = fixture.componentInstance;
    alchemyService = TestBed.inject(AlchemyService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display the USDT balance', fakeAsync(async () => {
    const mockOwnerAddress = '0xF977814e90dA44bFA03b6295A0616a897441aceC';
    const mockTokenContract = '0xABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
    const mockTokenBalance = '1000';
    spyOn<any>(alchemyService, 'getBalanceOf').and.returnValue(Promise.resolve({
      tokenBalances: [{ tokenBalance: mockTokenBalance }]
    }));

    const balanceData = await alchemyService.getBalanceOf<any>(mockOwnerAddress, mockTokenContract);
    const balance = balanceData.tokenBalances[0].tokenBalance; // Access the tokenBalance property
    expect(balance).toBe(mockTokenBalance);
  }));

});
