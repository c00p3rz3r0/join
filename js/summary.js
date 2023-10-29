
async function initSummary(){
    actUser();
    await loadAllTask();
    let todo = loadSum('To Do'); //ToDo
    let done = loadSum('Done');//Done
    let progress = loadSum('In progress');//Progress
    let feedback = loadSum('Await feedback');// Feedback
    let total = allTasks.length;
    document.getElementById('totalToDo').innerHTML = todo;
    document.getElementById('totalDone').innerHTML = done;
    document.getElementById('totalTask').innerHTML = total;
    document.getElementById('taskInProgress').innerHTML = progress;
    document.getElementById('taskFeedback').innerHTML = feedback;
}

function loadSum(index){
    let sum = 0;
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        if(element['category'] == index){
            sum++;
        }
    }
    return sum;
}

