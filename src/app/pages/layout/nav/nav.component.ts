import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { SidebarService } from '../../../services/sidebar.service';
import { SigninService } from 'src/app/services/signin.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {
    isCollapsed: boolean;
    isToggled: boolean;

    constructor(
        private sidebarService: SidebarService,
        private signinService: SigninService,
        private router: Router
    ) {
        this.isCollapsed = true;
    }

    ngOnInit(): void {
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