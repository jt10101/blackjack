import { gameCardsDetails, deck } from "./carddeck";

const game = [
  { state: "active", cards: [], cardvalue: 0, money: 100, betamount: 0 }, // Player 1 properties
  { state: "active", cards: [], cardvalue: 0, money: 100, betamount: 0 }, // Player 2 properties
  { state: "inactive", cards: [], cardvalue: 0, money: 100, betamount: 0 }, // Player 3 properties
  { state: "dealer", cards: [], cardvalue: 0 }, // Dealer properties
];

const gamestate = {
  turn: 1, // 0 = p1, 1 = p2, 2 = p3 ...
};

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

/* Player Action Functions */
// const betActions = () => {
//   let activeplayer = `player${game.turn}`;
//   if (
//     betAmount.value <= 0 ||
//     betAmount.value > game.playerMoney[activeplayer]
//   ) {
//     console.log("Not enough money");
//     return;
//   } else {
//     game.betAmount[activeplayer] = Number(betAmount.value);
//     // disables betting functions + enables HIT and stand buttons
//     betAmount.setAttribute("disabled", "");
//     betButtonElement.setAttribute("disabled", "");
//     hitButtonElement.removeAttribute("disabled", "");
//     standButtonElement.removeAttribute("disabled", "");

//     // once a bet is locked in, we will display the first two cards + calculate the current hand value
//     render();
//     calcValue();
//   }
// };

/* Render Functions */
const render = () => {
  let activeplayer = gamestate.turn;
  for (let i = 0; i < game[activeplayer].cards.length; i++) {
    //render player cards
    const playerCards = document.getElementById(`${gamestate.turn}-${i + 1}`);
    let printCard = game[activeplayer].cards[i];
    let colorCard = gameCardsDetails[printCard].color;
    playerCards.textContent = gameCardsDetails[printCard].display;
    playerCards.setAttribute("class", `cardface ${colorCard}`);

    //render bet amount on each player's detail frame
    // const playerBet = document.getElementById(`bet-${game.turn}`);
    // playerBet.textContent = `Bet Amount: $ ${game.betAmount[activeplayer]}`;
  }
};

//---------------------------- Main Function ----------------------------//

const main = () => {
  shuffle();
  dealcards();
  render();
};

main();
console.log(game);
