let allTasks = [];
let allAssigned =[];

async function initnewTask(){
    await loadContacts();
    loadAssigned();
    await loadAllTask();
}

async function loadContacts(){
    try{
        allAssigned = JSON.parse(await getItem('contact'));
    } catch(e){
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
    let taskContact = document.getElementById('taskContact');
    let taskCategory = document.getElementById('taskCategory');

    allTasks.push({
        title: taskTitle.value,
        description: taskDescription.value,
        dueDate: taskDueDate.value,
        //contact: taskContact.value,
        category: taskCategory.value,
        // 'pro': taskDescription.value,
        createdAt: new Date().getTime(),
    });
    await setItem('task', JSON.stringify(allTasks));
    loadAllTask();
}


// getItem()

async function loadAllTask() {
    try{
        allTasks = JSON.parse(await getItem('task'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

function addSubTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');

        const taskItem = document.createElement('div');
        taskItem.classList.add('input-group', 'mb-3');

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

        const deleteButton = document.createElement('span');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('input-group-text', 'delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        inputGroupText.appendChild(checkbox);
        taskItem.appendChild(inputGroupText);
        taskItem.appendChild(taskInputField);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}


