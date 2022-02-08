import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit, OnDestroy {
  //default value for taskArray
  taskArray = [
    {
      _id: 0,
      description: '',
      createdAt: '',
      completed: false,
    },
  ];

  //default values for single task array
  singleTaskArray = {
    _id: 0,
    description: '',
    createdAt: '',
    completed: false,
  };
  taskCount: number = 0; //default task count

  deleteTaskId: number = 0;

  //subscribers for api calls
  tasksubscriber = new Subscription(); //subject for displaying task dynamically
  getAllTasksubscriber = new Subscription();
  getCompletedTasksubscriber = new Subscription();
  updateTasksubscriber = new Subscription();
  deleteTasksubscriber = new Subscription();
  getTaskByIdsubscriber = new Subscription();

  //Injecting user-defined and 3rd party service
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  //Calling getalltask function
  ngOnInit(): void {
    this.tasksubscriber = this.taskService.taskData.subscribe((data: any) => {
      this.taskArray.push(data);
    });
    this.getAllTask();
  }

  //This function is for get all task
  getAllTask() {
    this.getAllTasksubscriber = this.taskService.getAllTask().subscribe(
      (response: any) => {
        this.taskCount = response.count;
        this.taskArray = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //This function is for get completed task
  getCompletedTask() {
    this.getCompletedTasksubscriber = this.taskService
      .getTaskByCompleted()
      .subscribe(
        (response: any) => {
          this.taskCount = response.count;
          this.taskArray = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //This function is for update task
  updateTask(taskId: number, event: any, index: number) {
    this.updateTasksubscriber = this.taskService
      .updateTask(taskId, event.target.checked)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.taskArray[index].completed = response.data.completed;
            this.toastr.success('Task Updated Successfully');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //This function is for get task by id
  getTaskById(taskId: number, index: number) {
    this.getTaskByIdsubscriber = this.taskService.getTaskById(taskId).subscribe(
      (response: any) => {
        if (response.success) {
          this.singleTaskArray = response.data;
          this.singleTaskArray._id = index + 1;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //This function is  for getting task id for deleting
  onDelete(taskId: any) {
    this.deleteTaskId = taskId;
  }

  //This function is for delete task
  deleteTask() {
    this.deleteTasksubscriber = this.taskService
      .deleteTask(this.deleteTaskId)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.toastr.success('Task Deleted Successfully');
            this.getAllTask();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.getAllTasksubscriber.unsubscribe();
    this.getCompletedTasksubscriber.unsubscribe();
    this.updateTasksubscriber.unsubscribe();
    this.deleteTasksubscriber.unsubscribe();
    this.getTaskByIdsubscriber.unsubscribe();
    //Unsubscribing the created subscriptions
  }
}
