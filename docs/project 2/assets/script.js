const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

const tasks = [];

function addTask(text) {
  tasks.push({
    text: text,
    done: false,
  });

  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function createTaskItem(task, index) {
  const item = document.createElement('li');
  const text = document.createElement('span');
  const actions = document.createElement('div');
  const toggleButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  item.className = 'task-item';

  if (task.done) {
    item.classList.add('done');
  }

  text.className = 'task-text';
  text.textContent = task.text;

  actions.className = 'task-actions';

  toggleButton.type = 'button';
  toggleButton.textContent = task.done ? 'Desmarcar' : 'Concluir';
  toggleButton.addEventListener('click', function () {
    toggleTask(index);
  });

  deleteButton.type = 'button';
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Excluir';
  deleteButton.addEventListener('click', function () {
    deleteTask(index);
  });

  actions.appendChild(toggleButton);
  actions.appendChild(deleteButton);
  item.appendChild(text);
  item.appendChild(actions);

  return item;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'Nenhuma tarefa adicionada ainda.';
    taskList.appendChild(emptyItem);
    return; 
  }

  tasks.forEach(function (task, index) {
    const taskItem = createTaskItem(task, index);
    taskList.appendChild(taskItem);
  });
}

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (!text) {
    taskInput.focus();
    return;
  }

  addTask(text);
  taskInput.value = '';
  taskInput.focus();
});

renderTasks();
