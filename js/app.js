// import { gameCardsDetails } from "./carddeck.js";
const gameCardsDetails = [
  { number: 0, suit: "♠", value: 1, display: "A♠", color: "black" },
  { number: 1, suit: "♠", value: 2, display: "2♠", color: "black" },
  { number: 2, suit: "♠", value: 3, display: "3♠", color: "black" },
  { number: 3, suit: "♠", value: 4, display: "4♠", color: "black" },
  { number: 4, suit: "♠", value: 5, display: "5♠", color: "black" },
  { number: 5, suit: "♠", value: 6, display: "6♠", color: "black" },
  { number: 6, suit: "♠", value: 7, display: "7♠", color: "black" },
  { number: 7, suit: "♠", value: 8, display: "8♠", color: "black" },
  { number: 8, suit: "♠", value: 9, display: "9♠", color: "black" },
  { number: 9, suit: "♠", value: 10, display: "10♠", color: "black" },
  { number: 10, suit: "♠", value: 10, display: "J♠", color: "black" }, // Jack
  { number: 11, suit: "♠", value: 10, display: "Q♠", color: "black" }, // Queen
  { number: 12, suit: "♠", value: 10, display: "K♠", color: "black" }, // King
  { number: 13, suit: "♦", value: 1, display: "A♦", color: "red" },
  { number: 14, suit: "♦", value: 2, display: "2♦", color: "red" },
  { number: 15, suit: "♦", value: 3, display: "3♠", color: "red" },
  { number: 16, suit: "♦", value: 4, display: "4♦", color: "red" },
  { number: 17, suit: "♦", value: 5, display: "5♦", color: "red" },
  { number: 18, suit: "♦", value: 6, display: "6♦", color: "red" },
  { number: 19, suit: "♦", value: 7, display: "7♦", color: "red" },
  { number: 20, suit: "♦", value: 8, display: "8♦", color: "red" },
  { number: 21, suit: "♦", value: 9, display: "9♦", color: "red" },
  { number: 22, suit: "♦", value: 10, display: "10♦", color: "red" },
  { number: 23, suit: "♦", value: 10, display: "J♦", color: "red" }, // Jack
  { number: 24, suit: "♦", value: 10, display: "Q♦", color: "red" }, // Queen
  { number: 25, suit: "♦", value: 10, display: "K♦", color: "red" }, // King
  { number: 26, suit: "♥", value: 1, display: "A♥", color: "red" },
  { number: 27, suit: "♥", value: 2, display: "2♥", color: "red" },
  { number: 28, suit: "♥", value: 3, display: "3♥", color: "red" },
  { number: 29, suit: "♥", value: 4, display: "4♥", color: "red" },
  { number: 30, suit: "♥", value: 5, display: "5♥", color: "red" },
  { number: 31, suit: "♥", value: 6, display: "6♥", color: "red" },
  { number: 32, suit: "♥", value: 7, display: "7♥", color: "red" },
  { number: 33, suit: "♥", value: 8, display: "8♥", color: "red" },
  { number: 34, suit: "♥", value: 9, display: "9♥", color: "red" },
  { number: 35, suit: "♥", value: 10, display: "10♥", color: "red" },
  { number: 36, suit: "♥", value: 10, display: "J♥", color: "red" }, // Jack
  { number: 37, suit: "♥", value: 10, display: "Q♥", color: "red" }, // Queen
  { number: 38, suit: "♥", value: 10, display: "K♥", color: "red" }, // King
  { number: 39, suit: "♣", value: 1, display: "A♣", color: "black" },
  { number: 40, suit: "♣", value: 2, display: "2♣", color: "black" },
  { number: 41, suit: "♣", value: 3, display: "3♣", color: "black" },
  { number: 42, suit: "♣", value: 4, display: "4♣", color: "black" },
  { number: 43, suit: "♣", value: 5, display: "5♣", color: "black" },
  { number: 44, suit: "♣", value: 6, display: "6♣", color: "black" },
  { number: 45, suit: "♣", value: 7, display: "7♣", color: "black" },
  { number: 46, suit: "♣", value: 8, display: "8♣", color: "black" },
  { number: 47, suit: "♣", value: 9, display: "9♣", color: "black" },
  { number: 48, suit: "♣", value: 10, display: "10♣", color: "black" },
  { number: 49, suit: "♣", value: 10, display: "J♣", color: "black" }, // Jack
  { number: 50, suit: "♣", value: 10, display: "Q♣", color: "black" }, // Queen
  { number: 51, suit: "♣", value: 10, display: "K♣", color: "black" }, // King
];

//---------------------------- Constants ----------------------------//

