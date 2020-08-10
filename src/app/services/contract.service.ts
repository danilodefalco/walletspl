import { Injectable, Inject } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from '../../environments/environment';
import { WalletService } from './wallet.service';
import { provider } from './ethers.service';

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    constructor(
        @Inject(provider) private ethersProvider: ethers.providers.Web3Provider,
        private walletService: WalletService
    ) {
    }

    public async instanceUnsigneContract(address: string) {
        const provider = await this.ethersProvider;
        return new ethers.Contract(
            address,
            environment.smartContract.abi,
            provider
        );
    }

    public async instanceSignedContract(address: string, password: string) {
        const provider = await this.ethersProvider;
        const encryptWallet = this.walletService.getFromStorage();
        const decryptedWallet = await this.walletService.decrypt(encryptWallet, password);
        const wallet = new ethers.Wallet(decryptedWallet.privateKey, provider);
        return new ethers.Contract(
            address,
            environment.smartContract.abi,
            wallet
        );
    }
}