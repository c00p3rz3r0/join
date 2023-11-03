let allTasks = [];
let allAssigned = [];

async function initnewTask() {
    await loadContacts();
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
    }
}

async function addTask() {
    let taskTitle = document.getElementById('taskTitle');
    let taskDescription = document.getElementById('taskDescription');
    let taskDueDate = document.getElementById('tastDueDate');
    let taskCategory = document.getElementById('taskCategory');
    let taskPrio = document.getElementById('priority-input');



    allTasks.push({
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
    clearinputs();
    loadAllTask();
}

const inputFileds = ['taskTitle', 'taskDescription', 'taskContact', 'assinedPersons', 'tastDueDate', 'taskCategory', 'task-list', 'priority-input'];
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

// getItem()

async function loadAllTask() {
    try {
        allTasks = JSON.parse(await getItem('task'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


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
        checkbox.onclick = "updateSubTaskStatus(this)";

        const taskInputField = document.createElement('input');
        taskInputField.type = 'text';
        taskInputField.classList.add('form-control');
        taskInputField.setAttribute('aria-label', 'Text input with checkbox');
        taskInputField.value = taskText;
        taskInputField.readOnly = true; // Set input field to read-only

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
        subTasks.push({ id: taskItem.id, description: taskText, done: checkbox.checked });

        // Increment the task ID counter
        taskIdCounter++;
    };
}

function updateSubTaskStatus(checkbox) {
    const taskId = checkbox.closest('div').id;
    const task = subTasks.find((task) => task.id === taskId);

    if (task) {
        task.done = checkbox.checked ? 1 : 0;
    }
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

var assinedPersons = [];

function addAssigned(event) {
    event.preventDefault();
    let assinedPerson = document.getElementById('taskContact').value;

    var firstLetter = assinedPerson.charAt(0).toUpperCase(); // Get the first letter of the name

    document.getElementById(`assinedPersons`).innerHTML += /*html*/`           
    <div class="contact-name-circle" id="nameIcon0">
                    <img class="contact-circle" src="assed/svg/contact-imgs/Ellipse 5.svg" alt="">
                    <div class="contact-name-circle-txt" id="nameIcons0">${firstLetter}</div>
    </div>`;


    assinedPersons.push(assinedPerson);
    document.getElementById('taskContact').value = '';
    console.log(assinedPersons);
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

// function updateSubTaskStatus(checkbox, isChecked) {
//     const taskId = checkbox.closest('div').id;
//     const task = subTasks.find((task) => task.id === taskId);

//     if (task) {
//         task.done = isChecked;
//     }
// }





