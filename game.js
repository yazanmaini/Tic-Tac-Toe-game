var origBoard;
const user = 'O';
const AI = 'X';
const winCombos = [
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
  document.querySelector('.end').style.display = "none";
  origBoard = Array.from(Array(9).keys()); // makes an array of 9 elements containing number 1-9
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerText = '';
    cell[i].style.removeProperty('background-color');
    document.addEventListener('click', click, false);
  }
}

function click(e) {
  turn(e.target.id, user);
}

function turn(ID, player) {
  origBoard[ID] = player;
  document.getElementById(ID).innerText = player;
}
