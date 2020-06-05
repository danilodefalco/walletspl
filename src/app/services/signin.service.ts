import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';
import { LocalStorageKeysEnum } from '../models/local-storage-keys.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SigninService {
    private _address = new BehaviorSubject<string>('');

    constructor(
        private storageService: StorageService
    ) { }

    get address() {
        return this._address.asObservable();
    }

    setAddress(address) {
        this.storageService.setLocalStorage(LocalStorageKeysEnum.address, address);
    }

    setPassword(password){
        this.storageService.setLocalStorage(LocalStorageKeysEnum.password, password);
    }

    clearLocalStorageLogout() {
        this.storageService.removeLocalStorage(LocalStorageKeysEnum.address);
        this.storageService.removeLocalStorage(LocalStorageKeysEnum.password);
    }

    updateAddressStore() {
        const address = this.storageService.getLocalStorage(LocalStorageKeysEnum.address);
        this._address.next(this.storageService.getLocalStorage(LocalStorageKeysEnum.address));
    }

    
}