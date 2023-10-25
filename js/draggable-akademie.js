let allTasks2 = [
    {
        'id': 1698179592917,
        "title": "Test eins",
        "description": "heute heir morgen da",
        "dueDate": "2023-10-26",
        "category": "To Do",

    },
    {
        'id': 1698179976268,
        "title": "Test2",
        "description": "gestern war hute noch morgen",
        "dueDate": "2023-10-20",
        "category": "Await feedback",
        "createdAt": 1698179976268
    },
    {
        'id': 1698234524147,
        "title": "Test 3",
        "description": "test der funktionen",
        "dueDate": "2023-10-26",
        "category": "To Do",
        "createdAt": 1698234524147
    },
    {
        'id': 1698234524990,
        "title": "Test 4",
        "description": "noch mehr tests",
        "dueDate": "2023-10-26",
        "category": "To Do",
        "createdAt": 1698234524990
    },
    {
        'id': 1698236971915,
        "title": "Heute ist Mittwoch",
        "description": "Leider war ich nicht singen",
        "dueDate": "2023-10-26",
        "category": "In progress",
        "createdAt": 1698236971915
    }
];




let currentDraggedElement;

function updateHTML() {

    // loadAllTask(); //denke das muss hier hin, bin mir aber nicht sicher

    const column = ['todo-tasks', 'inprogress-tasks', 'Feedback-tasks', 'done-tasks'];
    const category = ['To Do', 'In progress', 'Await feedback', 'Done'];

    for (let i = 0; i < category.length; i++) {
        let tasks = allTasks2.filter(t => t['category'] == category[i]);
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
    return `<div class="kanban-card" draggable="true" ondragstart="drag(${element['id']})" id="">
    <p class="labels-board-card-label">${element['title']}</p>
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

function drop(updatedcat) {
    console.log(updatedcat);

    allTasks2.find(task => task.id === currentDraggedElement).category = updatedcat;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}