//--------------- card details ---------------//

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
const deck = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
];

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
