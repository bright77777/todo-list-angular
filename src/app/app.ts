import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Task } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [CommonModule, FormsModule]
})
export class App implements OnInit {
  tasks: Task[] = [];
  newTask = '';
  newDescription = '';
  openedDescription: number | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        title: this.newTask.trim(),
        description: this.newDescription.trim(),
        status: 'started',
        creeLe: new Date().toLocaleString()
      };
      this.todoService.addTask(task).subscribe(() => this.loadTasks());
      this.newTask = '';
      this.newDescription = '';
    }
  }

  deleteTask(index: number) {
    const task = this.tasks[index];
    if (task.id) {
      this.todoService.deleteTask(task.id).subscribe(() => this.loadTasks());
    }
  }

  startEdit(index: number) {
    this.newTask = this.tasks[index].title;
    this.newDescription = this.tasks[index].description;
    const task = this.tasks[index];
    if (task.id) {
      this.todoService.deleteTask(task.id).subscribe(() => this.loadTasks());
    }
  }

  toggleDescription(index: number) {
    this.openedDescription = this.openedDescription === index ? null : index;
  }

  cycleStatus(task: Task) {
    let newStatus: Task['status'];
    if (task.status === 'stopped') newStatus = 'started';
    else if (task.status === 'started') newStatus = 'finished';
    else newStatus = 'stopped';

    const updatedTask = { ...task, status: newStatus };
    if (task.id) {
      this.todoService.updateTask(updatedTask).subscribe(() => this.loadTasks());
    }
  }
}

