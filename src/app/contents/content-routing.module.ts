import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './starting-page/start/start.component';

//Routing for starting page
const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'start',
    component: StartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
