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
        let lastname = element['lastname'];
        assigned.innerHTML += `<option>${firstName} ${lastname}</option>`;
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