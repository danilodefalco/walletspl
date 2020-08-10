import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import { CustomValidators } from 'ngx-custom-validators';
import { WalletService } from 'src/app/services/wallet.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SigninService } from 'src/app/services/signin.service';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { provider } from 'src/app/services/ethers.service';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  form: FormGroup;
  password: string;

  constructor(
    @Inject(provider) private ethersProvider: ethers.providers.Web3Provider,
    private contractService: ContractService,
    private fb: FormBuilder,
    private walletService: WalletService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private signinService: SigninService,
    private router: Router,
    private securityService: SecurityService,
    private tokenService: TokenService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  async signin() {
    try {
      this.ethersProvider = await this.ethersProvider;

      this.spinner.show();

      this.password = this.form.controls.password.value;

      const encryptWallet = this.walletService.getFromStorage();

      if (!encryptWallet) {
        const toastr = this.toastrService.error('Error', 'Wallet do not exists, create or restore one!', {
          progressBar: true
        });

        if (toastr)
          toastr.onHidden.subscribe(() => {
            this.spinner.hide();
          });

        return;
      }

      const wallet = await this.walletService.decrypt(encryptWallet, this.password);

      this.signinService.setAddress(wallet.address);

      this.signinService.setPassword(this.password);

      if (!this.tokenService.exists()) {
        console.log('not exists')
        await this.tokenService.initiate();
      }

      this.spinner.hide();

      this.router.navigate(['/pages/home']);

    } catch (err) {
      console.error(err);
      const toastr = this.toastrService.error('Error', 'Error to log in!', {
        progressBar: true
      });

      if (toastr)
        toastr.onHidden.subscribe(() => {
          this.spinner.hide();
        });
    }
  }
}
