import { Injectable, Inject } from '@angular/core';
import { ContractService } from './contract.service';
import { TokenModel } from '../models/token.model';
import { StorageService } from './storage.service';
import { LocalStorageKeysEnum } from '../models/local-storage-keys.enum';
import { environment } from 'src/environments/environment';
import { SigninService } from './signin.service';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(
        private storageService: StorageService,
        private contractService: ContractService,
        private signinService: SigninService
    ) { }

    list(): TokenModel[] {
        return this.storageService.getLocalStorage(LocalStorageKeysEnum.tokens);
    }

    async add(address: string) {
        const contractInstance = await this.contractService.instanceUnsigneContract(address);

        let tokens = this.list();

        if (tokens.filter(a => a.address == address).length > 0)
            throw new Error('Token already added!');

        let model: TokenModel = new TokenModel();
        model.id = tokens[tokens.length - 1].id + 1;
        model.address = address;
        model.name = await contractInstance.name();
        model.symbol = await contractInstance.symbol();
        model.decimals = await contractInstance.decimals();

        tokens.push(model);
        this.storageService.setLocalStorage(LocalStorageKeysEnum.tokens, tokens);
    }

    async initiate() {
        const contractInstance = await this.contractService.instanceUnsigneContract(environment.smartContract.address);

        let model = new TokenModel();
        model.id = 1;
        model.address = environment.smartContract.address;
        model.name = await contractInstance.name();
        model.symbol = await contractInstance.symbol();
        model.decimals = await contractInstance.decimals();

        this.storageService.setLocalStorage(LocalStorageKeysEnum.tokens, [model]);
    }

    exists() {
        return this.list();
    }

    getById(id: number) {
        return this.list().find(a => a.id == id);
    }

    remove(id: number) {
        const tokens = this.list();
        const token = this.getById(id);
        if (token) {
            tokens.splice(token.id - 1, 1);
            console.log(tokens)
        }

        this.storageService.removeLocalStorage(LocalStorageKeysEnum.tokens);
        this.storageService.setLocalStorage(LocalStorageKeysEnum.tokens, tokens);
    }

    async getBalanceById(id: number, address: string) {
        const token = this.getById(id);
        const contractInstance = await this.contractService.instanceUnsigneContract(token.address);
        return await contractInstance.balanceOf(address);
    }

    async getTotalSupply(id: number) {
        const token = this.getById(id);
        const contractInstance = await this.contractService.instanceUnsigneContract(token.address);
        return await contractInstance.totalSupply();
    }

    async send(id: number, to: string, value: number) {
        const token = this.getById(id);
        const password = this.signinService.getPassword();
        const contractInstance = await this.contractService.instanceSignedContract(token.address, password);
        return await contractInstance.transfer(to, value);
    }
}