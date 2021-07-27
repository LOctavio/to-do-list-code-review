let task;

export function drag(item) {
  task = item;
}

export function drop(container, e) {
  const task2 = e.target.parentElement;
  if (task.id > task2.id) {
    container.insertBefore(task, task2);
  } else {
    container.insertBefore(task2, task);
  }

  localStorage.setItem(task2.id, `{"description":"${task.firstChild.nextSibling.textContent}","completed":false,"index":${task2.id}}`);
  localStorage.setItem(task.id, `{"description":"${task2.firstChild.nextSibling.textContent}","completed":false,"index":${task.id}}`);
  [task.id, task2.id] = [task2.id, task.id];
}

export function allowDrop(ev) {
  ev.preventDefault();
}