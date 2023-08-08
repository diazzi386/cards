var Deck = function (suits, numbers, decks = 1) {
  this.suits = suits;
  this.numbers = numbers;
  this.decks = decks;
  this.total = this.suits.length * this.numbers.length * this.decks.length;
  this.cards = [];

  var unshuffled = [];
  for (var i = 0; i < this.total; i++)
    unshuffled[i] = i;

  console.log(this.cards, unshuffled);
  
  for (var i = 0; i < this.total; i++) {
    var n = Math.floor(Math.random() * (unshuffled.length - i));
    this.cards.push(unshuffled[n]);
    unshuffled[n] = unshuffled.pop();
    unshuffled.push(this.cards[i]);
  }
  
  console.log(this.cards, unshuffled);

  this.draw = function () {
  }

  return this;
}

var deck = new Deck(["♠", "♥", "♣", "♦"], ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]);