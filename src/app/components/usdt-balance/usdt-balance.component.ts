import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlchemyService } from '../../services/alchemy.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-usdt-balance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './usdt-balance.component.html',
  styleUrl: './usdt-balance.component.css'
})
export class UsdtBalanceComponent implements OnInit {
  public balanceNumber: number | null = null;
  public ownerAddress: string = "";
  public tokenBalance:any | null = null ;

  constructor(private alchemyService: AlchemyService) { }

  ngOnInit() {

  }

  async getBalance(): Promise<void> {
    const tokenContract = environment.TOKEN_CONTRACT;
    const tokenBalances = await this.alchemyService.getBalanceOf(this.ownerAddress, tokenContract)
    if (tokenBalances) {
      this.tokenBalance = "Balance is: " + parseInt(tokenBalances,16);
    }
  }

}
