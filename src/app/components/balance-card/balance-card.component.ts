import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SmartContractService } from 'src/app/services/smart-contract.service';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.css']
})
export class BalanceCardComponent implements OnInit {

  balanceEther: string;
  balanceErc20: number;

  constructor(
    private smartContractService: SmartContractService
  ) { }

  ngOnInit(): void {
    this.smartContractService.balanceEther.subscribe(
      (balanceEther) => {
        this.balanceEther = balanceEther;
      });

    this.smartContractService.balanceErc20.subscribe(
      (balanceErc20) => {
        this.balanceErc20 = balanceErc20;
      });

    this.smartContractService.updateBalanceErc20();
    this.smartContractService.updateBalanceEther();
  }

  updateBalance() {
    this.smartContractService.updateBalanceErc20();
    this.smartContractService.updateBalanceEther();
  }

}
