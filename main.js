const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('task-due-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const sortTasksDropdown = document.getElementById('sort-tasks');


document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

addTaskButton.addEventListener('click', addTask);
sortTasksDropdown.addEventListener('change', sortTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === '' || dueDate === '') return;

    const task = {
        text: taskText,
        dueDate: dueDate,
        completed: false
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
    dueDateInput.value = '';
}

function addTaskToDOM(task) {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    if (task.completed) listItem.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', toggleComplete);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = `${task.text} (Due: ${task.dueDate})`;

    if (new Date(task.dueDate) < new Date()) {
        listItem.classList.add('expired');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', removeTask);

    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function toggleComplete(event) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('completed');
    updateLocalStorage();
}

function removeTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
    updateLocalStorage();
}

function sortTasks() {
    const tasks = [...taskList.children];
    tasks.sort((a, b) => {
        const dateA = new Date(a.querySelector('span').textContent.match(/\(Due: (.*)\)/)[1]);
        const dateB = new Date(b.querySelector('span').textContent.match(/\(Due: (.*)\)/)[1]);
        return sortTasksDropdown.value === 'latest' ? dateB - dateA : dateA - dateB;
    });

    tasks.forEach(task => taskList.appendChild(task));
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent.match(/^(.*) \(Due:/)[1];
        const dueDate = taskItem.querySelector('span').textContent.match(/\(Due: (.*)\)/)[1];
        const completed = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, dueDate, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
