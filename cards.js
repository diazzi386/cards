// Change here deck specs
const suits = ["♥", "♦", "♣", "♠"];
const colors = ["crimson", "crimson", "black", "black"]
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const decks = 1;

var deck = {
  cards: [],
  shuffle: function () {
    var temp = [];
    for (var i = 0; i < suits.length * numbers.length; i++)
      temp.push(i % (suits.length * numbers.length));
    this.cards = [];
    for (var i = 0; i < suits.length * numbers.length; i++) {
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

var card = {
  label: function (card) {
    if (card >= 0 && card < suits.length * numbers.length)
    return numbers[card % numbers.length] + suits[Math.floor(card / numbers.length)];
  }, color: function (card) {
    return colors[Math.floor(card / numbers.length)];
  }
}

deck.shuffle();

for (var i in deck.cards) {
  document.getElementById("cards").innerHTML += "<div class='card' style='color: " + card.color(deck.cards[i]) + "'>" + card.label(deck.cards[i]) + "</div>";
}