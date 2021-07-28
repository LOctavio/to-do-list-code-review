/* eslint-disable import/prefer-default-export */
/* eslint import/no-cycle: [1, { maxDepth: Infinity }] */
import { tasksList, Task } from './index.js';

const addTaskToLocalStorage = (description, index) => {
  localStorage.setItem(index, JSON.stringify(new Task(description, index)));
};

export const addTask = (description, index) => {
  tasksList.push(new Task(description, index));
  addTaskToLocalStorage(description, index);
};