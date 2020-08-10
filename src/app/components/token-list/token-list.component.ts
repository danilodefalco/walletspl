import { Component, OnInit, Inject } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninService } from 'src/app/services/signin.service';
import { TokenModel } from 'src/app/models/token.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  tokens: TokenModel[];
  address: string;

  constructor(
    private tokenService: TokenService,
    private signinService: SigninService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  async ngOnInit() {

    this.signinService.address.subscribe((address) => {
      this.address = address
    });

    this.listTokens();
    await this.updateBalance();
  }

  async updateBalance() {
    for (let i = 0; i < this.tokens.length; i++) {
      this.tokens[i].balance = await this.tokenService.getBalanceById(this.tokens[i].id, this.address);
    }
  }

  openQrCodeModal(qrcodemodal) {
    this.modalService.open(qrcodemodal);
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

  listTokens() {
    this.tokens = this.tokenService.list();
  }

  async removeToken(id: number) {
    this.tokenService.remove(id);
    this.listTokens();
    await this.updateBalance();
  }
}
