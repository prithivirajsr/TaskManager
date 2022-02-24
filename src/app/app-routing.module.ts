import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PagenotfoundComponent } from './contents/pagenotfound/pagenotfound.component';

/* Contents,Authentication,Task modules loaded when needed,
 implemented by using lazy laoding methodology */
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./contents/contents.module').then((m) => m.ContentsModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PagenotfoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
