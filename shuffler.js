// list of numbers up to length of standard deck
const standardDeck = GenerateCards(52);
const standardDeckConverter = CreateStandardDeckConverter();

function GenerateCards(deckSize) {
  let result = [];

  for (let i = 0; i < deckSize; i++) {
    result.push(i);
  }

  return result;
}

function InitializeFreshDeck() {
  let currentDeck = standardDeck.slice();
  return currentDeck;
}

function GetRandomInt(maxValue) {
  return Math.floor(Math.random() * maxValue) + 1;
}

function ReturnFormattedSloppyShuffle(i) {
  var rawResult = SloppyShuffle(i, standardDeck);
  var result = ConvertDeck(rawResult, standardDeckConverter);

  return result;
}

// This is how I shuffle. Take some cards off top and bottom at once, then put 'em on top or bottom alternating.
function SloppyShuffle(iterations, deck) {
  // At least two or three cards should be left in the middle.
  let deckLength = deck.length;
  let maxCardsRemove = Math.floor(deckLength/2) - 1;

  for (let i = 0; i < iterations; i++) {
    let cardsToTakeOffTop = GetRandomInt(maxCardsRemove);
    let cardsToTakeOffBottom = GetRandomInt(maxCardsRemove);

    // Get part of the deck left behind
    let slicedDeck = deck.slice(cardsToTakeOffTop, deckLength - cardsToTakeOffBottom);

    // Get part of the deck taken off top and bottom
    let deckSliceTop = deck.slice(0, cardsToTakeOffTop);
    let deckSliceBottom = deck.slice(deckLength - cardsToTakeOffBottom);
    let deckSlice = deckSliceTop.concat(deckSliceBottom);

    if (i%2 === 0) {
      deck = slicedDeck.concat(deckSlice);
    }
    else {
      deck = deckSlice.concat(slicedDeck);
    }
  }

  return deck;
}

// Dictionary between a list of ints 0-51 to a list of corresponding cards.
function CreateStandardDeckConverter() {
  let result = {};

  for (let i = 0; i < 52; i++) {
    let card = ConvertNumberToCard(i);

    // cards as strings;
    //result[i] = ConvertCardToString(card);

    //cards as objects
    result[i] = card;
  }

  return result;
}

// num should be between 0 and 51
function ConvertNumberToCard(num) {
  // these two should totally be global or at least set in an external function. when I try that I'm running into problems, though
  let suits = ["Spades", "Diamonds", "Hearts", "Clubs"];
  let numbers = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

  let suit = suits[Math.floor(num/13)];
  let number = numbers[(num + 1) % 13];

  let result = {
    number: number,
    suit: suit
  };

  return result;
}

function ConvertCardToString(card) {
  let result = card.number + " of " + card.suit;

  return result;
}

function ConvertDeck(deck, converter) {
  let result = [];
  for (i = 0; i < deck.length; i++) {
    result.push(converter[deck[i]]);
  }

  return result;
}
