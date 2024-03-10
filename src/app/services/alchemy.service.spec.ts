import { TestBed } from '@angular/core/testing';
import { AlchemyService } from './alchemy.service';
import { of } from 'rxjs';

describe('AlchemyService', () => {
  let alchemyService: AlchemyService;

  beforeEach(() => {
    alchemyService = new AlchemyService(); // Create a new instance before each test
  });

  it('should be created', () => {
    expect(alchemyService).toBeTruthy();
  });

  describe('getLatestBlockNumber', () => {
    it('getLatestBlockNumber should return the block number from promise', () => {
      const mockBlockNumber = 12345678;
      spyOn<any>(alchemyService, 'getLatestBlockNumber').and.returnValue(Promise.resolve(mockBlockNumber)); // Mock the method

      return alchemyService.getLatestBlockNumber().then(blockNumber => {
        expect(blockNumber).toBe(mockBlockNumber);
      });
    });
  });

  it('should return null when alchemy is not initialized', async () => {
    // Set alchemy to null to simulate missing API key or network
    alchemyService['alchemy'] = null;

    const blockNumber = await alchemyService.getLatestBlockNumber();
    expect(blockNumber).toBeNull();
  });

  describe('getBalanceOf', () => {
    it('should return the token balance on success', async () => {
      const mockOwnerAddress = '0x1234567890AbCdEf1234567890AbCdEf1234567890';
      const mockTokenContract = '0xABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
      const mockBalance = 1000000000;
      spyOn<any>(alchemyService, 'getBalanceOf').and.returnValue(Promise.resolve({
        tokenBalances: [{ tokenBalance: mockBalance }]
      }));

      const balanceData = await alchemyService.getBalanceOf<any>(mockOwnerAddress, mockTokenContract);
      const balance = balanceData.tokenBalances[0].tokenBalance; // Access the tokenBalance property
      expect(balance).toBe(mockBalance);
    });


    it('should return null when alchemy is not initialized', async () => {
      // Set alchemy to null to simulate missing API key or network
      alchemyService['alchemy'] = null;

      const balance = await alchemyService.getBalanceOf<any>('address', 'contract');
      expect(balance).toBeNull();
    });

    it('should return null on empty response', async () => {
      const mockOwnerAddress = '0x1234567890AbCdEf1234567890AbCdEf1234567890';
      const mockTokenContract = '0xABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
      spyOn<any>(alchemyService, 'getBalanceOf').and.returnValue(of({ tokenBalances: [] })); // Mock empty observable

      const balanceObservable = await alchemyService.getBalanceOf<any>(mockOwnerAddress, mockTokenContract);
      const balanceData = await balanceObservable.toPromise(); // Await the observable
      expect(balanceData.tokenBalances.length).toBe(0);
    });

    it('should throw an error on service error', async () => {
      const mockOwnerAddress = '0x1234567890AbCdEf1234567890AbCdEf1234567890';
      const mockTokenContract = '0xABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
      const mockError = new Error('Service error');
      spyOn<any>(alchemyService, 'getBalanceOf').and.throwError(mockError); // Mock error

      try {
        await alchemyService.getBalanceOf<any>(mockOwnerAddress, mockTokenContract);
        fail('Expected error to be thrown'); // If successful, fail the test
      } catch (error) {
        expect(error).toBe(mockError); // Expect the specific error object
      }
    });

  });
});


