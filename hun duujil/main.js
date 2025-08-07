const alphabet = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
const answerlist = ["CUCKOO", "DIVE", "APPLE", "MANGO"];
let randomanswer;
let failscount = 0;
let hints = [];
let checked = [];
const keyboards = document.querySelector(".keyboards");
const fails = document.querySelector(".fails");
const img = document.getElementById("lol")
const showanswer = document.querySelector(".answer");

function checkletter(letter) {
  if (randomanswer.split("").includes(letter)) {
    if (!hints.includes(letter)) {
      hints.push(letter);
    }
  } else {
    failscount = failscount + 1;
    fails.textContent = failscount;
  }
  console.log("Image path:", `/images/${failscount}.jpg`);
  img.src = `/images/${failscount}.jpg`;
  checkcorrect();
  checkgameover();
  checkwin();
}

function checkgameover() {
  if (failscount === 7) {
    setTimeout(() => {
      alert("Game Over");
      startgame();
    }, 100);
  }
}

function checkwin() {
  const uniqueLetters = Array.from(new Set(randomanswer.split("")));
  const allGuessed = uniqueLetters.every((l) => hints.includes(l));
  if (allGuessed) {
    setTimeout(() => {
      alert("You Win!");
      startgame();
    }, 100);
  }
}

function checkcorrect() {
  const answerletters = document.querySelector(".answer").childNodes;
  for (let i = 0; i < randomanswer.length; i++) {
    if (hints.includes(randomanswer[i])) {
      answerletters[i].textContent = randomanswer[i];
      answerletters[i].className = "";
    }
  }
}

for (let i = 0; i < alphabet.length; i++) {
  const lettercontainer = document.createElement("div");
  lettercontainer.className = "lcon";
  for (let j = 0; j < alphabet[i].length; j++) {
    const letter = document.createElement("div");
    letter.textContent = alphabet[i][j];
    letter.className = "letter";
    letter.addEventListener("click", function () {
      checkletter(alphabet[i][j]);
      letter.classList.add("pressed");
      letter.style.pointerEvents = "none";
    });
    lettercontainer.appendChild(letter);
  }
  keyboards.appendChild(lettercontainer);
}

function startgame() {
  randomanswer = answerlist[Math.floor(Math.random() * answerlist.length)];
  hints = [];
  checked = [];
  failscount = 0;
  fails.textContent = failscount;
  img.src = `/images/${failscount}.jpg`;
  const showanswer = document.querySelector(".answer");
  showanswer.innerHTML = "";
  for (let i = 0; i < randomanswer.length; i++) {
    const underline = document.createElement("div");
    underline.className = "underline";
    showanswer.appendChild(underline);
  }
  document.querySelectorAll(".letter").forEach((l) => {
    l.classList.remove("pressed");
    l.style.pointerEvents = "";
  });
}

startgame();