import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardTemplateComponent } from '../components/dashboard-template/dashboard-template.component';
import { CommonModule } from '@angular/common'; // CommonModule'u ekleyin
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamDetailComponent } from '../components/team-detail/team-detail.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,HttpClientModule,DashboardTemplateComponent,CommonModule, MatButtonModule,TeamDetailComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http: HttpClient) {
  }
  title = 'dashboard';
}
