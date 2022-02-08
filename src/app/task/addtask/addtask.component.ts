import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
})
export class AddtaskComponent implements OnDestroy {
  description = ''; //default value
  /* date = '';
  minDate = moment().format('YYYY-MM-DD'); */

  addTasksubscriber = new Subscription(); //subscriber for api call

  //Injecting user-defined & 3rd party service
  constructor(
    private toastr: ToastrService,
    private taskService: TaskService
  ) {}

  //This function is for adding task
  addTask(taskFormData: NgForm) {
    this.addTasksubscriber = this.taskService
      .addTask(taskFormData.value)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.toastr.success('Task successfully added');
            this.taskService.taskData.next(response.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.addTasksubscriber.unsubscribe();
    //unsubscribing the created subscription
  }
}
