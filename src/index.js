/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */
/* eslint import/no-cycle: [1, { maxDepth: Infinity }] */
import Icon from './three-dots-vertical.svg';
import Arrow from './arrow-return-left.svg';
import Refresh from './arrow-repeat.svg';
import './style.css';
import { drag, drop, allowDrop } from './drag-and-drop.js';
import { checkStatus } from './status.js';
import { addTask } from './addTask.js';
import { edit } from './editTask.js';
import { deleteTask, clearCompleted } from './deleteTasks.js';

export let tasksList = [];
let count = 0;

export class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const printTask = (description, index) => {
  const container = document.querySelector('ul');
  const task = document.createElement('li');
  task.setAttribute('id', index);
  task.setAttribute('draggable', 'true');
  task.classList.add('tasks');
  task.addEventListener('dragstart', () => drag(task));
  task.addEventListener('drop', (e) => drop(container, e));
  task.addEventListener('dragover', (e) => allowDrop(e));
  const check = document.createElement('input');
  check.addEventListener('change', (e) => checkStatus(e, description, index));
  const text = document.createElement('textarea');
  text.addEventListener('change', (e) => {
    if (e.target.value.length === 0) {
      deleteTask(e.target.parentNode);
    } else {
      edit(e, task);
    }
  });
  const icon = new Image();
  icon.src = Icon;
  check.type = 'checkbox';
  text.textContent = description;
  task.appendChild(check);
  task.appendChild(text);
  task.appendChild(icon);
  container.appendChild(task);
};

export const printList = () => {
  count = tasksList.length;
  const container = document.querySelector('ul');
  const title = document.createElement('li');
  const titleText = document.createElement('label');
  const refresh = new Image();
  refresh.setAttribute('id', 'refresh-icon');
  refresh.src = Refresh;
  titleText.innerHTML = "Today's To Do";
  title.appendChild(titleText);
  title.appendChild(refresh);
  titleText.setAttribute('id', 'title');
  const newTask = document.createElement('li');
  const addButton = document.createElement('button');
  addButton.setAttribute('id', 'add-button');
  addButton.addEventListener('click', () => {
    const task = document.querySelector('#add-task');
    count += 1;
    addTask(task.value, count);
    printTask(task.value, count);
    task.value = '';
  });
  const arrow = new Image();
  arrow.src = Arrow;
  addButton.appendChild(arrow);
  const input = document.createElement('input');
  input.setAttribute('id', 'add-task');
  input.setAttribute('placeholder', 'Add to your list...');
  newTask.appendChild(input);
  newTask.appendChild(addButton);
  container.appendChild(title);
  container.appendChild(newTask);
  tasksList.forEach((element) => {
    printTask(element.description, element.index);
  });
  const clearComplete = document.createElement('li');
  clearComplete.setAttribute('id', 'clear-complete');
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear all completed';
  clearButton.addEventListener('click', () => {
    clearCompleted();
  });
  clearComplete.appendChild(clearButton);
  container.appendChild(clearComplete);
};

const getLocalStorage = () => {
  for (let i = 0; i < localStorage.length; i += 1) {
    const index = localStorage.key(i);
    const { description } = JSON.parse(localStorage.getItem(localStorage.key(i)));
    tasksList.push(new Task(description, index));
  }
  tasksList.sort((a, b) => (a.index > b.index ? 1 : -1));
  for (let i = 0; i < localStorage.length; i += 1) {
    printTask(tasksList[i].description, tasksList[i].index);
  }
};

window.onload = () => {
  printList();
  getLocalStorage();
  count = tasksList.length;
};