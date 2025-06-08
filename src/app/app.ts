import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  description: string;
  status: 'stopped' | 'started' | 'finished';
  creeLe: string;
}

const STORAGE_KEY = 'todo-tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [CommonModule, FormsModule]
})
export class App {
  tasks: Task[] = [];
  newTask = '';
  newDescription = '';
  openedDescription: number | null = null;

  constructor() {
    let saved: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      saved = localStorage.getItem(STORAGE_KEY);
    }
    if (saved) {
      this.tasks = JSON.parse(saved);
    } else {
      this.tasks = [
        { title: 'HTML', description: 'Langage de balisage', status: 'started', creeLe: new Date().toLocaleString() },
        { title: 'CSS', description: 'Feuilles de style', status: 'started', creeLe: new Date().toLocaleString() },
        { title: 'JS', description: 'JavaScript', status: 'finished', creeLe: new Date().toLocaleString() },
        { title: 'Bootstrap', description: 'Framework CSS', status: 'stopped', creeLe: new Date().toLocaleString() }
      ];
      this.saveTasks();
    }
  }

  private saveTasks() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    }
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        title: this.newTask.trim(),
        description: this.newDescription.trim(),
        status: 'started',
        creeLe: new Date().toLocaleString()
      });
      this.newTask = '';
      this.newDescription = '';
      this.saveTasks();
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  startEdit(index: number) {
    this.newTask = this.tasks[index].title;
    this.newDescription = this.tasks[index].description;
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleDescription(index: number) {
    this.openedDescription = this.openedDescription === index ? null : index;
  }

  cycleStatus(task: Task) {
    if (task.status === 'stopped') {
      task.status = 'started';
    } else if (task.status === 'started') {
      task.status = 'finished';
    } else {
      task.status = 'stopped';
    }
    this.saveTasks();
  }
}

