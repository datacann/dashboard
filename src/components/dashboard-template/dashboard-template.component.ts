import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { log } from 'console';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js/auto';

interface Skill {
  employees: number;
  skill: string;
}

interface ActivityHour {
  date: string;
  exams_completed: number;
  hours: number;
  lessons_taken: number;
}

interface Course {
  assigned_to: string;
  description: string;
  due_date: string;
  status: string;
  title: string;
}

interface UpcomingCourses {
  assigned_to: string;
  description: string;
  due_date: string;
  status: string;
  title: string;
}

Chart.register(...registerables);


@Component({
  selector: 'app-dashboard-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-template.component.html',
  styleUrl: './dashboard-template.component.css'
})
export class DashboardTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef;
  @ViewChild('scatterChartCanvas') scatterChartCanvas!: ElementRef;
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;  
  @ViewChild('barChartCanvas1') barChartCanvas1!: ElementRef;


  inProgressCourses: Course[] = [];
  upComingCourses: UpcomingCourses[] = [];
  activityHours: ActivityHour[] = [];
  scatterChart!: Chart;
  skillsInDevelopment: any;
  topEmployees: any[] = [];
  topSkills: Skill[] = [];
  pieChart!: Chart;
  users: any[] | undefined
  employees: any
  barChart1!: Chart;


  isExpandedEmployees: boolean = true;
  isExpandedInteresting: boolean = true; 
  isExpandedActivity: boolean = false; 
  isExpandedCourses: boolean = false; 
  isExpandedSkills: boolean = false; 
  UpcomingProgress: boolean = false; 

  constructor(private dataService: DataService ) { }

ngOnInit() {
    this.dataService.getUsers().subscribe(
      (response: any) => {
        this.topEmployees = response.data.top_employees;
        this.topSkills = response.data.top_skills;
        this.activityHours = response.data.activity_hours;
        this.skillsInDevelopment = response.data.skills_in_development;
        this.inProgressCourses = response.data.in_progress_courses;
        this.upComingCourses = response.data.upcoming_courses;
        this.createBarChart1();
        this.createPolarAreaChart();
        this.createBarChart()
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  togglePanelTopEmployees(): void {
    this.isExpandedEmployees = !this.isExpandedEmployees;
  }

  togglePanelTopSkills(): void {
    this.isExpandedInteresting = !this.isExpandedInteresting;
  }

  togglePanelActivity(): void {
    this.isExpandedActivity = !this.isExpandedActivity;
  }


  togglePanelInProgress(): void {
    this.isExpandedCourses = !this.isExpandedCourses;
  }
  
  togglePanelUpcomingProgress(): void {
    this.UpcomingProgress = !this.UpcomingProgress;
  }

  togglePanelSkillsDev(): void {
    this.isExpandedSkills = !this.isExpandedSkills;
  }


  ngAfterViewInit(): void {
    this.createPolarAreaChart();
    this.createBarChart();
      this.createBarChart1();
 
  }

  createPolarAreaChart(): void {
    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
      const backgroundColors = [
      'rgba(255, 99, 132, 0.6)', 
      'rgba(54, 162, 235, 0.6)', 
      'rgba(255, 206, 86, 0.6)', 
      'rgba(75, 192, 192, 0.6)', 
      'rgba(153, 102, 255, 0.6)', 
      'rgba(255, 159, 64, 0.6)' 
    ];
    if (this.pieChartCanvas && this.topSkills.length > 0) {
      this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
        type: 'polarArea',
        data: {
          labels: this.topSkills.map(skill => skill.skill),
          datasets: [{
            label: 'Top Skills',
            data: this.topSkills.map(skill => skill.employees),
            backgroundColor: backgroundColors, 
            borderColor: backgroundColors.map(color => color.replace('0.6', '1')), 
            borderWidth: 1
          }]
        },
        options: options
      });
    }
  }

  createBarChart(): void {
    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
      const backgroundColors = [
      'rgba(54, 162, 235, 0.6)', 
      'rgba(75, 192, 192, 0.6)' 
    ];
      const borderColors = [
      'rgba(54, 162, 235, 1)', 
      'rgba(75, 192, 192, 1)' 
    ];
    const data = {
      labels: this.activityHours.map(hour => hour.date),
      datasets: [{
        label: 'Hours',
        data: this.activityHours.map(hour => hour.hours),
        backgroundColor: backgroundColors[0], 
        borderColor: borderColors[0],
        borderWidth: 1
      },
      {
        label: 'Lessons Taken',
        data: this.activityHours.map(hour => hour.lessons_taken),
        backgroundColor: backgroundColors[1], 
        borderColor: borderColors[1], 
        borderWidth: 1
      }]
    };
    if (this.barChartCanvas) {
      this.scatterChart = new Chart(this.barChartCanvas.nativeElement, {
        type: 'bar',
        data: data,
        options: options
      });
    }
  }

   createBarChart1(): void {
    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',
          labels: this.skillsInDevelopment.map((skill: any) => skill.skill),
          title: {
            display: true,
            text: 'Skills'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Number of Employees'
          }
        }
      }
    };
    const backgroundColors = [
      'rgba(54, 162, 235, 0.6)', // Mavi
    ];
    const data = {
      labels: this.skillsInDevelopment.map((skill: any) => skill.skill),
      datasets: [{
        label: 'Number of Employees',
        data: this.skillsInDevelopment.map((skill: any) => skill.employees),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1
      }]
    };
    if (this.barChartCanvas1) {
      this.barChart1 = new Chart(this.barChartCanvas1.nativeElement, {
        type: 'bar' as ChartType,
        data: data,
        options: options
      });
    }
  }
}