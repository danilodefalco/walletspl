import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SigninService } from 'src/app/services/signin.service';
import { SmartContractService } from 'src/app/services/smart-contract.service';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent implements OnInit {

  address: Observable<string>;

  constructor(
    private signinService: SigninService,
    private smartContractService: SmartContractService
  ) {

  }

  ngOnInit(): void {
    this.address = this.signinService.address;
  }
}
