import { gameCardsDetails } from "./carddeck.js";

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

const initialDeck = Array.from({ length: 52 }, (_, i) => i); // referenced W3schools

//---------------------------- Variables ----------------------------//
let deck = [...initialDeck];

//---------------------------- Cached Elements ----------------------------//

const hitButtonElement = document.getElementById("hit");
const standButtonElement = document.getElementById("stand");
const betButtonElement = document.getElementById("bet");
const betAmount = document.getElementById("bet-amount"); // text input field for bet
const gameMessage = document.getElementById("gamemessage"); // game message field
const roundText = document.getElementById("roundnumber");
const startButton = document.getElementById("start");
const startPage = document.getElementById("startpageid");
const gamePage = document.getElementById("gameboardid");
const nextButton = document.getElementById("nextgame");
const resetButton = document.getElementById("resetgame");

// Scoreboard elements
const firstPlace = document.querySelector(".firstplace");
const secondPlace = document.querySelector(".secondplace");
const thirdPlace = document.querySelector(".thirdplace");

// Instructions elements
const howToButton = document.getElementById("howto");
const returnButton = document.querySelector(".returntomain");
const howToPage = document.querySelector(".howtopage");

// Sounds
const shuffleSound = document.getElementById("shufflesound");
const bgmSong = document.getElementById("bgm");
const chipsSound = document.getElementById("chipssound");

// Audio
const volOn = document.getElementById("volumeon");
const volMute = document.getElementById("volumemute");

//---------------------------- Sub Functions ----------------------------//
/* Start game */
const startGame = () => {
  startPage.style.display = "none";
  gamePage.style.display = "flex";
  shuffleSound.play();
  shuffleSound.playbackRate = 1.5;
  shuffleSound.volume = 0.4;
  bgmSong.play();
  bgmSong.volume = 0.3;
};

const howTo = () => {
  startPage.style.display = "none";
  howToPage.style.display = "flex";
};

const returnMain = () => {
  startPage.style.display = "flex";
  howToPage.style.display = "none";
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

  if (
    betAmount.value <= 0 ||
    betAmount.value > game[activeplayer].money ||
    isNaN(betAmount.value)
  ) {
    gamestate.message = "Invalid Bet";
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
  if (
    gamestate.turn < game.length - 2 &&
    game[activeplayer + 1].state === "active"
  ) {
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
  }
  betAmount.value = "";
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
    }
  }
  if (gamestate.round >= gamestate.totalround) {
    dealerRender();
    settlement();
    rankingRender();
    end();
  } else {
    dealerRender();
    settlement();
    rankingRender();
    renderRoundDetails();
    nextButton.disabled = false;
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
  chipsSound.play();
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
  playerBet.textContent = `Bet: $ ${game[activeplayer].betamount}`;

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
    x.textContent = `Bet:`;
  }
  for (let i = 0; i < game.length - 1; i++) {
    let x = document.getElementById(`wl-${i + 1}`);
    x.textContent = "";
  }
  gamestate.message = `Player ${gamestate.turn + 1} Turn!`;
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
  shuffleSound.playbackRate = 2;

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
    ); // finds the index  (i.e. player number) of the player with the highest money balance
    let sortPlayer = `Player ${sortPlayerIndex + 1} : $${Math.max(
      ...gamestate.leaderboard
    )}`; // sets player number + money to gamestate.leaderboard array
    gamestate.ranking.push(sortPlayer);
    gamestate.leaderboard[sortPlayerIndex] = 0; // changes already sorted player's money to 0
  }
};

const resetleaderboard = () => {
  gamestate.leaderboard.length = 0;
  gamestate.ranking.length = 0;
};

/* End Game */
const end = () => {
  betAmount.disabled = true;
  betButtonElement.disabled = true;
  hitButtonElement.disabled = true;
  standButtonElement.disabled = true;
  nextButton.style.display = "none";
  resetButton.style.display = "block";
  resetleaderboard();
  for (let i = 0; i < game.length - 1; i++) {
    gamestate.leaderboard.push(game[i].money);
  }
  let winnerIndex = gamestate.leaderboard.indexOf(
    Math.max(...gamestate.leaderboard)
  );
  let winnerMessage = document.getElementById(`${winnerIndex + 1}-1`);
  winnerMessage.setAttribute("class", "winner");
  winnerMessage.textContent = "WINNER!";
  for (let i = 2; i < game[winnerIndex].cards.length + 1; i++) {
    let winnerCard = document.getElementById(`${winnerIndex + 1}-${i}`);
    winnerCard.setAttribute("class", "cardempty");
    winnerCard.textContent = "";
  }
};

/* Reset Game*/
const resetGame = () => {
  for (let i = 0; i < game.length - 1; i++) {
    game[i].state = "active";
    game[i].cards.length = 0;
    game[i].cardvalue = 0;
    game[i].money = 100;
    game[i].betamount = 0;
    game[i].conclusion = "";

    // render Bet Amounts back to 0
    const playerBet = document.getElementById(`bet-${i + 1}`);
    playerBet.textContent = `Bet: $ ${game[i].betamount}`;

    //render money balance
    let playerMoney = document.getElementById(`m-${i + 1}`);
    playerMoney.textContent = `$${game[i].money}`;

    //render cards back to start state for player
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
  }
  game[game.length - 1].state = "dealer";
  game[game.length - 1].cards.length = 0;
  game[game.length - 1].cardvalue = 0;

  for (let j = 1; j < 3; j++) {
    let x = document.getElementById(`d-${j}`);
    x.textContent = "";
    x.setAttribute("class", "cardback");
  }
  for (let j = 3; j < 6; j++) {
    let x = document.getElementById(`d-${j}`);
    x.textContent = "";
    x.setAttribute("class", "cardempty");
  }

  gamestate.turn = 0;
  gamestate.message = "Player 1 Turn!";
  gamestate.round = 1;
  gamestate.totalround = 3;
  gamestate.leaderboard.length = 0;
  gamestate.ranking.length = 0;

  firstPlace.textContent = "1#";
  secondPlace.textContent = "2#";
  thirdPlace.textContent = "#3";

  renderMsg();

  resetButton.style.display = "none";
  nextButton.style.display = "block";

  betAmount.disabled = false;
  betButtonElement.disabled = false;
  hitButtonElement.disabled = true;
  standButtonElement.disabled = true;
  nextButton.disabled = true;
  shuffleSound.play();
  shuffleSound.playbackRate = 2;

  deck = [...initialDeck];
  shuffle();
  dealcards();
};

// Audio Function
const volumeOn = () => {
  bgmSong.volume = 0.3;
  volMute.style.display = "flex";
  volOn.style.display = "none";
};

const volumeMute = () => {
  bgmSong.volume = 0;
  volMute.style.display = "none";
  volOn.style.display = "flex";
};

//---------------------------- Event Listeners ----------------------------//

betButtonElement.addEventListener("click", betActions);
hitButtonElement.addEventListener("click", hitActions);
standButtonElement.addEventListener("click", standActions);
nextButton.addEventListener("click", nextGame);
startButton.addEventListener("click", startGame);
howToButton.addEventListener("click", howTo);
returnButton.addEventListener("click", returnMain);
volOn.addEventListener("click", volumeOn);
volMute.addEventListener("click", volumeMute);
resetButton.addEventListener("click", resetGame);

//---------------------------- Main Function ----------------------------//

const init = () => {
  setTurn();
  shuffle();
  dealcards();
};

init();
