const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');


addBtn.addEventListener('click', addTask);


function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const taskItem = createTaskItem(taskText);
    pendingList.appendChild(taskItem);
    taskInput.value = '';
  }
}

function createTaskItem(taskText) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', completeTask);
  taskItem.appendChild(checkbox);

  const taskTextSpan = document.createElement('span');
  taskTextSpan.innerText = taskText;
  taskItem.appendChild(taskTextSpan);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', deleteTask);
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

function completeTask() {
  const taskItem = this.parentElement;
  const taskText = taskItem.querySelector('span');

  if (this.checked) {
    taskText.classList.add('completed-task');
    completedList.appendChild(taskItem);
  } else {
    taskText.classList.remove('completed-task');
    pendingList.appendChild(taskItem);
  }
}

function deleteTask() {
  const taskItem = this.parentElement;
  taskItem.parentElement.removeChild(taskItem);
}