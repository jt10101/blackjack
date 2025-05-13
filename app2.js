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
};

//---------------------------- Cached Elements ----------------------------//

const hitButtonElement = document.getElementById("hit");
const standButtonElement = document.getElementById("stand");
const betButtonElement = document.getElementById("bet");
const betAmount = document.getElementById("bet-amount"); // text input field for bet
let activeplayer = gamestate.turn;

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
const turnInit = () => {
  const findFirstactive = game.findIndex((player) => player.state === "active");
  gamestate.turn = findFirstactive;
};

/* Player Action Functions */
const betActions = () => {
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
  console.log(game);
};

const standActions = () => {
  if (gamestate.turn < game.length - 2) {
    gamestate.turn++;
    betAmount.removeAttribute("disabled", "");
    betButtonElement.removeAttribute("disabled", "");
    hitButtonElement.setAttribute("disabled", "");
    standButtonElement.setAttribute("disabled", "");
    // renderMsg();
  } else {
    hitButtonElement.setAttribute("disabled", "");
    standButtonElement.setAttribute("disabled", "");
    console.log("dealer's turn");
    // dealerValue();
    // dealerActions();
  }
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

    //render bet amount on each player's detail frame
    // const playerBet = document.getElementById(`bet-${game.turn}`);
    // playerBet.textContent = `Bet Amount: $ ${game.betAmount[activeplayer]}`;
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

/* Set Active Player function */
// const setActivePlayer = () => {
//   for (let i = 0; i < game.length - 1; i++) {
//     if (game[activeplayer].state === "active") {

//     }
//   }
// };

//---------------------------- Event Listeners ----------------------------//

betButtonElement.addEventListener("click", betActions);
// hitButtonElement.addEventListener("click", hitActions);
standButtonElement.addEventListener("click", standActions);

//---------------------------- Main Function ----------------------------//

const main = () => {
  turnInit();
  shuffle();
  dealcards();
};
main();
