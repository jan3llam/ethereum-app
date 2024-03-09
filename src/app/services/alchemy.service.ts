import { Injectable } from '@angular/core';
import { Network, Alchemy } from 'alchemy-sdk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {
  private alchemy: Alchemy | null = null;

  constructor() {
    const apiKey = environment.ALCHEMY_API_KEY;
    const network = Network.ETH_MAINNET;

    if (apiKey && network) {
      this.alchemy = new Alchemy({ apiKey, network });
    } else {
      console.warn('Alchemy service: missing API key or network');
    }
  }

  async getLatestBlockNumber(): Promise<number | null> {
    if (!this.alchemy) {
      return null;
    }

    try {
      const latestBlock = await this.alchemy.core.getBlockNumber();
      return latestBlock;
    } catch (error) {
      console.error('Error fetching block number:', error);
      return null;
    }
  }

  async getBalanceOf<T extends { tokenBalance: any }>(ownerAddress: string, tokenContract: string): Promise<T['tokenBalance'] | null> {
    if (!this.alchemy) {
      return null;
    }

    try {
      const tokenBalance = await this.alchemy.core.getTokenBalances(ownerAddress, [tokenContract]);

      return tokenBalance.tokenBalances[0]?.tokenBalance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  }
}
