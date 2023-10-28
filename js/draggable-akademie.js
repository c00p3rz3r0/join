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
    return /*html*/`
    <div class="kanban-card" draggable="true" ondragstart="drag(${element['createdAt']})" id="">
    <p class="labels-board-card-label">${element['title']}</p>
    <button onclick="clearTask(${element['createdAt']})">
    <span class="delete-button" >❌</span>
</button>
    <div class="frame-114">${element['description']}</div>
    <div class="progress progress-bar-custom ">
        <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="frame-139">Due Date: ${element['dueDate']}</div>
</div>`;
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

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}