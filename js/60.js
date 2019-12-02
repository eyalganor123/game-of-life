/*game of life

*/

'use strict'


console.log('%cEx. #60 Solution:\n', 'color:orange');

var gGameInterval;
var gRowSize = 100;
var gColSize = 100;
var LIFE ='o';
var gBoard = createBoard(gRowSize, gColSize);
var initialDensity = .06;

init();

function init() {
    populateInital(initialDensity);
    renderBoard(gBoard);

    var gGameInterval = setInterval(function () {
        gBoard = runGeneration(gBoard);

        if (checkAllDead()||gBoard === []) {
            clearInterval(gGameInterval);
            console.log(333);
        }
    }, 1000/12);
}

function createBoard(rowSize, colSize) {
    var board = [];
    var rowSize = rowSize;
    var colSize = colSize;
    for (var i = 0; i < rowSize; i++) {
        board[i] = [];
        for (var j = 0; j < colSize; j++) {
            board[i][j] = ''
        }
    }


    return board;
}

function populateInital(density) {

    var board = gBoard;
    var popDensity = density
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < row.length; j++) {
            var randomInt = Math.random();
            if (randomInt < popDensity) row[j] = LIFE;
        }
    }
}

function runGeneration() {
    var copyMat = createBoard(gRowSize, gColSize);
    var pos = {
        i: 0,
        j: 0
    };
    for (var i = 0; i < copyMat.length; i++) {
        var row = copyMat[i];
        for (var j = 0; j < row.length; j++) {
            pos = {
                i: i,
                j: j
            }
             if (countPeopleAround=== 3) row[j] = LIFE;
             else if (countPeopleAround(pos) < 3 || countPeopleAround(pos) > 5) {
                row[j] = '';
            } else row[j] = LIFE;

        }

    }
    gBoard = copyMat;

    renderBoard(gBoard);
    return copyMat
}



function countPeopleAround(pos) {
    var peopleCount = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        // if i is out of bounderies - go to the next i 
        if (i < 0 || i > gBoard.length - 1) continue; //continue to the next i 

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            // if j is out of bounderies - go to the next j:
            if (j < 0 || j > gBoard[0].length - 1) continue; // continue to the next j.

            if (i === pos.i && j === pos.j) continue; //if its users cell continue;
            if (gBoard[i][j] === LIFE) peopleCount++;
        }
    }
    return peopleCount;
}

function checkAllDead() {
    var countDead=0;
    for (var i = 0; i < gRowSize; i++) {
        for (var j = 0; j < gColSize; j++) {
            if (gBoard[i][j] !== '') countDead++;
        }
    }
    if (countDead === 0) {return true;}
    else {return false;}
}

function renderBoard(gBoard) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (let i = 0; i < gBoard.length; i++) {
        const row = gBoard[i];
        strHTML += '<tr>';
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            strHTML += `<td class="${(cell) ? 'occupied' : ''}"
                         onclick="tdClick(${i} , ${j})">
            ${cell}</td>`;
        }
        strHTML += '</tr>';
    }

    elBoard.innerHTML = strHTML;
}

function copyMatt(gBoard) {
    var newMat = [];
    for (var i = 0; i < gBoard.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < gBoard[0].length; j++) {
            newMat[i][j] = gBoard[i][j];
        }
    }
    return newMat;
}
function restart(){
gBoard = createBoard(gRowSize, gColSize);
 init();
}