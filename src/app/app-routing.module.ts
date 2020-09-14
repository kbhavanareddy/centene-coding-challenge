import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrolleesComponent } from '././enrollees/enrollees.component';
import { EnrolleeDetailsComponent } from './enrollee-details/enrollee-details.component';

const routes: Routes = [
  { 
    path: 'enrollees',
    component: EnrolleesComponent
  },
  { 
    path: 'enrollees/:id',
    component: EnrolleeDetailsComponent
  },
  { 
    path: '', 
    redirectTo: 'enrollees',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: EnrolleesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
