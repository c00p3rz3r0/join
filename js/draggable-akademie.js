let currentDraggedElement;

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


function drag(id) {
    currentDraggedElement = id;
    console.log(currentDraggedElement);
}


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

    return /*html*/`
      <div class="kanban-card" draggable="true" ondragstart="drag(${element['createdAt']})" id="">
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
                >${(finishedSubTasks / totalSubTasks * 100)}%</div>
        </div>
        ${hasSubTasks ? `<div class="frame-139">Subtasks: ${finishedSubTasks}/${totalSubTasks}</div>` : `<div
            class="frame-139">No subtasks.</div>`}
    </div>
    <div class="frame-139 d-none">Due Date: ${element['dueDate']}</div>
    <div class="frame-139">
        ${hasAssignedUser ? `<div class="frame-139">Assigned: ${element['assigned'][0]}</div>` : `<div
            class="frame-139">No user assigned.</div>`}
        <img src="${priorityIconUrl}" alt="Priority Icon">
    </div>
</div>
    `;
}











function allowDrop(ev) {
    ev.preventDefault();
}

async function drop(updatedcat) {
    console.log(updatedcat);

    allTasks.find(task => task.createdAt === currentDraggedElement).category = updatedcat;
    await setItem('task', JSON.stringify(allTasks));
    updateHTML();
}

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



