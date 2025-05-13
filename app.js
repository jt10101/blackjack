import { gameCardsDetails } from "./carddeck";

//---------------------------- Constants ----------------------------//

const game = [
  {
    state: "active",
    cards: [],
    cardvalue: 0,
    money: 100,
    betamount: 0,
  }, // Player 1 properties
  {
    state: "active",
    cards: [],
    cardvalue: 0,
    money: 100,
    betamount: 0,
  }, // Player 2 properties
  {
    state: "active",
    cards: [],
    cardvalue: 0,
    money: 100,
    betamount: 0,
  }, // Player 3 properties
  { state: "dealer", cards: [], cardvalue: 0 }, // Dealer properties
];

const gamestate = {
  turn: 0, // 0 = p1, 1 = p2, 2 = p3 ...
  message: "",
  round: 1,
  totalround: 2,
};

const initialDeck = Array.from({ length: 52 }, (_, i) => i);

//---------------------------- Variables ----------------------------//
let deck = [...initialDeck];

//---------------------------- Cached Elements ----------------------------//

const hitButtonElement = document.getElementById("hit");
const standButtonElement = document.getElementById("stand");
const betButtonElement = document.getElementById("bet");
const betAmount = document.getElementById("bet-amount"); // text input field for bet
const gameMessage = document.querySelector("p"); // game message field
const nextButton = document.getElementById("nextgame");

//---------------------------- Sub Functions ----------------------------//

/* Init Functions */
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

const setPlayerState = () => {
  for (let i = 0; i < game.length - 1; i++) {
    if (game[i].money >= 0) {
      game[i].state = "Active";
    } else {
      game[i].state = "Inactive";
    }
  }
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
      betAmount.setAttribute("disabled", "");
      betButtonElement.setAttribute("disabled", "");
      hitButtonElement.removeAttribute("disabled", "");
      standButtonElement.removeAttribute("disabled", "");

      // once a bet is locked in, we will display the first two cards + calculate the current hand value
      render();
      renderMsg();
      calcValue();
    }
  }
};
const hitActions = () => {
  let activeplayer = gamestate.turn;
  game[activeplayer].cards.push(deck[0]);
  deck.splice(0, 1);
  render();
  calcValue();
  if (
    game[activeplayer].cardValue >= 21 ||
    game[activeplayer].cards.length > 4
  ) {
    hitButtonElement.setAttribute("disabled", "");
  }
};
const standActions = () => {
  let activeplayer = gamestate.turn;
  game[activeplayer].state = "over";
  if (gamestate.turn < game.length - 2) {
    setTurn();
    betAmount.removeAttribute("disabled", "");
    betButtonElement.removeAttribute("disabled", "");
    hitButtonElement.setAttribute("disabled", "");
    standButtonElement.setAttribute("disabled", "");
    gamestate.message = `Player ${gamestate.turn + 1} Turn!`;
  } else {
    hitButtonElement.setAttribute("disabled", "");
    standButtonElement.setAttribute("disabled", "");
    gamestate.message = `Dealer's Turn!`;
    dealerActions();
  }
  renderMsg();
};

/* Dealer Actions */
const dealerActions = () => {
  while (game[game.length - 1].cardvalue <= 15) {
    game[game.length - 1].cards.push(deck[0]);
    deck.splice(0, 1);
    dealerValue();
  }
  dealerRender();
  settlement();
  console.log(game);
};

/* Settlement Function */
const settlement = () => {
  for (let i = 0; i < game.length - 1; i++) {
    if (
      game[i].cardvalue === game[game.length - 1].cardvalue ||
      (game[i].cardvalue > 21 && game[game.length - 1].cardvalue > 21)
    ) {
    } else if (
      (game[i].cardvalue > game[game.length - 1].cardvalue &&
        game[i].cardvalue <= 21) ||
      (game[i].cardvalue < game[game.length - 1].cardvalue &&
        game[game.length - 1].cardvalue > 21)
    ) {
      game[i].money += game[i].betamount;
    } else game[i].money -= game[i].betamount;
  }
  render();
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
};

const renderMsg = () => {
  gameMessage.textContent = gamestate.message;
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
  setTurn();
  resetRender();
  betAmount.disabled = false;
  betButtonElement.disabled = false;
  hitButtonElement.disabled = true;
  standButtonElement.disabled = true;
  dealcards();
};

//---------------------------- Event Listeners ----------------------------//

betButtonElement.addEventListener("click", betActions);
hitButtonElement.addEventListener("click", hitActions);
standButtonElement.addEventListener("click", standActions);
nextButton.addEventListener("click", nextGame);
//---------------------------- Main Function ----------------------------//

const init = () => {
  // setPlayerState();
  setTurn();
  shuffle();
  dealcards();
};

init();
