// Change here deck specs
var Deck = {
  suits: ["♠", "♥", "♣", "♦"],
  numbers: ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
  decks: 1,
  cards: [],
  shuffle: function () {
    var temp = [];
    for (var i = 0; i < this.suits * this.numbers * this.decks; i++)
      temp.push(i % (this.suits * this.numbers));
    
    cards = [];
    for (var i = 0; i < this.suits * this.numbers * this.decks; i++) {
      var n = Math.floor(Math.random() * temp.length);
      this.cards.push(temp[n]);
      temp.splice(n, 1);
    }
  
    console.log("The deck has been shuffled.");
  }, draw: function () {
    if (this.cards.length > 1)
      console.log("The deck now has " + (this.cards.length - 1) + " cards.");
    else
      console.log("The deck is now empty.");
    return this.cards.pop();
  }
};

Deck.shuffle();