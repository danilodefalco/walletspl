import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { WalletService } from 'src/app/services/wallet.service';
import { StorageService } from 'src/app/services/storage.service';

import { LocalStorageKeysEnum } from 'src/app/models/local-storage-keys.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  fileUrl;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private storageService: StorageService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService
  ) {
    this.form = this.fb.group({
      mneumonic: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const wallet = this.walletService.create();

    this.storageService.setLocalStorage(LocalStorageKeysEnum.mneumonic, wallet.mnemonic);

    this.form.patchValue({
      mneumonic: wallet.mnemonic
    });

    const blob = new Blob([wallet.mnemonic], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  copyToClipboard(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.form.controls.mneumonic.value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toastrService.success('Success', 'Address copied to clipboard!', {
      progressBar: true
    });
  }

  confirmation() {
    this.router.navigate(['/accounts/create-confirmation']);
  }
}
