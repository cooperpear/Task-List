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
    //DOM Load event, upon loaded call getTasks for locally stored tasks
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add to task events
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);

}

//Get tasks from LocalStorage
function getTasks() {
    let tasks;
    //Check in LocalStorage to see if any item currently exists. IF none, THEN create emtpy storage array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //ELSE parse input value into a object with JSON.PARSE and assign to tasks 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //Loop through each task in Storage and create each DOM element
    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');
        //Assign a class name
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
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
    })
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

    //Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);

    //Clear Input
    taskInput.value = '';

    //prevent default action of "form submit"
    e.preventDefault();
}

//Create Store function
function storeTaskInLocalStorage(task) {
    let tasks;
    //Check in LocalStorage to see if any item currently exists. IF none, THEN create emtpy storage array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //ELSE parse input value into a object with JSON.PARSE and assign to tasks 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //Add (push) new task variable to tasks array
    tasks.push(task);
    //Add tasks to localstorage (must use JSON.stringify, local storage only accepts strings)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Create Remove task function
function removeTask(e) {
    //Check to see if parent element ('a' tag) contains a class of "delete-item"
    if (e.target.parentElement.classList.contains
        ('delete-item')) {
        //IF true, THEN run confirm statement and IF true, THEN remove element
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Create Remove Task From Local Storage Function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    //Check in LocalStorage to see if any item currently exists. IF none, THEN create emtpy storage array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //ELSE parse input value into a object with JSON.PARSE and assign to tasks 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //Loop through each task, include index parameter for splice method
    tasks.forEach(function (task, index) {
        //Check to see if the text content matches the localstorage value
        if (taskItem.textContent === task) {
            //IF true, THEN splice (remove) 1 item at position (index)
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSONstringify(tasks));

}

//Create Clear tasks function
function clearTasks() {
    //this works, but not as fast (efficient)
    // taskList.innerHTML = '';

    //Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear tasks from LocalStorage
    clearTasksFromLocalStorage();

}

//Create Clear Tasks From Local Storage Function
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Create Filter Tasks function
function filterTasks(e) {
    //Assign input value of user to constant, make all lower case
    const text = e.target.value.toLowerCase();
    //Grab all list items with class of '.collection-item', go through each item with forEach
    document.querySelectorAll('.collection-item').forEach
        //use a function to assign the text content of each first child to a constant "item". (Iteraror = task parameter)
        (function (task) {
            const item = task.firstChild.textContent;
            //Check IF item is in any Index position in the array
            if (item.toLowerCase().indexOf(text) !== -1) {
                //IF True, THEN display
                task.style.display = 'block';
                //ELSE no display
            } else {
                task.style.display = 'none';
            }
        });
}
