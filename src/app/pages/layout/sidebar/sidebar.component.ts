import { Component } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ExportModel } from 'src/app/models/export.model';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [
        './sidebar.component.css'
    ]
})
export class SidebarComponent {

    constructor(
    ) { }
}