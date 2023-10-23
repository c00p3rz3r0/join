function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.outerHTML);
    // Hinzufügen eines benutzerdefinierten Attributs, um das Startelement zu identifizieren
    event.target.setAttribute("data-dragged", "true");
}

debugger

function drop(event, targetColumnId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var newCard = document.createElement("div");
    newCard.innerHTML = data;
    newCard.draggable = true;
    newCard.draggedElement = false;
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

    var draggedElement = document.querySelector('[data-dragged="true"]');
    if (draggedElement) {
        draggedElement.removeAttribute("data-dragged");
        draggedElement.textContent = '';
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
}






