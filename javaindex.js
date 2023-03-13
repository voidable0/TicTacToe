let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameover = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll("td");

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    let a = winningConditions[i][0];
    let b = winningConditions[i][1];
    let c = winningConditions[i][2];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.includes("")) {
    return null;
  } else {
    return "tie";
  }
}

function displayWinner(winner) {
  if (winner === "tie") {
    alert("It's a tie!");
  } else {
    alert(`${winner} wins!`);
  }
  gameover = true;
}

function handleClick(e) {
  let cell = e.target;
  let index = cell.getAttribute("id");
  if (board[index] === "" && !gameover) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    let winner = checkWin();
    if (winner) {
      displayWinner(winner);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function reset() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameover = false;
}