import { Component, OnInit, Inject } from '@angular/core';
import { TokenModel } from 'src/app/models/token.model';
import { ActivatedRoute } from '@angular/router';
import { provider } from 'src/app/services/ethers.service';
import { ethers } from 'ethers';
import { ContractService } from 'src/app/services/contract.service';
import { SigninService } from 'src/app/services/signin.service';
import { TransactionModel } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.css']
})
export class TokenDetailsComponent implements OnInit {

  token: TokenModel = new TokenModel();
  address: string;
  transactions: TransactionModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private signinService: SigninService,
    private tokenService: TokenService,
    private transactionService: TransactionService
  ) { }

  async ngOnInit() {
    this.signinService.address.subscribe((address) => {
      this.address = address
    });
    this.token = this.route.snapshot.data['token'];
    await this.updateTotalSupply();
    this.listTransactions();
  }

  async updateTotalSupply() {
    this.token.totalSupply = await this.tokenService.getTotalSupply(this.token.id);
  }

  listTransactions() {
    this.transactionService
      .getToTransactionByAddress(this.token.address)
      .subscribe((result) => {
        this.transactions = result.transactions;
      });
  }
}
