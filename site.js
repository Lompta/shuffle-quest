//uses jquery

$(document).ready(function(){
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
  let sloppyShuffledDeck = ReturnFormattedSloppyShuffle(10);

  SetSloppyCardText(sloppyShuffledDeck, 0)
});
