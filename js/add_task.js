let allTasks = [];

function addTask(){
    let taskTitle = document.getElementById('taskTitle').value;
    debugger;
    //let taskDescription = document.getElementById('taskDescription');
    //let taskDueDate = document.getElementById('tastDueDate');
    //let taskContact = document.getElementById('taskContact');
    //let taskCategory = document.getElementById('taskCategory');

    let task = {
        'title': taskTitle,
        //'description': taskDescription.value,
        //'dueDate': taskDueDate.value,
        //'contact': taskContact.value,
        //'category': taskCategory.value,
        //'createdAt': new Date().getTime()
    };
    debugger;
    
    allTasks.push(task);
    console.log(task);
    debugger
    //let allTasksAsString = JSON.stringify(allTasks);
    //setItem('allTasks', allTasks);
    //taskTitle.value = '';
    //taskDescription.value = '';
    //taskDueDate.value = '';
    //taskContact.value = '';
    //taskCategory.value = '';
}



function loadAllTask() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
    // alert("Done");
}