const game = [
  {
    playerID: 1,
    state: "active",
    cards: [],
    cardvalue: 0,
    money: 100,
    betamount: 0,
    conclusion: "",
  }, // Player 1 properties
  {
    playerID: 2,
    state: "active",
    cards: [],
    cardvalue: 0,
    money: 100,
    betamount: 0,
    conclusion: "",
  }, // Player 2 properties
  {
    playerID: 3,
    state: "active",
    cards: [],
    cardvalue: 0,
    money: 100,
    betamount: 0,
    conclusion: "",
  }, // Player 3 properties
  { state: "dealer", cards: [], cardvalue: 0 }, // Dealer properties
];

const gamestate = {
  turn: 0, // 0 = p1, 1 = p2, 2 = p3 ...
  message: "Player 1 Turn!",
  round: 1,
  totalround: 3,
  leaderboard: [],
  ranking: [],
};

const initialDeck = Array.from({ length: 52 }, (_, i) => i); // I took this code from somewhere, will find source in abit

//---------------------------- Variables ----------------------------//
let deck = [...initialDeck];

//---------------------------- Cached Elements ----------------------------//

const hitButtonElement = document.getElementById("hit");
const standButtonElement = document.getElementById("stand");
const betButtonElement = document.getElementById("bet");
const betAmount = document.getElementById("bet-amount"); // text input field for bet
const gameMessage = document.getElementById("gamemessage"); // game message field
const nextButton = document.getElementById("nextgame");
const roundText = document.getElementById("roundnumber");
const startButton = document.getElementById("start");
const startPage = document.getElementById("startpageid");
const gamePage = document.getElementById("gameboardid");

// Scoreboard elements
const firstPlace = document.querySelector(".firstplace");
const secondPlace = document.querySelector(".secondplace");
const thirdPlace = document.querySelector(".thirdplace");

// Instructions elements
const howToButton = document.getElementById("howto");
const returnButton = document.querySelector(".returntomain");
const howToPage = document.querySelector(".howtopage");

// Game Summary Page
const summaryPage = document.getElementById("summarypage");

// Sounds
const shuffleSound = document.getElementById("shufflesound");

//---------------------------- Sub Functions ----------------------------//
/* Start game */
const startGame = () => {
  startPage.hidden = true;
  gamePage.hidden = false;
  shuffleSound.play();
  shuffleSound.playbackRate = 1.5;
};

const howTo = () => {
  startPage.hidden = true;
  howToPage.hidden = false;
};

const returnMain = () => {
  howToPage.hidden = true;
  startPage.hidden = false;
};

/* Init Functions */
// https://javascript.info/task/shuffle
const shuffle = () => {
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(deck);
};

const dealcards = () => {
  for (let i = 0; i < 2; i++) {
    // runs 2 times to deal 2 cards
    for (let i = 0; i < game.length; i++) {
      if (game[i].state === "active" || game[i].state === "dealer") {
        game[i].cards.push(deck[0]); // pushes next card to player
        deck.splice(0, 1); // removes dealt card from deck
      }
    }
  }
};

// this function is needed to allow for when player 1's money value is $0 at the start of a new hand
const setTurn = () => {
  const findFirstactive = game.findIndex((player) => player.state === "active");
  gamestate.turn = findFirstactive;
};

/* Player Action Functions */
const betActions = () => {
  let activeplayer = gamestate.turn;
  if ((game[activeplayer].state = "active")) {
    if (betAmount.value <= 0 || betAmount.value > game[activeplayer].money) {
      gamestate.message = "Not enough money";
      renderMsg();
      return;
    } else {
      game[activeplayer].betamount = Number(betAmount.value);
      // disables betting functions + enables HIT and stand buttons
      betAmount.disabled = true;
      betButtonElement.disabled = true;
      hitButtonElement.disabled = false;
      standButtonElement.disabled = false;
      // once a bet is locked in, we will display the first two cards + calculate the current hand value
      render();
      renderMsg();
      calcValue();
    }
  }
  // console.log(gamestate);
};
const hitActions = () => {
  let activeplayer = gamestate.turn;
  game[activeplayer].cards.push(deck[0]);
  deck.splice(0, 1);
  render();
  calcValue();
  if (
    game[activeplayer].cardvalue >= 21 ||
    game[activeplayer].cards.length > 4
  ) {
    hitButtonElement.disabled = true;
  }
};
const standActions = () => {
  let activeplayer = gamestate.turn;
  game[activeplayer].state = "over";
  if (gamestate.turn < game.length - 2) {
    setTurn();
    betAmount.disabled = false;
    betButtonElement.disabled = false;
    hitButtonElement.disabled = true;
    standButtonElement.disabled = true;
    gamestate.message = `Player ${gamestate.turn + 1} Turn!`;
    renderMsg();
  } else {
    hitButtonElement.disabled = true;
    standButtonElement.disabled = true;
    gamestate.message = `Dealer's Turn!`;
    dealerActions();
    nextButton.disabled = false;
  }
  console.log(gamestate);
  console.log(game);
  renderMsg();
};

