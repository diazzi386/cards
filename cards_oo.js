var Deck = function (suits, numbers, decks = 1) {
  this.suits = suits;
  this.numbers = numbers;
  this.decks = decks;
  this.total = this.suits.length * this.numbers.length * this.decks;
  this.cards = [];

  var unshuffled = [];
  for (var i = 0; i < this.total; i++)
    unshuffled[i] = new Card(i, this.suits, this.numbers);

  console.log("here");
  
  for (var i = 0; i < this.total; i++) {
    var n = Math.floor(Math.random() * (unshuffled.length - i));
    this.cards.push(unshuffled[n]);
    unshuffled[n] = unshuffled.pop();
    unshuffled.push(this.cards[i]);
  }

  console.log(this.cards, unshuffled);

  this.draw = function () {
    console.log("Deck is now " + (this.cards.length - 1) + " cards.")
    return this.cards.pop();
  }

  return this;
};

var Card = function (number, suits, numbers) {
  this.index = number % (suits.length * numbers.length);
  this.suit = Math.floor(number / numbers.length);
  this.number = number % numbers.length;
  this.print = numbers[this.number] + suits[this.suit];
  return this;
};

var deck = new Deck(["♠", "♥", "♣", "♦"], ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]);