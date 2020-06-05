import { ethers } from 'ethers';
import { LocalStorageKeysEnum } from '../models/local-storage-keys.enum';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WalletService {

    constructor(
        private storageService: StorageService
    ) {

    }
    create() {
        return ethers.Wallet.createRandom();
    }

    restore(mneumonic) {
        return ethers.Wallet.fromMnemonic(mneumonic);
    }

    async store(wallet, password: string) {
        const encrypted = await wallet.encrypt(password);
        this.storageService.setLocalStorage(LocalStorageKeysEnum.wallet, encrypted);
    }

    getFromStorage() {
        return this.storageService.getLocalStorage(LocalStorageKeysEnum.wallet);
    }

    decrypt(encryptedWallet, password: string) {
        return ethers.Wallet.fromEncryptedJson(encryptedWallet, password);
    }
}