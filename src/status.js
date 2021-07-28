import { tasksList } from './index.js';
/* eslint import/no-cycle: [1, { maxDepth: Infinity }] */
/* eslint-disable import/prefer-default-export */
export function checkStatus(e, description, index, text) {
  const status = !!e.target.checked;
  if (e.target.checked) {
    text.classList.add('line-through');
  } else {
    text.classList.remove('line-through');
  }
  localStorage.setItem(index, `{"description":"${description}","completed":${status},"index":${index}}`);
  tasksList[index - 1].completed = status;
}