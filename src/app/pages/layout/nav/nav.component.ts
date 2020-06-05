import { Component, EventEmitter, Output } from "@angular/core";
import { SidebarService } from '../../../services/sidebar.service';
import { SigninService } from 'src/app/services/signin.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent {
    isCollapsed: boolean;
    isToggled: boolean;
    address: Observable<string>;

    constructor(
        private sidebarService: SidebarService,
        private signinService: SigninService,
        private router: Router
    ) {
        this.isCollapsed = true;
        this.address = this.signinService.address;
    }

    toggleSidebar() {
        this.isToggled = !this.isToggled;
        this.sidebarService.changeVisibility(this.isToggled);
    }

    signout() {
        this.signinService.clearLocalStorageLogout();
        this.router.navigate(['/accounts/signin']);
    }
}