var rows = [];

var move = function (card0, row0, row1) {
	rows[row1] = rows[row1].concat(rows[row0].splice(card0, 1));
}

var draw = function (cards, row = 0) {
	rows[row] = rows[row].concat(deck.draw(cards));
}

var discard = function (card, row) {
	rows[row].splice(card, 1);
}

var clear = function (levels = 1) {
	rows = [];
	bin = [];
	for (var i = 0; i < levels; i++)
		rows[i] = [];
}

clear(7);

window.setInterval(function () {
	var t = "";
	for (var i in rows) {
		t += "<div class='row'>";
		for (var j in rows[i]) {
			t +=
				"<div class='card'><span>" + j + "</span> <span style='color: " + card.color(rows[i][j]) + "'>"
				+ card.label(rows[i][j]) + "</div>";
		}
		t += "</div>";
		document.getElementById("cards").innerHTML = t;
	}
}, 1000);