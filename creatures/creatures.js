// Change here deck specs
const suits = ["♥", "♦", "♣", "♠"];
const colors = ["crimson", "crimson", "black", "black"]
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
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
    return this.cards.pop();
  }, drawMore: function (number = 1) {
    var temp = [];
    for (var i = 0; i < number && this.cards.length > 0; i++)
      temp.push(this.draw());
    return temp;
  }, count: function () {
    if (this.cards.length > 1)
      console.log("The deck now has " + this.cards.length + " cards.");
    else if (this.cards.length == 1)
      console.log("The deck now has 1 card.");
    else
      console.log("The deck is now empty.");
  }
};

var card = {
  print: function (c) {
    if (c >= 0 && c < suits.length * numbers.length)
    return numbers[c % numbers.length] + suits[Math.floor(c / numbers.length)];
  }, suit: function (c) {
    return suits[Math.floor(c / numbers.length)];
  }, color: function (c) {
    return colors[Math.floor(c / numbers.length)];
  }, value: function (c) {
    return values[c % numbers.length];
  }, type: function (c) {
    return 2 * (Math.floor(c / numbers.length) % 2) - 1;
  }
}

const players = 2;
var turn = 0;
var player = 0;
var first = 0;
var winner = -1;
var score = [];
var hands = [];
var played = [];

var start = function () {
  deck.shuffle();
  turn = 0;
  player = first = 0;
  winner = -1;
  for (var i = 0; i < players; i++) {
    score[i] = 10;
    hands[i] = deck.drawMore(3);
  }
}

var print = function () {
  console.clear();
  console.log("Creatures!");
  console.log("Turn no. " + turn + ", player no. " + player);
  console.log("Score: " + score.join(", "));
  console.log("Cards in the deck: " + deck.cards.length);
  console.log("You are the " + (first == player ? "attacker" : "defender"))
  console.log("Cards played:");
  for (var i in played)
    console.log("%c  " + card.print(played[i]), "color: " + card.color(played[i]));
  if (played.length <= 0)
    console.log("  (none)");
  console.log("Your hand:");
  for (var i in hands[player])
    console.log("  (" + i + ") %c" + card.print(hands[player][i]), "color: " + card.color(hands[player][i]));
  return console.log("What card do you want to play?");
}

var play = function (c) {
  if (winner > -1)
    return console.log("The winner is player no. " + winner)
  if (c == undefined || c < 0 || c >= hands[player].length)
    return console.log("Sorry, what card do you want to play?");
  played.push(hands[player].splice(c, 1));

  if ((player + 1) % players == first) {
    var damage = 0;
    for (var i in played)
      damage += card.value(played[i]) * card.type(played[i]);
    score[player] -= Math.min(0, damage);
    first = (first + 1) % players;
    player = first;
    turn = turn + 1;
    played = [];
  } else {
    player = (player + 1) % players;
  }

  hands[player].push(deck.draw());

  print();
}

start();
print();