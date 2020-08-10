import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SendModel } from 'src/app/models/send.model';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/token.service';
import { validateAddress } from 'src/app/utils/address.util';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-token-send',
  templateUrl: './token-send.component.html',
  styleUrls: ['./token-send.component.css']
})
export class TokenSendComponent implements OnInit {

  id: number;

  form: FormGroup;
  model: SendModel;

  address: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private signinService: SigninService
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, CustomValidators.number]],
      toAddress: ['', [Validators.required, CustomValidators.rangeLength([42, 42])]]
    });

    this.signinService.address.subscribe((address) => {
      this.address = address
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }

  async send() {
    try {
      this.spinner.show();

      this.model = Object.assign({}, this.form.value);

      if (!validateAddress(this.model.toAddress)) {
        this.toastrService.error('Error', 'To address is a invalid address!', {
          progressBar: true
        });
        return;
      }

      const balance = await this.tokenService.getBalanceById(this.id, this.address);
      if (this.model.amount > Number(balance)) {
        const toastr =this.toastrService.error('Error', 'Insufficient funds!', {
          progressBar: true
        });
        toastr.onHidden.subscribe(() => {
          this.spinner.hide();
        });
        return;
      }

      const result = await this.tokenService.send(
        this.id,
        this.model.toAddress,
        this.model.amount);

      console.log(result);

      const toastr = this.toastrService.success('Success', 'Transaction sended!', {
        progressBar: true
      });

      if (toastr) {
        toastr.onHidden.subscribe(() => {
          this.form.reset();
          this.spinner.hide();
        });
      }
    } catch (err) {
      console.log(err);
      const toastr = this.toastrService.error('Error', 'Error to send transaction!', {
        progressBar: true
      });
      if (toastr) {
        toastr.onHidden.subscribe(() => {
          this.spinner.hide();
        });
      }
    }
  }
}