"use strict";
const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = [
    "", "", "", "", "", "", "", "", ""
];

let go = "circle";
infoDisplay.textContent = "Circle goes first.";

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement);
    })
}
createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = go.charAt(0).toUpperCase() + go.slice(1) +" goes next.";
    e.target.removeEventListener("click", addGo)
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    let draw = true;
    for (let i = 0; i < allSquares.length; i++) {
        if (allSquares[i].childElementCount === 0) {
            draw = false;
            break;
        }
    }

    if (draw) {
        infoDisplay.textContent = "It's a draw!";
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
    }

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
        if (circleWins) {
            infoDisplay.textContent = "Congratulations Circle, you won!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        } 
    });

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
        if (crossWins) {
            infoDisplay.textContent = "Congratulations Cross, you won!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        }
    });
}

function resetGame() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        square.innerHTML = "";
        square.addEventListener("click", addGo);
    });
    go = "circle";
    infoDisplay.textContent = "Circle goes first.";
}

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", resetGame);
