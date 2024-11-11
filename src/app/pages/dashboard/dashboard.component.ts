import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username: string | null = null;
  accessToken: string | null = null;
  tokenType: string | null = null;

  constructor(private authService: AuthTokenService) {}

  ngOnInit(): void {
    this.loadUserData();

    console.log(this.accessToken)
    console.log(this.username)
    console.log(this.tokenType)

  }

  loadUserData() {

    // this.username = this.authService.getUsername();
    // this.accessToken = this.authService.getAccessToken();
    // // this.tokenType = this.authService.getTokenType();
  }


}
