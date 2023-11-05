let currentDraggedElement;

// will read the saved task and create the card at the right coloum

async function updateHTML() {

    await loadAllTask(); //denke das muss hier hin, bin mir aber nicht sicher

    const column = ['todo-tasks', 'inprogress-tasks', 'Feedback-tasks', 'done-tasks'];
    const category = ['To Do', 'In progress', 'Await feedback', 'Done'];

    for (let i = 0; i < category.length; i++) {
        let tasks = allTasks.filter(t => t['category'] == category[i]);
        document.getElementById(column[i]).innerHTML = '';

        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            document.getElementById(column[i]).innerHTML += generateTodoHTML(element);
        }
    }
}

// log id of the dragged card
function drag(id) {
    currentDraggedElement = id;
}

// W# default task

function allowDrop(ev) {
    ev.preventDefault();
}


// subfuction for updateHMTL create the HTML elements

function generateTodoHTML(element) {
    const hasAssignedUser = element.assigned && element.assigned.length > 0;
    const hasSubTasks = element.subTasks && element.subTasks.length > 0;

    // Count finished and total subtasks
    const totalSubTasks = element.subTasks.length;
    const finishedSubTasks = element.subTasks.filter(subtask => subtask.done === 1).length;

    // Map priority names to their corresponding SVG URLs
    const priorityIcons = {
        'urgentBtn': '/assed/svg/Prio alta.svg',
        'mediumBtn': '/assed/svg/Prio media.svg',
        'lowBtn': '/assed/svg/Prio baja.svg'
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

    // // Check if element.assigned is an array
    // const assignedUser = Array.isArray(element.assigned) ? element.assigned.join(', ') : '';

    // // Extract initials from the joined string
    // const assignedInitials = assignedUser
    //     .split(', ')
    //     .map(name => name[0].toUpperCase())
    //     .join('');

    // const assignedCircleStyle = assignedUser
    //     ? `style="background-color: ${getRandomColor()}"`
    //     : '';


    

    return /*html*/`    
    <div class="kanban-card" draggable="true" ondragstart="drag(${element['createdAt']})" id="" ondblclick="fullscreen(${element['createdAt']})">
    <div class="cardTopic">
        <p class="labels-board-card-label">${element['topic']}</p>
        <button class="delete-button" onclick="clearTask(${element['createdAt']})">
            <img src="assed/svg/contact-imgs/close.svg" alt="" class="close-img" />
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
            
            ${hasAssignedUser ? `<div class="frame-139">Assigned: ${element['assigned']}</div>` : `<div class="frame-139">No user assigned.</div>`}
            <img src="${priorityIconUrl}" alt="Priority Icon">
        </div>
</div>
    `
        ;
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

    // Count finished and total subtasks
    const totalSubTasks = element.subTasks.length;
    const finishedSubTasks = element.subTasks.filter(subtask => subtask.done === 1).length;

    // Map priority names to their corresponding SVG URLs
    const priorityIcons = {
        'urgentBtn': '/assed/svg/Prio alta.svg',
        'mediumBtn': '/assed/svg/Prio media.svg',
        'lowBtn': '/assed/svg/Prio baja.svg'
    };

    const priorityName = {
        'urgentBtn': 'Urgent',
        'mediumBtn': 'Medium',
        'lowBtn': 'Low'
    };

    // Get the URL for the priority icon based on the priority value
    const priorityIconUrl = priorityIcons[element.prio];
    const priorityNameTxt = priorityName[element.prio];

    // create an only nominal progress %

    const percentage = Math.round((finishedSubTasks / totalSubTasks) * 100);

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
        <div class="frame-178 task-overlay-v-1-t6">Assigned to:</div>
        ${hasAssignedUser ? `<div class="frame-139">${element['assigned']}</div>` : `<div
            class="frame-139">No user assigned.</div>`}
        
    </div>
    <div class="cardProgress">
        <div class="progress progress-bar-custom" role="progressbar" aria-label="Example with label" aria-valuenow="${(finishedSubTasks / totalSubTasks * 100)}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${(finishedSubTasks / totalSubTasks * 100)}%"
                >${percentage}%</div>
        </div>
        ${hasSubTasks ? `<div class="frame-139">Subtasks: ${finishedSubTasks}/${totalSubTasks}</div>` : `<div
            class="frame-139">No subtasks.</div>`}
    </div>
    
    
</div>
    `;
}

function closeFullTask(){
    let closeFullTask = document.getElementById('fullTask');
    closeFullTask.classList.add('d-none');
}
