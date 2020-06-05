import { Component, OnInit } from "@angular/core";
import { SmartContractService } from '../services/smart-contract.service';

@Component({
    selector: 'account-app-root',
    templateUrl: './account.app.component.html'
})
export class AccountAppComponent implements OnInit {

    constructor(
        private smartContractService: SmartContractService
    ) { }
    ngOnInit(): void {
        this.smartContractService.createProvider();
    }
}