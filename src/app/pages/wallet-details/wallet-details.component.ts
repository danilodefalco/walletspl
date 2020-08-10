import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExportModel } from 'src/app/models/export.model';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';
import { CustomValidators } from 'ngx-custom-validators';
import { TransactionModel } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit {

  address: string;

 
  loadingPk: boolean = false;
  formExportPk: FormGroup;
  exportModel: ExportModel;
  exportTitle: string;
  exportResult: string;

  transactionsTo: TransactionModel;
  transactionsFrom: TransactionModel;


  constructor(
    private signinService: SigninService,
    
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private walletService: WalletService,
    private transactionService: TransactionService,
    private spinner: NgxSpinnerService
  ) {
    this.formExportPk = this.fb.group({
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
      type: ['Private Key'],
      result: ['']
    });
  }

  ngOnInit(): void {
    this.spinner.show();

    this.signinService.address.subscribe((address) => {
      this.address = address
    });

    this.transactionService.getToTransactionByAddress(this.address)
      .subscribe((result) => {
        this.transactionsTo = result.transactions.slice(0, 5);
      });

    this.transactionService.getFromTransactionByAddress(this.address)
      .subscribe((result) => {
        this.transactionsFrom = result.transactions.slice(0, 5);
      });
      

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  openExportPrivateKeyModal(pkmodal) {
    this.modalService.open(pkmodal);
  }

  async export() {
    try {
      this.loadingPk = true;

      this.exportModel = Object.assign({}, this.formExportPk.value);
      const encryptWallet = this.walletService.getFromStorage();

      if (!encryptWallet) {
        const toastr = this.toastrService.error('Error', 'Wallet do not exists, create or restore one!', {
          progressBar: true
        });

        if (toastr)
          toastr.onHidden.subscribe(() => {
            this.loadingPk = false;
          });

        return;
      }

      const wallet = await this.walletService.decrypt(encryptWallet, this.exportModel.password);

      this.exportTitle = this.exportModel.type;

      if (this.exportTitle == 'Private Key') {
        this.formExportPk.patchValue({
          result: wallet.privateKey
        });
      } else {
        this.formExportPk.patchValue({
          result: wallet.mnemonic.phrase
        });
      }

      this.loadingPk = false;
    } catch (err) {
      const toastr = this.toastrService.error('Error', 'Error to decrypt wallet!', {
        progressBar: true
      });

      if (toastr)
        toastr.onHidden.subscribe(() => {
          this.loadingPk = false;
        });
    }
  }

  clearExportForm() {
    this.formExportPk.reset();
    this.formExportPk.patchValue({
      result: '',
      password: '',
      type: 'Private Key'
    });
    this.exportModel = null;
    this.exportTitle = null;
  }

  copyToClipboard() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.address;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toastrService.success('Success', 'Address copied to clipboard!', {
      progressBar: true
    });
  }
}
