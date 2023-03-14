let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameover = false;
const cells = document.querySelectorAll("td");

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}

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
  cells.forEach(function (cell) {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
}
// FIX DARK MODE 
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", reset);
const chatOutput = document.getElementById("chat-output");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const themeBtn = document.getElementById("theme-btn");


let isDark = false;

function toggleTheme() {
  const body = document.getElementsByTagName("body")[0];
  if (isDark) {
    body.classList.remove("dark");
    themeBtn.textContent = "Switch to Dark Theme";
  } else {
    body.classList.add("dark");
    themeBtn.textContent = "Switch to Light Theme";
  }
  isDark = !isDark;
}

// add event listener to themeBtn element
themeBtn.addEventListener("click", toggleTheme);

function sendMessage() {
  const message = userInput.value;
  chatOutput.innerHTML += `<p>You: ${message}</p>`;
  userInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);
themeBtn.addEventListener("click", toggleTheme);

const activeUsers = [];

// Add user to active users list
function addUser(username) {
  activeUsers.push(username);
  localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
}

// Remove user from active users list
function removeUser(username) {
  const index = activeUsers.indexOf(username);
  if (index !== -1) {
    activeUsers.splice(index, 1);
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
  }
}

// Display active users list
function displayActiveUsers() {
  const activeUsersContainer = document.querySelector('#active-users ul');
  activeUsersContainer.innerHTML = '';
  activeUsers.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = user;
    activeUsersContainer.appendChild(listItem);
  });
}

// Retrieve active users from local storage on page load
function loadActiveUsers() {
  const storedActiveUsers = localStorage.getItem('activeUsers');
  if (storedActiveUsers) {
    activeUsers.push(...JSON.parse(storedActiveUsers));
    displayActiveUsers();
  }
}

// Add a new user to the active users list
const username = prompt('Please enter your username:');
addUser(username);

// Remove user from active users list when they leave the page
window.addEventListener('beforeunload', () => {
  removeUser(username);
});

// Display active users on page load
loadActiveUsers();
