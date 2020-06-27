// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners function call
loadEventListeners();

//Load all event listeners function creation
function loadEventListeners() {
    //Add to task events
    form.addEventListener('submit', addTask);
}

//Add Task function
function addTask(e) {
    //If value left empty, propmt to add a task
    if (taskInput.value === '') {
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Assign a class name
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Assign a class name 
    link.className = 'delete-item secondary-content';
    //Create icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li 
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Clear Input
    taskInput.value = '';

    console.log(li);





    //prevent default action of "form submit"
    e.preventDefault();
}
