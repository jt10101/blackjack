import { gameCardsDetails, deck } from "./carddeck";

//---------------------------- Constants ----------------------------//

const game = [
  { state: "active", cards: [], cardvalue: 0, money: 100, betamount: 0 }, // Player 1 properties
  { state: "inactive", cards: [], cardvalue: 0, money: 100, betamount: 0 }, // Player 2 properties
  { state: "active", cards: [], cardvalue: 0, money: 100, betamount: 0 }, // Player 3 properties
  { state: "dealer", cards: [], cardvalue: 0 }, // Dealer properties
];

const gamestate = {
  turn: 0, // 0 = p1, 1 = p2, 2 = p3 ...
  message: "",
};

//---------------------------- Cached Elements ----------------------------//

const hitButtonElement = document.getElementById("hit");
const standButtonElement = document.getElementById("stand");
const betButtonElement = document.getElementById("bet");
const betAmount = document.getElementById("bet-amount"); // text input field for bet
const gameMessage = document.querySelector("p"); // game message field

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

/* Player Action Functions */
const betActions = () => {
  let activeplayer = gamestate.turn;
  if ((game[activeplayer].state = "active")) {
    if (betAmount.value <= 0 || betAmount.value > game[activeplayer].money) {
      console.log("Not enough money");
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

//---------------------------- Event Listeners ----------------------------//

betButtonElement.addEventListener("click", betActions);
hitButtonElement.addEventListener("click", hitActions);
standButtonElement.addEventListener("click", standActions);

//---------------------------- Main Function ----------------------------//

const main = () => {
  setTurn();
  shuffle();
  dealcards();
};
main();
