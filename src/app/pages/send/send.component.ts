import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { SmartContractService } from 'src/app/services/smart-contract.service';
import { SendModel } from 'src/app/models/send.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  form: FormGroup;
  model: SendModel;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private smartContractService: SmartContractService
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, CustomValidators.number]],
      toAddress: ['', [Validators.required, CustomValidators.rangeLength([42, 42])]]
    });
  }

  ngOnInit(): void {
  }

  async send() {
    try {
      this.spinner.show();
      this.model = Object.assign({}, this.form.value);

      this.smartContractService.transfer(
        this.model.toAddress,
        this.model.amount);

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
      this.toastrService.error('Error', 'Error to send transaction!', {
        progressBar: true
      });
    }
  }
}