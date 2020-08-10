
import { Component, OnInit } from "@angular/core";
import { SigninService } from 'src/app/services/signin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    address: string;

    constructor(
        private signinService: SigninService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.signinService.address.subscribe((address) => {
            this.address = address
        });
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