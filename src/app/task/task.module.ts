import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { AddtaskComponent } from './addtask/addtask.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddtaskComponent, TasklistComponent, TaskComponent],
  imports: [CommonModule, TaskRoutingModule, FormsModule],
})
export class TaskModule {}
