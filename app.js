//--------------- card details ---------------//
import { gameCardsDetails, deck } from "./carddeck";
//--------------- constants ---------------//
const game = {
  turn: 1, // 1 = player1, 2 = player2, 3 = player 3
  cards: {
    player1: [],
    player2: [],
    player3: [],
    dealer: [],
  },
  cardValue: {
    player1: 0,
    player2: 0,
    player3: 0,
    dealer: 0,
  },
  playerMoney: {
    player1: 100,
    player2: 200,
    player3: 300,
  },
  betAmount: {
    player1: 0,
    player2: 0,
    player3: 0,
  },
  dealerturn: false,
  round: 0,
};

//--------------- cached elements ---------------//
const hitButtonElement = document.getElementById("hit");
const standButtonElement = document.getElementById("stand");
const betButtonElement = document.getElementById("bet");
const betAmount = document.getElementById("bet-amount");

//--------------- Functions ---------------//

const init = () => {
  // This function shuffles the deck of cards
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5); // https://javascript.info/task/shuffle
  }
  shuffle(deck);
  // console.log(deck); // checks deck after shuffle
  for (let i = 0; i < 4; i++) {
    let x = Object.values(game.cards)[i];
    x.push(deck[i]); // pushes first card
    x.push(deck[i + 4]); // pushes second card
  }
  deck.splice(0, 8); // removes the first 8 cards dealt during init from game deck
  // console.log(game.cards); // checks current state of each player's hand
  // console.log(deck); // check for deck state after init
};

const betActions = () => {
  let activeplayer = `player${game.turn}`;
  if (
    betAmount.value <= 0 ||
    betAmount.value > game.playerMoney[activeplayer]
  ) {
    console.log("Not enough money");
    return;
  } else {
    game.betAmount[activeplayer] = Number(betAmount.value);
    // disables betting functions + enables HIT and stand buttons
    betAmount.setAttribute("disabled", "");
    betButtonElement.setAttribute("disabled", "");
    hitButtonElement.removeAttribute("disabled", "");
    standButtonElement.removeAttribute("disabled", "");

    // once a bet is locked in, we will display the first two cards + calculate the current hand value
    render();
    calcValue();
  }
};

const hitActions = () => {
  let activeplayer = `player${game.turn}`;
  game.cards[activeplayer].push(deck[0]);
  deck.splice(0, 1);
  render();
  calcValue();
  if (
    game.cardValue[activeplayer] >= 21 ||
    game.cards[activeplayer].length > 4
  ) {
    hitButtonElement.setAttribute("disabled", "");
  }
};

const standActions = () => {
  if (game.turn < 3) {
    game.turn++;
    betAmount.removeAttribute("disabled", "");
    betButtonElement.removeAttribute("disabled", "");
    hitButtonElement.setAttribute("disabled", "");
    standButtonElement.setAttribute("disabled", "");
    renderMsg();
  }
  // WHEN DEALER ACTIONS BEGIN IS TIED TO THIS CONDITION //
  else {
    // game.dealerturn = true;
    hitButtonElement.setAttribute("disabled", "");
    standButtonElement.setAttribute("disabled", "");
    dealerValue();
    dealerActions();
  }
};

// all dealer actions are here:
const dealerRender = () => {
  for (let i = 0; i < game.cards.dealer.length; i++) {
    //render dealer cards
    const dealerCards = document.getElementById(`d-${i + 1}`);
    let printCard = game.cards.dealer[i];
    let colorCard = gameCardsDetails[printCard].color;
    dealerCards.textContent = gameCardsDetails[printCard].display;
    dealerCards.setAttribute("class", `cardface ${colorCard}`);
  }
};

const dealerActions = () => {
  while (game.cardValue.dealer <= 15) {
    game.cards.dealer.push(deck[0]);
    deck.splice(0, 1);
    dealerValue();
  }
  dealerRender();
  // game.dealerturn = false;
  console.log(game);
};

// render functions all here
// render cards
const render = () => {
  let activeplayer = `player${game.turn}`;
  for (let i = 0; i < game.cards[activeplayer].length; i++) {
    //render player cards
    const playerCards = document.getElementById(`${game.turn}-${i + 1}`);
    let printCard = game.cards[activeplayer][i];
    let colorCard = gameCardsDetails[printCard].color;
    playerCards.textContent = gameCardsDetails[printCard].display;
    playerCards.setAttribute("class", `cardface ${colorCard}`);

    //render bet amount on each player's detail frame
    const playerBet = document.getElementById(`bet-${game.turn}`);
    playerBet.textContent = `Bet Amount: $ ${game.betAmount[activeplayer]}`;
  }
};

// render messages
const renderMsg = () => {
  if (game.turn < 4) {
    const playerTurnMessage = document.querySelector("p");
    playerTurnMessage.textContent = `Player ${game.turn} Turn!`;
  }
};

// calculates hand value functions
const calcValue = () => {
  let handtotal = 0;
  let x;
  x = `player${game.turn}`;
  for (let i = 0; i < game.cards[x].length; i++) {
    handtotal += gameCardsDetails[game.cards[x][i]].value;
  }
  game.cardValue[x] = handtotal;
};

const dealerValue = () => {
  let handtotal = 0;
  let x;
  for (let i = 0; i < game.cards.dealer.length; i++) {
    handtotal += gameCardsDetails[game.cards.dealer[i]].value;
  }
  game.cardValue.dealer = handtotal;
};

//--------------- event listeners ---------------//
betButtonElement.addEventListener("click", betActions);
hitButtonElement.addEventListener("click", hitActions);
standButtonElement.addEventListener("click", standActions);

//--------------- main function ---------------//
const main = () => {
  //init function that shuffles and deals cards
  init();
};

main();
