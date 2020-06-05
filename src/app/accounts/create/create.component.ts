import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WalletService } from 'src/app/services/wallet.service';
import { StorageService } from 'src/app/services/storage.service';

import { LocalStorageKeysEnum } from 'src/app/models/local-storage-keys.enum';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private storageService: StorageService,
    private router: Router
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
  }

  download() {
    const blob = new Blob([this.form.controls.mneumonic.value], { type: 'application/octet-stream'});
    const url = window.URL.createObjectURL(blob);
  }

  print() {

  }

  confirmation() {
    this.router.navigate(['/accounts/create-confirmation']);
  }
}
