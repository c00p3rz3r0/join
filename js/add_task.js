let allTasks = [];

function addTask() {
    let taskTitle = document.getElementById('taskTitle');
    let taskDescription = document.getElementById('taskDescription');
    let taskDueDate = document.getElementById('tastDueDate');
    let taskContact = document.getElementById('taskContact');
    let taskCategory = document.getElementById('taskCategory');

    let task = {
        'title': taskTitle.value,
        'description': taskDescription.value,
        'dueDate': taskDueDate.value,
        'contact': taskContact.value,
        'category': taskCategory.value,
        'createdAt': new Date().getTime()
    }
    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskContact.value = '';
    taskCategory.value = '';
}



function loadAllTask() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}