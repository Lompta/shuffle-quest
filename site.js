//uses jquery
// TODO - make this like, at *all* DRY

$(document).ready(function(){
  // Sloppy
  function SetSloppyCardText(deck, i) {
    $("#sloppy-suit").html(deck[i].suit);
    // lol
    $("#sloppy-of").html("of");
    $("#sloppy-number").html(deck[i].number);
  }

  $("#sloppy-deck-next").on("click", function(){
    sloppyShuffledIndex = (sloppyShuffledIndex + 1) % 52;
    SetSloppyCardText(sloppyShuffledDeck, sloppyShuffledIndex);
  });

  $("#sloppy-deck-previous").on("click", function(){
    sloppyShuffledIndex = (sloppyShuffledIndex - 1) % 52;
    if (sloppyShuffledIndex === -1) {
      sloppyShuffledIndex = 51;
    }
    SetSloppyCardText(sloppyShuffledDeck, sloppyShuffledIndex);
  });

  let sloppyShuffledIndex = 0;
  let sloppyShuffledDeck = ReturnFormattedSloppyShuffle(30);

  SetSloppyCardText(sloppyShuffledDeck, 0);

  // Pile
  function SetPileCardText(deck, i) {
    $("#pile-suit").html(deck[i].suit);
    // lol
    $("#pile-of").html("of");
    $("#pile-number").html(deck[i].number);
  }

  $("#pile-deck-next").on("click", function(){
    pileShuffledIndex = (pileShuffledIndex + 1) % 52;
    SetPileCardText(pileShuffledDeck, pileShuffledIndex);
  });

  $("#pile-deck-previous").on("click", function(){
    pileShuffledIndex = (pileShuffledIndex - 1) % 52;
    if (pileShuffledIndex === -1) {
      pileShuffledIndex = 51;
    }
    SetPileCardText(pileShuffledDeck, pileShuffledIndex);
  });

  let pileShuffledIndex = 0;
  let pileShuffledDeck = ReturnFormattedPileShuffle(2, 6, standardDeck);

  SetPileCardText(pileShuffledDeck, 0);

  // Random
  function SetRandomCardText(deck, i) {
    $("#random-suit").html(deck[i].suit);
    // lol
    $("#random-of").html("of");
    $("#random-number").html(deck[i].number);
  }

  $("#random-deck-next").on("click", function(){
    randomShuffledIndex = (randomShuffledIndex + 1) % 52;
    SetRandomCardText(randomShuffledDeck, randomShuffledIndex);
  });

  $("#random-deck-previous").on("click", function(){
    randomShuffledIndex = (randomShuffledIndex - 1) % 52;
    if (randomShuffledIndex === -1) {
      randomShuffledIndex = 51;
    }
    SetRandomCardText(randomShuffledDeck, randomShuffledIndex);
  });

  let randomShuffledIndex = 0;
  let randomShuffledDeck = ReturnFormattedRandomShuffle(standardDeck);

  SetRandomCardText(randomShuffledDeck, 0);
});
