let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
};

document.querySelector(
  ".js-score"
).innerHTML = `Wins:${score.wins} Losses:${score.losses}`;

const results = document.querySelector(".js-result");
const moves = document.querySelector(".js-moves");

document.querySelector(".head-button").addEventListener("click", () => {
  playGame("heads");
});

document.querySelector(".tail-button").addEventListener("click", () => {
  playGame("tails");
});

document.querySelector(".reset").addEventListener("click", () => {
  resetScore();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    playGame("heads");
  } else if (event.key === "t") {
    playGame("tails");
  } else if (event.key === "Backspace") {
    resetScore();
  } else if (event.key === "a") {
    autoPlay();
    updateScore();
  }
});

function resetScore() {
  let confirm = document.querySelector(".confirmation");
  const html = `<span>Are you sure you want to reset the score?</span>
    <button class="yes">Yes</button>
    <button class="no">No</button>`;
  confirm.innerHTML = html;

  document.querySelector(".yes").addEventListener("click", () => {
    score.wins = 0;
    score.losses = 0;
    localStorage.removeItem("score");
    results.innerHTML = "";
    moves.innerHTML = "";
    updateScore();
    confirm.innerHTML = "";
  });
  document.querySelector(".no").addEventListener("click", () => {
    confirm.innerHTML = "";
  });
}

const guess = ["heads", "tails"];

const compPlays = () => {
  const number = Math.random();
  const compPlay = guess[Math.round(number)];
  return compPlay;
};

function playGame(value) {
  const computerPlay = compPlays();
  if (value === computerPlay) {
    score.wins += 1;
    results.innerHTML = "You Win!";
    moves.innerHTML = `You chose <img class="heads" src="./images/${value}.png" alt="head" /> and it is <img class="heads" src="./images/${computerPlay}.png" alt="tail" />`;
    localStorage.setItem("score", JSON.stringify(score));
    updateScore();
  } else {
    score.losses += 1;
    results.innerHTML = "You Lose!";
    moves.innerHTML = `You chose <img class="heads" src="./images/${value}.png" alt="head" /> and it is <img class="heads" src="./images/${computerPlay}.png" alt="tail" />`;
    localStorage.setItem("score", JSON.stringify(score));
    updateScore();
  }
}

const updateScore = () => {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins} Losses:${score.losses}`;
};

let isAutoPlaying = false;
let intervalId;

const autoButton = document.querySelector(".autoPlay");

autoButton.addEventListener("click", () => {
  autoPlay();

  updateScore();
});

const autoPlay = () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      let playerMove = compPlays();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoButton.innerHTML = "Stop";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoButton.innerHTML = "Auto Play";
  }
};
