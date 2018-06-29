let isreset = 0;
let map = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
]

function resetGame() {
    
    let board = document.getElementById("mazeDiv");
    board.innerHTML = "";
    map = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ]
    isreset=1;
    drawBoard();
}


map.className = "map"

const black = document.getElementById("black")
const red = document.getElementById("red");
const mazeDiv = document.getElementById("mazeDiv");
let currentPlayer = "black";


function addDisc(column) {
    if (isreset==1) {
        currentPlayer = "black"
        isreset = 0;
    }
    for (let i = 5; i >= 0; i--) {
        if (map[i][column] == "") {
            if (currentPlayer == "black") {
                map[i][column] = "b"//black;
                let test = document.getElementById("cell" + i + column);
                test.innerHTML = '<img src="Black_Circle.png" class="disc">'
                checkForWinHorizontal();
                checkForWinVertical();
                checkForWinDDown();
                checkForWinDUp();

                currentPlayer = "red";
                return
            } else if (currentPlayer == "red") {
                map[i][column] = "r"//red;
                let test = document.getElementById("cell" + i + column);
                test.innerHTML = '<img src= "Red_Circle.png" class="disc">'
                checkForWinHorizontal();
                checkForWinVertical();
                checkForWinDDown();
                checkForWinDUp()
                currentPlayer = "black";
                return
            }
        }
    }
}


function drawBoard() {
    currentPlayer = "black";
    let storage = [];
    for (let row = 0; row < map.length; row++) {
        const rowStr = map[row];
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        let x = [];
        storage.push([]);

        for (let i = 0; i < rowStr.length; i++) {
            let cellClass = rowStr[i];
            const cellDiv = document.createElement("div");

            cellDiv.className = "cell " + cellClass;
            cellDiv.id = "cell" + row + i

            storage[row].push(cellDiv);
            rowDiv.appendChild(cellDiv);
        }
        mazeDiv.appendChild(rowDiv);
    }

    handleClick = function (event) {
        var column = event.target.value;
        addDisc(column);
    }

    for (let i = 0; i <= 6; i++) {
        var button = document.createElement("button");
        button.className = "button"
        button.value = i
        button.textContent = 'drop';
        button.addEventListener("click", handleClick);
        mazeDiv.appendChild(button);
    }

    let restart = document.createElement("button")
    restart.textContent = "click me to restart"
    restart.onclick = function () {
        resetGame();
    }

    mazeDiv.appendChild(restart);
}

drawBoard();

function checkForWinHorizontal() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < 7; j++) {
            var cell = map[i][j]
            if (cell !== "") {
                console.log(map[i][j],map[i][j+1],map[i][j+2],map[i][j+3])
                if (map[i][j] && map[i][j+1] && map[i][j+2] && map[i][j+3] && cell === map[i][j + 1] && cell === map[i][j + 2] && cell === map[i][j + 3]) {
                    console.log("made it")
                    alert(currentPlayer + " wins!")
                    resetGame();
                }
            }
        }
    }
}

function checkForWinVertical() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < 7; j++) {
            var cell = map[i][j]
            if (cell !== "") {
                if (map[i + 1] && map[i + 2] && map[i + 3] && map[i + 1][j] && cell === map[i + 1][j] && cell === map[i + 2][j] && cell === map[i + 3][j]) {
                    alert(currentPlayer + " wins!")
                    
                    resetGame();
                    console.log(currentPlayer);
                }
            }
        }
    }
}

function checkForWinDDown() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < 7; j++) {
            let cell = map[i][j]
            if (cell !== "") {
                if (map[i - 1] && map[i - 2] && map[i - 3] && cell === map[i - 1][j - 1] && cell === map[i - 2][j - 2] && cell === map[i - 3][j - 3]) {
                    alert(currentPlayer + " wins!")
                    resetGame();
                }
            }
        }
    }
}

function checkForWinDUp() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < 7; j++) {
            let cell = map[i][j]
            if (cell !== "") {
                if (map[i + 1] && map[i + 2] && map[i + 3] && cell === map[i + 1][j - 1] && cell === map[i + 2][j - 2] && cell === map[i + 3][j - 3]) {
                    alert(currentPlayer + " wins!")
                    resetGame();
                }
            }
        }
    }
}
