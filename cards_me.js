// Change here deck specs
var suits = ["♠", "♥", "♣", "♦"];
var numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
var decks = 1;
var cards = suits.length * numbers.length;
var deck = [];

deck.shuffle = function () {
  var temp = [];
  for (var i = 0; i < cards * decks; i++)
    temp.push(i % cards);
  
  for (var i = 0; i < cards; i++) {
    var n = Math.floor(Math.random() * temp.length);
    this.push(temp[n]);
    temp.splice(n, 1);
  }

  console.log("The deck has been shuffled.");
};

deck.draw = function () {
  if (this.length > 1)
    console.log("The deck now has " + (this.length - 1) + " cards.");
  else
    console.log("The deck is now empty.");
  return this.pop();
};

deck.shuffle();