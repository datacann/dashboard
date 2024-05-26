import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTemplateComponent } from '../components/dashboard-template/dashboard-template.component';
import { TeamDetailComponent } from '../components/team-detail/team-detail.component';
import { AuthGuard } from '../guards/auth.guard';


export const routes: Routes = [
  { path: '', component: DashboardTemplateComponent }, 
  { path: 'team/:id', component: TeamDetailComponent }, 
  { path: 'dashboard', component: DashboardTemplateComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }