import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { SigninService } from '../services/signin.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SmartContractService } from '../services/smart-contract.service';
import { WalletService } from '../services/wallet.service';
import { SecurityService } from '../services/security.service';
import { StorageService } from '../services/storage.service';
import { LocalStorageKeysEnum } from '../models/local-storage-keys.enum';

@Component({
  selector: 'pages-app-root',
  templateUrl: './pages.app.component.html',
  styleUrls: ['./pages.app.component.css']
})
export class PagesAppComponent implements OnInit {
  isToogled: boolean;
  address: Observable<string>;

  constructor(
    private sidebarService: SidebarService,
    private signinService: SigninService,
    private smartContractService: SmartContractService,
    private walletService: WalletService,
    private securityService: SecurityService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signinService.updateAddressStore();

    const encryptedPassword = this.storageService.getLocalStorage(LocalStorageKeysEnum.password);
    const encryptWallet = this.walletService.getFromStorage();

    this.walletService.decrypt(
      encryptWallet,
      this.securityService.decypt(encryptedPassword))
      .then(
        wallet => {
          this.smartContractService.instanceContract(wallet.privateKey);
        }).catch(
          error => console.error(error));

    this.signinService.address.subscribe(address => {
      if (!address)
        this.router.navigate(['/accounts/signin']);
    });

    this.sidebarService.currentState.subscribe(a => this.isToogled = a);
  }
}