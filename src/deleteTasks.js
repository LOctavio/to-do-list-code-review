/* eslint import/no-cycle: [1, { maxDepth: Infinity }] */
import { tasksList, printList } from './index.js';

export function deleteTask(item) {
  localStorage.clear();
  const tasksList2 = [];
  for (let i = 0; i < tasksList.length; i += 1) {
    if (tasksList[i].index > parseInt(item.id, 10)) {
      tasksList[i].index -= 1;
    }
    if (i + 1 !== parseInt(item.id, 10)) {
      localStorage.setItem(tasksList[i].index, JSON.stringify(tasksList[i]));
      tasksList2.push(tasksList[i]);
    }
    item.remove();
  }
  tasksList = tasksList2;
  document.querySelector('ul').innerHTML = '';
  printList();
}

export function clearCompleted() {
  let count = 0;
  const completedItems = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    if (tasksList[i].completed === true) {
      completedItems.push(i + 1);
    }
  }
  completedItems.forEach((element) => {
    deleteTask(document.getElementById(element - count));
    count += 1;
  });
}