import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { SigninService } from '../services/signin.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'pages-app-root',
  templateUrl: './pages.app.component.html',
  styleUrls: ['./pages.app.component.css']
})
export class PagesAppComponent implements OnInit {
  isToogled: boolean;
  address: Observable<string>;

  constructor(
    private sidebarService: SidebarService,
    private signinService: SigninService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.sidebarService.currentState.subscribe(a => this.isToogled = a);

    this.signinService.updateAddressStore();
    this.signinService.address.subscribe(address => {
      if (!address)
        this.router.navigate(['/accounts/signin']);
    });
  }
}