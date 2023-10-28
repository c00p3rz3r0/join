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



    allTasks.push({
        title: taskTitle.value,
        description: taskDescription.value,
        dueDate: taskDueDate.value,
        assigned: assinedPersons,
        category: taskCategory.value,
        // 'pro': taskDescription.value,
        subTasks: subTasks,
        createdAt: new Date().getTime(),
    });
    await setItem('task', JSON.stringify(allTasks));
    clearinputs();
    loadAllTask();
}

const inputFileds = ['taskTitle', 'taskDescription', 'taskContact', 'assinedPersons', 'tastDueDate', 'taskCategory', 'task-list'];
const htmlfields = ['assinedPersons', 'task-list'];

function clearinputs() {

    inputFileds.forEach(element => {
        document.getElementById(element).value = '';
    });

    htmlfields.forEach(element => {
        document.getElementById(element).innerHTML = '';
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

function addSubTask() {
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
        checkbox.value = '';
        checkbox.setAttribute('aria-label', 'Checkbox for following text input');

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

        // Store the subtask description and initial done status (0) in the array
        subTasks.push({ id: taskItem.id, description: taskText, done: 0 });

        // Increment the task ID counter
        taskIdCounter++;
        console.log(subTasks);
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

function addAssigned() {
    let assinedPerson = document.getElementById('taskContact').value;

    var firstLetter = assinedPerson.charAt(0).toUpperCase(); // Get the first letter of the name

    document.getElementById(`assinedPersons`).innerHTML += /*html*/`           
                <div class="contact-name">
                <div class="contact-name-circle" id="">
                    <img class="contact-circle" src="assed/svg/contact-imgs/Ellipse 5.svg" alt="" />
                    <div class="contact-name-circle-txt" id="" >${firstLetter}</div>
                </div>                
            </div>              
           `;
    assinedPersons.push(assinedPerson);
    console.log(assinedPersons);;
}

async function clearTask(clearID) {
    var clearTask = document.getElementById(clearID);
    if (clearTask) {
        // Find and remove the subtask from the array
        allTasks.forEach((task, index) => {
            if (task.id === clearTask) {
                allTasks.splice(index, 1);
                return;
            }
        });
    }
    await setItem('task', JSON.stringify(allTasks));
    updateHTML();
}


