let allTasks = [];
let allAssigned = [];

// Inital loading from backend

async function initnewTask() {
    await loadContacts();
    actUser();
    loadAssigned();
    await loadAllTask();
}

async function loadContacts() {
    try {
        allAssigned = JSON.parse(await getItem('contact'));
    } catch (e) {
        console.error('Loading error: ', e);
    }
}

async function loadAssigned() {
    let assigned = document.getElementById('datalistOptions');
    assigned.innerHTML = '';
    for (let index = 0; index < allAssigned.length; index++) {
        const element = allAssigned[index];
        let firstName = element['firstname'];
        assigned.innerHTML += `<option>${firstName}</option>`;
    };
}

async function loadAllTask() {
    try {
        allTasks = JSON.parse(await getItem('task'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

// HTML 5 validation of the input fields

async function validateAndAddTask() {
    console.log('Validation started');

    var form = document.getElementById('taskForm');
    console.log('Form:', form);

    if (form.checkValidity()) {
        // The form is valid, you can now proceed to add the task
        await addTask();
        console.log('Task added successfully');
    } else {
        // The form is not valid, and the browser will display validation messages
        console.warn('Form validation failed');
    }
    console.log('Validation completed');
}

//  push the new task to the backend

async function addTask() {
    console.log('add Task:', assinedPersons);
    let taskTopic = document.getElementById('taskTopic');
    let taskTitle = document.getElementById('taskTitle');
    let taskDescription = document.getElementById('taskDescription');
    let taskDueDate = document.getElementById('tastDueDate');
    let taskCategory = document.getElementById('taskCategory');
    let taskPrio = document.getElementById('priority-input');

    allTasks.push({
        topic: taskTopic.value,
        title: taskTitle.value,
        description: taskDescription.value,
        dueDate: taskDueDate.value,
        assigned: assinedPersons,
        category: taskCategory.value,
        prio: taskPrio.value,
        subTasks: subTasks,
        createdAt: new Date().getTime(),
    });
    await setItem('task', JSON.stringify(allTasks));
    console.log(allTasks);
    clearinputs();
    loadAllTask();
}


// clears all inputfields

const inputFileds = ['taskTopic', 'taskTitle', 'taskDescription', 'taskContact', 'assinedPersons', 'tastDueDate', 'taskCategory', 'task-list', 'priority-input', 'task-input'];
const htmlfields = ['assinedPersons', 'task-list'];

function clearinputs() {

    inputFileds.forEach(element => {
        document.getElementById(element).value = '';
    });

    htmlfields.forEach(element => {
        document.getElementById(element).innerHTML = '';
    });

    const buttons = document.querySelectorAll('.priority-button');

    // Remove the 'active' class from all buttons
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
}



//  subtask functions

let taskIdCounter = 0;
const subTasks = [];

function addSubTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');

        const taskItem = document.createElement('div');
        taskItem.classList.add('input-group', 'mb-3');
        taskItem.id = `task-${taskIdCounter}`;

        const inputGroupText = document.createElement('div');
        inputGroupText.classList.add('input-group-text');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input', 'mt-0');
        checkbox.setAttribute('aria-label', 'Checkbox for following text input');
        checkbox.setAttribute('onclick', `updateSubTaskStatus('task-${taskIdCounter}')`);
        checkbox.id = `task-${taskIdCounter}`;

        const taskInputField = document.createElement('input');
        taskInputField.type = 'text';
        taskInputField.classList.add('form-control');
        taskInputField.setAttribute('aria-label', 'Text input with checkbox');
        taskInputField.value = taskText;

        // Set input field to editable
        taskInputField.readOnly = false;

        // Add event listener to update the array when the input field loses focus
        taskInputField.addEventListener('blur', () => {
            updateSubTaskDescription(taskItem.id, taskInputField.value);
        });

        const deleteButton = document.createElement('span');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('input-group-text', 'delete-button');
        deleteButton.addEventListener('click', () => {
            removeTask(taskItem.id);
        });

        inputGroupText.appendChild(checkbox);
        taskItem.appendChild(inputGroupText);
        taskItem.appendChild(taskInputField);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        taskInput.value = '';

        // Store the subtask description and checkbox status in the array
        subTasks.push({ id: taskItem.id, description: taskText, done: 0 });

        // Increment the task ID counter
        taskIdCounter++;
    } else {
        alert('Please give Subtask a name');
    }
}

function updateSubTaskDescription(taskId, newDescription) {
    // Find the index of the subtask in the array
    const index = subTasks.findIndex((task) => task.id === taskId);

    // Update the description in the array
    if (index !== -1) {
        subTasks[index].description = newDescription;
    }
    
}

function updateSubTaskStatus(x) {
    const taskId = x;
    const task = subTasks.find((task) => task.id === taskId);
    console.log(taskId);
    console.log(task);
    if (task.done == 0) {
        task.done = 1;
    } else (task.done = 0);
    console.log(subTasks);
}


function removeTask(taskId) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.getElementById(taskId);
    if (taskItem) {
        // Find and remove the subtask from the array
        subTasks.forEach((task, index) => {
            if (task.id === taskId) {
                subTasks.splice(index, 1);
                return;
            }
        });

        // Remove the subtask element from the task list
        taskList.removeChild(taskItem);
    }
}

// load and add the assined persons

var assinedPersons = [];

function addAssigned(event) {
    event.preventDefault();

    const inputField = document.getElementById('taskContact');
    const assignedPersonName = inputField.value;
    console.log('addAssigned', assignedPersonName);
    if (assignedPersonName !== '') {
        // Find the person in the allAssigned array based on their name
        const assignedPerson = allAssigned.find(person => person.firstname === assignedPersonName);
        console.log('addAssigned', assignedPerson);
        if (assignedPerson) {
            // Use the initial and color from the found person
            const initial = assignedPerson.initial.toUpperCase();
            const assignedColor = assignedPerson.color;

            const assignedCircle = document.createElement('div');
            assignedCircle.className = 'assigned-circle assigned-circle-txt';
            assignedCircle.style.backgroundColor = assignedColor;
            assignedCircle.textContent = initial;

            const assignedPersonsContainer = document.getElementById('assinedPersons');
            assignedPersonsContainer.appendChild(assignedCircle);
            assinedPersons.push(assignedPerson);
            // Clear the input field
            inputField.value = '';
            console.log('add Persons:', assinedPersons);
        } else {
            alert('Invalid user name. Please create user in contacts.');
        }
    } else {
        alert('Please enter a user name');
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function clearTask(clearID) {
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        if (element['createdAt'] == clearID) {
            allTasks.splice(i, 1);
            await setItem('task', JSON.stringify(allTasks));
            updateHTML();
        }
    }

}

// prioritybuttons with ChatGTP

let selectedPrio = '';

// Function to select a priority and update the display
function selectPriority(buttonId) {
    const buttons = document.querySelectorAll('.priority-button');

    // Remove the 'active' class from all buttons
    buttons.forEach((button) => {
        button.classList.remove('active');
    });

    // Add the 'active' class to the selected button
    document.getElementById(buttonId).classList.add('active');

    // Update the selected priority
    selectedPrio = buttonId;
    document.getElementById('priority-input').value = selectedPrio;
    console.log(selectedPrio);
}







