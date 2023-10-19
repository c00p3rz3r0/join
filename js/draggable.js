// function allowDrop(event) {
//     event.preventDefault();
// }

// function drag(event) {
//     event.dataTransfer.setData("text", event.target.innerHTML);
//     // Hinzufügen eines benutzerdefinierten Attributs, um das Startelement zu identifizieren
//     event.target.setAttribute("data-dragged", "true");
// }

// function drop(event, targetColumnId) {
//     event.preventDefault();
//     var data = event.dataTransfer.getData("text");
//     var newCard = document.createElement("div");
//     newCard.className = "kanban-card";
//     newCard.innerText = data;
//     newCard.draggable = true;
//     newCard.ondragstart = function (event) {
//         drag(event);
//     };
//     newCard.ondragover = function (event) {
//         allowDrop(event);
//     };
//     newCard.ondrop = function (event) {
//         drop(event, targetColumnId);
//     };
//     var targetColumn = document.getElementById(targetColumnId);
//     targetColumn.appendChild(newCard);

//     // Löschen des Texts der ursprünglichen Karte im Startfeld
//     var draggedElement = document.querySelector('[data-dragged="true"]');
//     if (draggedElement) {
//         draggedElement.innerHTML = '';
//         draggedElement.removeAttribute("data-dragged");
//         draggedElement.remove.
//     }
// }

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerHTML);
    // Hinzufügen eines benutzerdefinierten Attributs, um das Startelement zu identifizieren
    event.target.setAttribute("data-dragged", "true");
}

function drop(event, targetColumnId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var newCard = document.createElement("div");
    newCard.className = "kanban-card";
    newCard.innerText = data;
    newCard.draggable = true;
    newCard.ondragstart = function (event) {
        drag(event);
    };
    newCard.ondragover = function (event) {
        allowDrop(event);
    };
    newCard.ondrop = function (event) {
        drop(event, targetColumnId);
    };
    var targetColumn = document.getElementById(targetColumnId);
    targetColumn.appendChild(newCard);

    // Löschen des Texts der ursprünglichen Karte im Startfeld
    var draggedElement = document.querySelector('[data-dragged="true"]');
    if (draggedElement) {
        draggedElement.innerHTML = '';
        draggedElement.removeAttribute("data-dragged");
    }

    // Entfernen der leeren div-Elemente im To-Do

    const columns = ["todo-column", "inprogress-column", "feedback-column", "done-column"];
    columns.forEach(element => {
        var startColumn = document.getElementById(element);
        var emptyDivs = startColumn.querySelectorAll('.kanban-card:empty');
        emptyDivs.forEach(function (div) {
            div.remove();
        });
    });

    // var startColumn = document.getElementById("todo-column");
    // var emptyDivs = startColumn.querySelectorAll('.kanban-card:empty');
    // emptyDivs.forEach(function (div) {
    //     div.remove();
    // });
    // // Entfernen der leeren div-Elemente im Inprogress
    // var startColumn = document.getElementById("inprogress-column");
    // var emptyDivs = startColumn.querySelectorAll('.kanban-card:empty');
    // emptyDivs.forEach(function (div) {
    //     div.remove();
    // });
    // // Entfernen der leeren div-Elemente im Awiting field
    // var startColumn = document.getElementById("feedback-column");
    // var emptyDivs = startColumn.querySelectorAll('.kanban-card:empty');
    // emptyDivs.forEach(function (div) {
    //     div.remove();
    // });
    // // Entfernen der leeren div-Elemente im done colum
    // var startColumn = document.getElementById("done-column");
    // var emptyDivs = startColumn.querySelectorAll('.kanban-card:empty');
    // emptyDivs.forEach(function (div) {
    //     div.remove();
    // });



}