import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


interface Team {
  description: string;
  employees: Employee[];
  overall_score: string;
  title: string;
  total_employee_count: number;
}

interface Employee {
  current_score: number;
  email: string;
  lessons_taken: number;
  name: string;
  skills_being_developed: string[];
  title: string;
}

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.css'
})
export class TeamDetailComponent  {

    constructor(private route: ActivatedRoute) {}


  @Input() teamDetail: Team = {
    description: '',
    employees: [],
    overall_score: '',
    title: '',
    total_employee_count: 0
  }; 

  employeesDetail: Employee[] = []
  isExpandedTeam: boolean = true; 
  isExpandedEmployee: boolean = false; 
  
  ngOnInit() {
    this.route.params.subscribe(params => {   
      this.teamDetail = history.state.teamData;
       this.employeesDetail = this.teamDetail.employees; 
    });
  }

  togglePanelTeam(): void {
    this.isExpandedTeam = !this.isExpandedTeam;
  }

  togglePanelEmployee(): void {
    this.isExpandedEmployee = !this.isExpandedEmployee;
  }

}
