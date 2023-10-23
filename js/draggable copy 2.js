function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, targetColumnId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var targetColumn = document.getElementById(targetColumnId);

    // Erstellen Sie eine Kopie der Karte und fügen Sie sie in die Zielkolonne ein
    var newCard = document.getElementById(data).cloneNode(true);
    targetColumn.appendChild(newCard);

    // Entfernen Sie die Originalkarte aus der Quellkolonne
    var sourceColumn = document.getElementById(data).parentElement;
    sourceColumn.removeChild(document.getElementById(data));
}