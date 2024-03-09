import { Component, OnInit } from '@angular/core';
import { AlchemyService } from '../alchemy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-number.component.html',
  styleUrl: './block-number.component.css'
})
export class BlockNumberComponent implements OnInit {
  public blockNumber: number | any;

  constructor(private alchemyService: AlchemyService) {}

  async ngOnInit(): Promise<void> {
    const latestBlock = await this.alchemyService.getLatestBlockNumber();
    if (latestBlock) {
      this.blockNumber = latestBlock;
    }
  }
}
