let allTasks= [];

function addTask(){
    let taskTitle = document.getElementById('taskTitle').value;
    let taskDescription = document.getElementById('taskDescription').value;
    let taskDueDate = document.getElementById('tastDueDate').value;
    let taskContact = document.getElementById('taskContact').value;
    let taskCategory = document.getElementById('taskCategory').value;

    let task ={
        'title': taskTitle,
        'description': taskDescription,
        'dueDate': taskDueDate,
        'contact': taskContact,
        'category': taskCategory,
        'createdAt': new Date().getTime()
    }
    allTasks.push(task);

    console.log(allTasks);
}