/* Dealer Actions */
const dealerDecision = () => Math.floor(Math.random() * 5); // function returns value between 0 and 4

const dealerActions = () => {
  while (game[game.length - 1].cardvalue < 16) {
    // dealer definitely draws a card when hand value is below 16
    game[game.length - 1].cards.push(deck[0]);
    deck.splice(0, 1);
    dealerValue();
  }
  if (game[game.length - 1].cardvalue < 21) {
    let x = dealerDecision();
    if (x <= 1) {
      // 40% chance for dealer to draw a card when they have a hand value between 15 and 21
      game[game.length - 1].cards.push(deck[0]);
      deck.splice(0, 1);
      dealerValue();
      console.log(x);
    }
  }

  dealerRender();
  settlement();
  leaderboard();
  rankingRender();
  renderRoundDetails();
  if (gamestate.round === gamestate.totalround) {
    summary();
  }
};

/* Settlement Function */
const settlement = () => {
  for (let i = 0; i < game.length - 1; i++) {
    if (
      game[i].cardvalue === game[game.length - 1].cardvalue ||
      (game[i].cardvalue > 21 && game[game.length - 1].cardvalue > 21)
    ) {
      game[i].conclusion = "DRAW";
    } else if (
      (game[i].cardvalue > game[game.length - 1].cardvalue &&
        game[i].cardvalue <= 21) ||
      (game[i].cardvalue < game[game.length - 1].cardvalue &&
        game[game.length - 1].cardvalue > 21)
    ) {
      game[i].money += game[i].betamount;
      game[i].conclusion = `WIN +`;
    } else {
      game[i].conclusion = `LOSE -`;
      game[i].money -= game[i].betamount;
    }
  }
  render();
  leaderboard();
};

/* Render Functions */
const render = () => {
  let activeplayer = gamestate.turn;
  for (let i = 0; i < game[activeplayer].cards.length; i++) {
    //render player cards
    const playerCards = document.getElementById(
      `${gamestate.turn + 1}-${i + 1}`
    );
    let printCard = game[activeplayer].cards[i];
    let colorCard = gameCardsDetails[printCard].color;
    playerCards.textContent = gameCardsDetails[printCard].display;
    playerCards.setAttribute("class", `cardface ${colorCard}`);
  }
  //render bet amount
  const playerBet = document.getElementById(`bet-${gamestate.turn + 1}`);
  playerBet.textContent = `Bet Amount: $ ${game[activeplayer].betamount}`;

  //render money balance
  for (let i = 0; i < game.length - 1; i++) {
    let playerMoney = document.getElementById(`m-${i + 1}`);
    playerMoney.textContent = `$${game[i].money}`;
  }

  //render message
  gameMessage.textContent = gamestate.message;
};

const renderMsg = () => {
  gameMessage.textContent = gamestate.message;
  roundText.textContent = `Round ${gamestate.round} of ${gamestate.totalround}`;
};

const renderRoundDetails = () => {
  for (let i = 0; i < game.length - 1; i++) {
    let x = document.getElementById(`wl-${i + 1}`);
    x.textContent = `${game[i].conclusion} $${game[i].betamount}`;
    if (game[i].conclusion === "WIN +") {
      x.setAttribute("class", "winmessage");
    } else if (game[i].conclusion === "LOSE -") {
      x.setAttribute("class", "losemessage");
    } else x.setAttribute("class", "drawmesage");
  }
};

const dealerRender = () => {
  for (let i = 0; i < game[game.length - 1].cards.length; i++) {
    //render dealer cards
    const dealerCards = document.getElementById(`d-${i + 1}`);
    let printCard = game[game.length - 1].cards[i];
    let colorCard = gameCardsDetails[printCard].color;
    dealerCards.textContent = gameCardsDetails[printCard].display;
    dealerCards.setAttribute("class", `cardface ${colorCard}`);
  }
};

const rankingRender = () => {
  firstPlace.textContent = `#1 ${gamestate.ranking[0]}`;
  secondPlace.textContent = `#2 ${gamestate.ranking[1]}`;
  thirdPlace.textContent = `#3 ${gamestate.ranking[2]}`;
};

