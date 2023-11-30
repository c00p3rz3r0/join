let currentDraggedElement;

// will read the saved task and create the card at the right coloum

async function updateHTML() {

    await loadAllTask(); //load all backend tasks
    await loadContacts();

    const column = ['todo-tasks', 'inprogress-tasks', 'Feedback-tasks', 'done-tasks'];
    const category = ['To Do', 'In progress', 'Await feedback', 'Done'];

    for (let i = 0; i < category.length; i++) {
        let tasks = allTasks.filter(t => t['category'] == category[i]);
        document.getElementById(column[i]).innerHTML = '';

        if (tasks.length === 0) {
            document.getElementById(column[i]).innerHTML = `<div class="no-task">No task ${column[i]}</div>`;
        } else {
            for (let index = 0; index < tasks.length; index++) {
                const element = tasks[index];
                document.getElementById(column[i]).innerHTML += generateTodoHTML(element);
            }
        }
    }
    actUser();
}

async function loadContacts() {
    try {
        allAssigned = JSON.parse(await getItem('contact'));
    } catch (e) {
        console.error('Loading error: ', e);
    }
}

// subfuction for updateHMTL create the HTML elements

function generateTodoHTML(element) {

    // const hasAssignedUser = element.assigned && element.assigned.length > 0;
    const hasSubTasks = element.subTasks && element.subTasks.length > 0;

    // Count finished and total subtasks
    const totalSubTasks = element.subTasks.length;
    const finishedSubTasks = element.subTasks.filter(subtask => subtask.done === 1).length;


    // Map priority names to their corresponding SVG URLs
    const topicColor = {
        'User Storys': '#008bff',
        'Technical Support': '#b400ff',
        'Coding': '#ffc107'
    };

    // Get the color code for the topic

    const toipcColorCode = topicColor[element.topic]

    // Map priority names to their corresponding SVG URLs
    const priorityIcons = {
        'urgentBtn': './assed/svg/Prio alta.svg',
        'mediumBtn': './assed/svg/Prio media.svg',
        'lowBtn': './assed/svg/Prio baja.svg'
    };

    // Get the URL for the priority icon based on the priority value
    const priorityIconUrl = priorityIcons[element.prio];

    // create an only nominal progress %

    const percentage = Math.round((finishedSubTasks / totalSubTasks) * 100);

    // // Function to generate a random background color
    // function getRandomColor() {
    //     const letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (let i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

    // Check if element.assigned is an array
    const assignedUsers = Array.isArray(element.assigned) ? element.assigned : [];

    // Loop through assigned users and create a circle for each with the assigned color and initials
    const assignedCircles = assignedUsers.map(assigned => {
        const userInitial = assigned.initial.toUpperCase();
        const assignedColor = assigned.color;
        const circleStyle = `style="background-color: ${assignedColor}"`;

        return `<div class="assigned-circle assigned-circle-txt" ${circleStyle}>${userInitial}</div>`;
    });

    // create the HTMLelemts with the save informations
    return /*html*/`    
    <div class="kanban-card" draggable="true" ondragstart="drag(${element['createdAt']})" id="" ondblclick="fullscreen(${element['createdAt']})">
    <div class="cardTopic">
        <p class="labels-board-card-label" style="background-color: ${toipcColorCode}">${element['topic']}</p>
        <button class="delete-button" onclick="clearTask(${element['createdAt']})">
            <img src="assed/svg/contact-imgs/delete.svg" alt="" class="delete-img" />
        </button>
    </div>
    <label class="cardTitle" for="taskDescription">${element['title']}</label>
    <div class="frame-114 cradDescrip" name="taskDescription">${element['description']}</div>
    <div class="cardProgress">
        <div class="progress progress-bar-custom" role="progressbar" aria-label="Example with label" aria-valuenow="${(finishedSubTasks / totalSubTasks * 100)}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${(finishedSubTasks / totalSubTasks * 100)}%"
                >${percentage}%</div>
        </div>
        ${hasSubTasks ? `<div class="frame-139">Subtasks: ${finishedSubTasks}/${totalSubTasks}</div>` : `<div
            class="frame-139">No subtasks.</div>`}
    </div>
    <div class="frame-139 d-none">Due Date: ${element['dueDate']}</div>
    <div class="frame-139">
            <div class="frame-assigned-circ">
            ${assignedCircles.join('')} <!-- Join the circles together -->
            <!-- ${assignedUsers.length > 0 ? `<div class="frame-139">Assigned: ${element['assigned'].join(', ')}</div>` : `<div class="frame-139">No user assigned.</div>`} -->
            </div>
            <img src="${priorityIconUrl}" alt="Priority Icon">
        </div>  
    
</div>
    `
        ;
}

// log id of the dragged card
function drag(id) {
    currentDraggedElement = id;
}

// W3 default task

function allowDrop(ev) {
    ev.preventDefault();
}

// Updated the Task category

