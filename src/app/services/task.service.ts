import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskData = new Subject();
  //Injecting in-built services
  //Http client service is used to make http request
  constructor(public http: HttpClient) {}

  //Add Task API Call
  addTask(taskData: any) {
    return this.http.post(environment.taskServer, taskData);
  }

  //Get All Task API Call
  getAllTask() {
    return this.http.get(environment.taskServer);
  }

  //Get Task By Id  API Call
  getTaskById(taskId: number) {
    return this.http.get(environment.taskServer + taskId);
  }

  //Get Task By Completed API Call
  getTaskByCompleted() {
    const httpParams = new HttpParams({
      fromObject: {
        completed: true,
      },
    });
    return this.http.get(environment.taskServer, { params: httpParams });
  }

  //Update Task By Id API call
  updateTask(taskId: number, checkedValue: boolean) {
    return this.http.put(environment.taskServer + taskId, {
      completed: checkedValue,
    });
  }

  //Delete Task By Id
  deleteTask(taskId: number) {
    return this.http.delete(environment.taskServer + taskId);
  }
}