const resetRender = () => {
  for (let i = 0; i < game.length - 1; i++) {
    if (game[i].state === "active") {
      for (let j = 1; j < 3; j++) {
        let x = document.getElementById(`${i + 1}-${j}`);
        x.textContent = "";
        x.setAttribute("class", "cardback");
      }
      for (let j = 3; j < 6; j++) {
        let x = document.getElementById(`${i + 1}-${j}`);
        x.textContent = "";
        x.setAttribute("class", "cardempty");
      }
    } else if (game[i].state === "inactive") {
      for (let j = 1; j < 3; j++) {
        let x = document.getElementById(`${i + 1}-${j}`);
        x.textContent = "";
        x.setAttribute("class", "cardempty");
      }
      for (let j = 3; j < 6; j++) {
        let x = document.getElementById(`${i + 1}-${j}`);
        x.textContent = "";
        x.setAttribute("class", "cardempty");
      }
    }
  }
  for (let i = 1; i < 3; i++) {
    let x = document.getElementById(`d-${i}`);
    x.textContent = "";
    x.setAttribute("class", "cardback");
  }
  for (let i = 3; i < 6; i++) {
    let x = document.getElementById(`d-${i}`);
    x.textContent = "";
    x.setAttribute("class", "cardempty");
  }
  for (let i = 0; i < game.length - 1; i++) {
    let x = document.getElementById(`bet-${i + 1}`);
    x.textContent = `Bet Amount:`;
  }
  for (let i = 0; i < game.length - 1; i++) {
    let x = document.getElementById(`wl-${i + 1}`);
    x.textContent = "";
  }
  gamestate.message = "Player 1 Turn!";
};

/* Calculate Value of hand */
const calcValue = () => {
  let activeplayer = gamestate.turn;
  let sumTotal = 0;
  for (let i = 0; i < game[activeplayer].cards.length; i++) {
    //calculate value of hand
    let printCard = game[activeplayer].cards[i];
    let valueCard = gameCardsDetails[printCard].value;
    sumTotal += valueCard;
    game[activeplayer].cardvalue = sumTotal;
  }
};

const dealerValue = () => {
  let handtotal = 0;
  let x;
  for (let i = 0; i < game[game.length - 1].cards.length; i++) {
    handtotal += gameCardsDetails[game[game.length - 1].cards[i]].value;
  }
  game[game.length - 1].cardvalue = handtotal;
};

const nextGame = () => {
  deck = [...initialDeck];
  shuffle();
  for (let i = 0; i < game.length; i++) {
    game[i].cards = [];
    game[i].cardvalue = 0;
    game[i].betamount = 0;
    if (i < game.length - 1 && game[i].money <= 0) {
      game[i].state = "inactive";
    } else if (i < game.length - 1) {
      game[i].state = "active";
    } else {
      game[i].state = "dealer";
    }
  }
  gamestate.round++;
  setTurn();
  resetRender();
  renderMsg();
  resetleaderboard();
  betAmount.disabled = false;
  betButtonElement.disabled = false;
  hitButtonElement.disabled = true;
  standButtonElement.disabled = true;
  nextButton.disabled = true;
  shuffleSound.play();
  shuffleSound.playbackRate = 1.5;

  dealcards();
};

/* Leaderboard functions */
const leaderboard = () => {
  for (let i = 0; i < game.length - 1; i++) {
    gamestate.leaderboard.push(game[i].money);
  }
  for (let i = 0; i < gamestate.leaderboard.length; i++) {
    let sortPlayerIndex = gamestate.leaderboard.indexOf(
      Math.max(...gamestate.leaderboard)
    );
    let sortPlayer = `Player ${sortPlayerIndex + 1} : $${Math.max(
      ...gamestate.leaderboard
    )}`;
    gamestate.ranking.push(sortPlayer);
    gamestate.leaderboard[sortPlayerIndex] = 0;
  }
};

const resetleaderboard = () => {
  gamestate.leaderboard.length = 0;
  gamestate.ranking.length = 0;
};

/* Summary Page */
const summary = () => {
  setTimeout(() => {
    summaryPage.hidden = false;
    gamePage.hidden = true;
  }, 3000);
};

//---------------------------- Event Listeners ----------------------------//

betButtonElement.addEventListener("click", betActions);
hitButtonElement.addEventListener("click", hitActions);
standButtonElement.addEventListener("click", standActions);
nextButton.addEventListener("click", nextGame);
startButton.addEventListener("click", startGame);
howToButton.addEventListener("click", howTo);
returnButton.addEventListener("click", returnMain);

//---------------------------- Main Function ----------------------------//

const init = () => {
  // setPlayerState();
  setTurn();
  shuffle();
  dealcards();
};

init();
