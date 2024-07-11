const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const gameTitle = document.getElementById("game-title");
const gameTitle2 = document.getElementById("game-title-2");

let cards;
let interval;
let firstCard = false;
let secondCard = false;
let totalCardsNo = 24;
let totalRows = 4;
let totalColumns = 6;
let secondsValue;
let minutesValue;

//Items array
const items = [
    {name: "bee", image: "bee.png"},
    {name: "crocodile", image: "crocodile.png"},
    {name: "anaconda", image: "anaconda.png"},
    {name: "bamboo", image: "bamboo.png"},
    {name: "beetle", image: "beetle.png"},
    {name: "bird", image: "bird.png"},
    {name: "butterfly", image: "butterfly.png"},
    {name: "chameleon", image: "chameleon.png"},
    {name: "compass", image: "compass.png"},
    {name: "flower", image: "flower.png"},
    {name: "gorilla", image: "gorilla.png"},
    {name: "hibiscus", image: "hibiscus.png"},
    {name: "mushroom", image: "mushroom.png"},
    {name: "panther", image: "panther.png"},
    {name: "snail", image: "snail.png"},
    {name: "toucan", image: "toucan.png"},
];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = totalCardsNo) => {
  // Calculate pairs
  const numPairs = size / 2;

  // Temporary array
  let tempArray = [...items];

  // Initialize cardValues array
  let cardValues = [];

  // Random object selection
  for (let i = 0; i < numPairs; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, rows = totalRows, cols = totalColumns) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues]; // Double the array for pairs
  cardValues.sort(() => Math.random() - 0.5); // Shuffle the cards

  // Ensure the grid is filled correctly based on the fixed size
  const totalCards = rows * cols;
  for (let i = 0; i < totalCards; i++) {
    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image"/>
        </div>
      </div>
    `;
  }
  // Grid
  gameContainer.style.gridTemplateColumns = `repeat(${cols}, auto)`;

  // Cards
//   cards = document.querySelectorAll(".card-container");
//   cards.forEach((card) => {
//     card.addEventListener("click", () => {
//       if (!card.classList.contains("matched")) {
//         card.classList.add("flipped");
//         if (!firstCard) {
//           firstCard = card;
//           firstCardValue = card.getAttribute("data-card-value");
//         } else {
//           movesCounter();
//           secondCard = card;
//           let secondCardValue = card.getAttribute("data-card-value");
//           if (firstCardValue == secondCardValue) {
//             firstCard.classList.add("matched");
//             secondCard.classList.add("matched");
//             firstCard = false;
//             winCount += 1;
//             if (winCount == totalCardsNo / 2) {
//               result.innerHTML = `
//                 <h2>Mubarakaaaaa!!</h2>
//                 <h2>Tusi Jeet Gye Ho 🎉</h2>
//                 <h4>Total Moves: ${movesCount}<br>Total Time: ${minutesValue}:${secondsValue}</h4>
//                 `;
//               stopGame();
//             }
//           } else {
//             let [tempFirst, tempSecond] = [firstCard, secondCard];
//             firstCard = false;
//             secondCard = false;
//             let delay = setTimeout(() => {
//               tempFirst.classList.remove("flipped");
//               tempSecond.classList.remove("flipped");
//             }, 900);
//           }
//         }
//       }
//     });
//   });
// };

cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == totalCardsNo / 2) {
              result.innerHTML = `
                <h2>Mubarakaaaaa!!</h2>
                <h2>Tusi Jeet Gye Ho 🎉</h2>
                <h4>Total Moves: ${movesCount}<br>Total Time: ${minutesValue}:${secondsValue}</h4>
                `;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};


//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls and buttons visibility
  gameTitle.classList.add("hide");
  gameTitle2.classList.add("hide");
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    gameTitle.classList.remove("hide");
    gameTitle2.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom(totalCardsNo);
  console.log(cardValues);
  matrixGenerator(cardValues, totalRows, totalColumns);
};
