
var origBoard;
const user = "O";
const ai = "X";
const winCombos = [ // An Array which contains 8 other arrays containing all the winning comninations
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

const cell = document.querySelectorAll('.cell');
startGame();

function startGame() {
  document.querySelector(".end").style.display = "none";
  origBoard = Array.from(Array(9).keys()); // makes an array of 9 elements containing number 1-9
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerText = '';
    cell[i].style.removeProperty('background-color');
    document.addEventListener('click', turnClick, false);
  }
}

function turnClick(square) {
  if(typeof origBoard[square.target.id] === 'number') { // checks if the spot is open
    turn(square.target.id, user);
    if (!checkTie()) turn(bestSpot(), ai);
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player)
  if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
  let plays = board.reduce((a,e,i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) { // for loop for the indexes and the winning combos of the wincombos array
    if (win.every(elem => plays.indexOf(elem) > -1)){
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
      gameWon.player === user ? "blue" : "red"; // chenge the background color to blue if user won and change it to red if AI won
    }
    for (var i = 0; i < cell.length; i++) {
      document.removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == user ? "You Win!!" : "You Lose!")
}

function emptySquares() {
  return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
  return minimax(origBoard, ai).index;
}

function checkTie() { // checks if the game tied and declares Tie Game
  if (emptySquares().length == 0) {
    for (var i = 0; i < cell.length; i++) {
      cell[i].style.backgroundColor = "green";
      document.removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
  return false;
}

function declareWinner(who) { // declares the winner of the game
  document.querySelector(".end").style.display = "block";
  document.querySelector(".end .text").innerText = who;
}

function minimax(newBoard, player) { // Recursive algorithim which determines the best spots for the AI to win
  var availSpots = emptySquares(newBoard);
  if (checkWin(newBoard, player)) {
    return {score: -10};
  } else if (checkWin(newBoard, ai)) {
    return {score: 10};
  } else if (availSpots.length == 0) {
    return {score: 0};
  }

  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == ai) {
      var result = minimax(newBoard, user);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, ai);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if(player === ai) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if(moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if(moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
