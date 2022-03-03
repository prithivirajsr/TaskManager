import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { AddtaskComponent } from './addtask/addtask.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from './tasklist/capitalize.pipe';
import { BoldtaskmodalDirective } from './tasklist/boldtaskmodal.directive';

@NgModule({
  declarations: [AddtaskComponent, TasklistComponent, TaskComponent, CapitalizePipe, BoldtaskmodalDirective],
  imports: [CommonModule, TaskRoutingModule, FormsModule],
})
export class TaskModule {}
