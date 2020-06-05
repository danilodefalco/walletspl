import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from 'ngx-custom-validators';
import { WalletService } from 'src/app/services/wallet.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SmartContractService } from 'src/app/services/smart-contract.service';
import { SigninService } from 'src/app/services/signin.service';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  form: FormGroup;
  password: string;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private toastrService: ToastrService,
    private smartContractService: SmartContractService,
    private spinner: NgxSpinnerService,
    private signinService: SigninService,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  async signin() {
    try {
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

      const encryptPassword = this.securityService.encrypt(this.password);
      this.signinService.setPassword(encryptPassword);

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
