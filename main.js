const taskinput = document.getElementById('task-input');
const addtaskbutton = document.getElementById('add-task');
const tasklist = document.getElementById('task-list');

function addTask() {
    const tasktext = taskinput.value.trim();
    if (tasktext === '') return;

    const item = document.createElement('ul');
    item.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleComplete);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = tasktext;

    const Delete = document.createElement('button');
    Delete.textContent = 'Delete';
    Delete.addEventListener('click', removeTask);

    item.appendChild(checkbox);
    item.appendChild(taskSpan);
    item.appendChild(Delete);
    tasklist.appendChild(item);

    taskinput.value = '';
}

function toggleComplete(event) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('completed');
}

function removeTask(event) {
    const taskItem = event.target.parentElement;
    tasklist.removeChild(taskItem);
}
 addtaskbutton.addEventListener('click', addTask);

taskinput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
