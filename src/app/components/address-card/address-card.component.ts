import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent implements OnInit {

  address: string;

  constructor(
    private signinService: SigninService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.signinService.address.subscribe((address)=>{
      this.address = address;
    })
  }

  openQrCodeModal(qrcodemodal) {
    this.modalService.open(qrcodemodal);
  }

  copyToClipboard(){
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
