// SETTING CONSTANTS
// list of numbers up to length of standard deck
const standardDeck = GenerateCards(52);
const standardDeckConverter = CreateStandardDeckConverter();

// Initializations and utilities
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

// Converters
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

// Sloppy shuffle functions:
// This is how I shuffle. Take some cards off top and bottom at once, then put 'em on top or bottom alternating.
function ReturnFormattedSloppyShuffle(i) {
  var rawResult = SloppyShuffle(i, standardDeck);
  var result = ConvertDeck(rawResult, standardDeckConverter);

  return result;
}

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

// Pile shuffle functions
function ReturnFormattedPileShuffle(iterations, pileCount, deck) {
  let rawResult = PileShuffle(iterations, pileCount, deck);

  var result = ConvertDeck(rawResult, standardDeckConverter);
  return result;
}

function PileShuffleOnce(pileCount, deck) {
  let deckLength = deck.length;
  let result = [];
  let pileCollection = [];

  //initialize pile collection
  for (let h = 0; h < pileCount; h++) {
    pileCollection.push([]);
  }

  // organize cards into piles within pileCollection
  for (let i = 0; i < deckLength; i++) {
    pileCollection[i%pileCount].push(deck[i]);
  }

  // randomly put the piles together in a stack
  for (let j = 0; j < pileCount; j++) {
    let selectedPile = GetRandomInt(pileCount - j) - 1;
    result = result.concat(pileCollection[selectedPile]);
    pileCollection.splice(selectedPile, 1);
  }

  return result;
}

function PileShuffle(iterations, pileCount, deck) {
  for (let i = 0; i < iterations; i++) {
    deck = PileShuffleOnce(pileCount, deck);
  }

  return deck;
}

// Random shuffle functions
function ReturnFormattedRandomShuffle(deck) {
  let rawResult = RandomShuffle(deck);

  var result = ConvertDeck(rawResult, standardDeckConverter);
  return result;
}

function RandomShuffle(deck) {
  let result = [];
  let deckLength = deck.length;

  // this could be DRYer with pile concatenation in pile shuffling - same core logic.
  for (let i = 0; i < deckLength; i++) {
    let selectedCard = GetRandomInt(deckLength - i) - 1;
    result.push(deck[selectedCard]);
    deck.slice(selectedCard, 1);
  }

  return result;
}
