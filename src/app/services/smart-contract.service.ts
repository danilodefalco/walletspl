import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { SigninService } from './signin.service';

@Injectable({
    providedIn: 'root',
})
export class SmartContractService {
    private _provider = new BehaviorSubject<any>(null);
    private _contractInstance = new BehaviorSubject<any>(null);

    private _balanceEther = new BehaviorSubject<string>(null);
    private _balanceErc20 = new BehaviorSubject<number>(null);

    constructor(
        private signInService: SigninService
    ) {
    }

    get provider() {
        return this._provider.asObservable();
    }

    get contractInstance() {
        return this._contractInstance.asObservable();
    }

    get balanceEther() {
        return this._balanceEther.asObservable();
    }

    get balanceErc20() {
        return this._balanceErc20.asObservable();
    }

    createProvider() {
        let provider;

        if (!environment.blockchainNode.rinkeby)
            provider = new ethers.providers.JsonRpcProvider(`${environment.blockchainNode.provider}://${environment.blockchainNode.host}:${environment.blockchainNode.port}`);
        else
            provider = ethers.getDefaultProvider('rinkeby');
        this._provider.next(provider);
    }

    updateBalanceEther() {
        this.signInService.address.subscribe(
            (address) => {
                this.provider.subscribe(
                    (provider) => {
                        provider
                            .getBalance(address)
                            .then(balance => {
                                const balanceEther = ethers.utils.formatEther(balance);
                                this._balanceEther.next(balanceEther);
                            })
                            .catch((error) => {
                                console.error(error);
                                this._balanceEther.next('0');
                            });
                    },
                    (error) => console.error(error));
            },
            (error) => console.error(error));
    }

    instanceContract(pk) {
        this.provider.subscribe(
            (provider) => {
                const wallet = new ethers.Wallet(pk, provider);

                const contractInstance = new ethers.Contract(
                    environment.smartContract.address,
                    environment.smartContract.abi,
                    wallet);

                this._contractInstance.next(contractInstance);
            },
            (error) => console.error(error));
    }

    transfer(to: string, value: number) {
        const overrides = { gasLimit: 8000000 }
        this.contractInstance.subscribe(
            (contractInstance) => {
                contractInstance.transfer(to, value, overrides)
                    .then(() => {
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            (error) => console.error(error));
    }

    updateBalanceErc20() {
        this.signInService.address.subscribe(
            (address) => {
                this.contractInstance.subscribe(
                    (contractInstance) => {
                        contractInstance.balanceOf(address)
                            .then(result => {
                                this._balanceErc20.next(Number(result));
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    },
                    (error) => console.error(error));
            },
            (error) => console.error(error));
    }
}