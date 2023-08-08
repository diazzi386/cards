var Deck = function (suits, numbers, decks) {
  this.suits = suits;
  this.numbers = numbers;
  this.decks = decks;
  this.total = this.suits.length * this.numbers.length * this.decks.length;
  this.cards = [];
  for (var i = 0; i++; i < this.total)
    this.cards[i] = i;

  this.draw = function () {

  }
}