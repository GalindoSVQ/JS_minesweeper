// AUTHOR: ANTONIO GALINDO.

// VARIABLE
var minesFound = 0;


// CALL FUNCTION 
window.onload = start;

function strat() {
    document.getElementById('paint').addEventListener('click', paintBoard, false);
}

function paintBoard() {

    if (checkSize()) {
        board();
    }

}

// CHECK VALUES OF THE BOARD AND NUMBER OF MINES
function checkSize() {
    if (document.forms[0].width.value < 6) {
        mensajetexto.innerHTML = "Set the correct width";
    } else if (document.forms[0].high.value < 6) {
        mensajetexto.innerHTML = "Set the correct high";
    } else if (document.forms[0].nMines.value < 1) {
        mensajetexto.innerHTML = "Set number of mines";
    } else {
        mensaje.innerHTML = "The game is starting, there are " + document.forms[0].nMines.value + " mines.";
        document.getElementById("mines").value = 0;
        minesFound = 0
        return true;
    }
}

// FUNCTION THAT PAINTS THE BOARD WITH SETED SIZE
function board() {
    var board = document.getElementById('board');
    var numerOfMines = document.getElementById("nMines").value;
    var table = document.createElement('table');
    var idCell = 1;
    var width = document.forms[0].width.value;
    var high = document.forms[0].high.value;
    var attempts = Math.trunc((width * high) / 1.5);

    document.getElementById('attempts').value = attempts;
    document.getElementById('mines').value = minesFound;

    // CREATE THE ROWS AND CELLS
    for (var i = 0; i < high; i++) {
        var row = document.createElement("tr");
        for (let j = 0; j < width; j++) {
            var cell = document.createElement("td");
            var textCell = document.createTextNode(" ");
            cell.appendChild(textCell);
            cell.id = idCelda++;
            hilera.appendChild(cell);
        }
        tabla.appendChild(row);
    }

    // REMOVE THE TABLE IF IT EXISTS
    if (document.getElementById('table')) {
        var deleteTable = document.getElementById("table");
        var deletedTable = tablero.removeChild(deleteTable);
    }

    // SHOW THE TABLE
    tablero.appendChild(table);
    tabla.setAttribute("id", "table");
    tabla.className = "playBoard";

    // SET ALEATORY MINES
    for (let index = 0; index < numberOfMines; index++) {
        var aleatroyMines = Math.round(Math.random() * ((high * width) - 1) + 1);
        document.getElementById(aleatroyMines).className = "bomb";
    }

    // ADD CLICK EVENT
    for (let index = 1; index <= (width * high); index++) {
        document.getElementById(index).addEventListener('click', findBomb, false);
    }
}

//FINDING BOMB
function findingBomb() {

    message.innerHTML = ''; 
    var attempts = document.getElementById("attempts").value;
    document.getElementById("attempts").value = --attempts;
    var id = event.target.id;


    // CHECK THE BOMB
    if (document.getElementById(id).className == "bomb") {
        document.getElementById(id).className = "mines";
        minesFound++;
        document.getElementById("mines").value = minesFound;
        mensage.innerHTML = "YOU HAVE FOUND ONE MINE !";
    } else if (document.getElementById(id).className == "mina"){
        mensage.innerHTML = "THIS MINE HAS ALREADY BEEN FOUND !";
    }else{
        document.getElementById(id).className = "selec";
    }

    // MESSAGE IF YOU SPEND ALL THE ATTEMPS 
    if (intentos == 0) {
        message.innerHTML = "GAME FINISHED! YOU HAVE FOUND " + minesFound + " OF THE TOTAL OF " + document.getElementById("nMines").value + " MINES.";
        var board = document.getElementById("board");
        var table = document.getElementById("table");
        var tableDeleted = board.removeChild(table);
    }

    // MESSAGE IF YOU FOUND ALL MINES
    if (minesFound == document.getElementById("nMines").value) {
        message.innerHTML = "YOU HAVE FOUND THE " + document.getElementById("nMines").value + " MINES.";
        var board = document.getElementById("board");
        var table = document.getElementById("table");
        var tableDeleted = board.removeChild(table);
    }

}