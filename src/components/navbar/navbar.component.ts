import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common'; 
import { TeamDetailComponent } from '../team-detail/team-detail.component';
import { Router, NavigationExtras } from '@angular/router';
import { DashboardTemplateComponent } from '../dashboard-template/dashboard-template.component';

export interface Employee {
  current_score: number;
  email: string;
  lessons_taken: number;
  name: string;
  skills_being_developed: string[];
  title: string;
}

export interface Team {
  description: string;
  employees: Employee[];
  overall_score: string;
  title: string;
  total_employee_count: number;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,TeamDetailComponent,DashboardTemplateComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private http: HttpClient, private dataService: DataService, private router: Router,private cdr: ChangeDetectorRef ) { }

  users: any[] = [];
  teams: Team[] = []
  isDropdownOpen: boolean = false;
  selectedTeamTitle = 'Welcome to Company Dashboard';
  selectedTeamData: any = null; 
  isDash: boolean = false

  ngOnInit() {
    this.dataService.getUsers().subscribe(
      (response: any) => {
        this.teams = response.data.teams;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  selectTeam(team: any,): void {
    this.selectedTeamTitle = team.title;  
    this.selectedTeamData = team;
    const url = `/team/${team.title}`;
    this.router.navigateByUrl(url, { state: { teamData: team } });
    this.cdr.detectChanges(); 
    this.isDash = !sessionStorage.getItem('isDash')
  }
  
  isTeamSelected(): boolean {
    const teamData = sessionStorage.getItem('selectedTeam');
    return teamData !== null; 
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  goDashboard() {
    this.isDash = !!sessionStorage.getItem('isDash')
    this.selectedTeamTitle = 'Welcome to Company Dashboard';
  }
}