async function drop(updatedcat) {
    console.log(updatedcat);

    allTasks.find(task => task.createdAt === currentDraggedElement).category = updatedcat;
    await setItem('task', JSON.stringify(allTasks));
    updateHTML();
}

// shown/close the add task flyover html

const addTaskPopUpIds = ['taskAddFormInBaord', 'addTaskPopCanclBtn'];

function addTaskPopUp(id) {
    addTaskPopUpIds.forEach(element => {
        let param = document.getElementById(element)
        param.classList.remove('d-none');
    });
    let addUpdateHTML = document.getElementById('task-Submitbutton');
    addUpdateHTML.onclick = function () {
        addTask();
        updateHTML();
    };
}

function addTaskPopUpCls(id) {

    addTaskPopUpIds.forEach(element => {
        let param = document.getElementById(element)
        param.classList.add('d-none');
    });
}

// open the fullscreen Task and make it editable

function fullscreen(id) {
    let showFullTask = document.getElementById('fullTask');
    let thisTask = document.getElementById('fullTaskCard');
    let element = allTasks.find(task => task.createdAt === id);
    showFullTask.classList.remove('d-none');
    thisTask.innerHTML = '';
    thisTask.innerHTML += generateFullTask(element);
}


function generateFullTask(element) {
    const hasAssignedUser = element.assigned && element.assigned.length > 0;
    const hasSubTasks = element.subTasks && element.subTasks.length > 0;

    // Map priority names to their corresponding SVG URLs
    const priorityIcons = {
        'urgentBtn': './assed/svg/Prio alta.svg',
        'mediumBtn': './assed/svg/Prio media.svg',
        'lowBtn': './assed/svg/Prio baja.svg'
    };

    const priorityName = {
        'urgentBtn': 'Urgent',
        'mediumBtn': 'Medium',
        'lowBtn': 'Low'
    };

    // Get the URL for the priority icon based on the priority value
    const priorityIconUrl = priorityIcons[element.prio];
    const priorityNameTxt = priorityName[element.prio];

    // Function to generate a random background color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Check if element.assigned is an array
    const assignedUsers = Array.isArray(element.assigned) ? element.assigned : [];

    // Create a list of assigned users with circles, initials, and names
    const assignedList = assignedUsers.map(user => {
        const userInitial = user.initial.toUpperCase();
        const assignedColor = user.color;
        const circleStyle = `style="background-color: ${assignedColor}"`;

        return /*html*/`
            <div class="frame-crc-name">
                <div class="assigned-circle assigned-circle-txt assigned-circle-fullscreen" ${circleStyle}>${userInitial}</div>
                <div class="assigned-name task-overlay-v-1-t6">${user.firstname}</div>
            </div>
        `;
    });

    // Create a list of subtasks with checkboxes and descriptions
    const subtaskList = element.subTasks.map(subtask => {
        return /*html*/`
            
                <div class="subtasks-check">
                <input type="checkbox" ${subtask.done === 1 ? 'checked' : ''} />
                <span class="task-overlay-v-1-t6">${subtask.description}</span>
                </div>
            
        `;
    });

    return /*html*/`    
    <div class="task-overlay-v-1">
    <div class="cardTopic">
        <p class="labels-board-card-label">${element['topic']}</p>
        <button class="delete-button" onclick="closeFullTask()">
            <img src="assed/svg/contact-imgs/close.svg" alt="" class="close-img" />
        </button>
    </div>
    <label class="task-overlay-v-1-Title" for="taskDescription">${element['title']}</label>
    <div class="frame-114 task-overlay-v-1-t6" name="taskDescription">${element['description']}</div>
    <div class="frame-139 task-overlay-v-1-t6">Due Date: ${element['dueDate']}</div>
    <div class="frame-178 task-overlay-v-1-t6">Priority: ${priorityNameTxt}
    <img src="${priorityIconUrl}" alt="Priority Icon">
</div>
    <div class="frame-215">
    <div class="frame-215">
        <div class="task-overlay-v-1-t6">Assigned to:</div>
        ${assignedList.length > 0 ? assignedList.join('') : '<div class="frame-139">No user assigned.</div>'}
        </div>
        <div class="frame-215">
        <div class="task-overlay-v-1-t6">Subtasks:</div>  
        ${hasSubTasks ? subtaskList.join('') : '<div class="frame-139">No subtasks.</div>'}
    </div>
    <div class="frame-delete">
    <div class="edit-name">
        <div onclick="" id="edit-name-sub" class="edit-name-sub">
        <img src="assed/svg/contact-imgs/edit.svg" alt="" class="edit-pen-img" />
        <div class="edit-txt">Edit</div>
        </div>
        <div onclick="clearTask(${element['createdAt']}), closeFullTask()" class="delete-container">
        <img src="assed/svg/contact-imgs/delete.svg" alt="" class="delete-img" />
        <div class="delete-txt">Delete</div>
        </div>
    </div>
    </div>
    
</div>
    `;
}

function closeFullTask() {
    let closeFullTask = document.getElementById('fullTask');
    closeFullTask.classList.add('d-none');
}
