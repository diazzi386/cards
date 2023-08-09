var mazzi = [
	[
		"T/Isola di Aze",
		"T/Isola di Aze",
		"T/Isola di Aze",
		"T/Ora",
		"T/Ora",
		"U/Reclute di Marina",
		"U/Reclute di Marina",
		"U/Esploratori di Marina",
		"U/Sabotatori di Marina",
		"U/Fregata classe Orca",
		"S/Nave Scuola della Marina",
		"S/Nave Scuola della Marina",
		"S/Tifone al largo",
		"S/Presidio di Ife",
		"S/Presidio di Ife"
	], 	[
		"T/Isola di Aze",
		"T/Isola di Aze",
		"T/Scogliera di Uno",
		"T/Scogliera di Uno",
		"T/Ora",
		"U/Resistenza delle Isole",
		"U/Resistenza delle Isole",
		"U/Pescatori di Uno",
		"U/Pescatori di Uno",
		"U/Peschereccio scricchiolante",
		"U/Relitto affiorante",
		"S/Tifone al largo",
		"S/Tifone al largo",
		"S/Blocco del porto di Ora",
		"S/Blocco del porto di Ora",
	]
];

var nomi = [
	"Isola di Ora, marina",
	"Isola di Ora, civili"
];

var mazzo = [];
var scelto = 0;

var scegli = function (i) {
	mazzo = mazzi[i];
	mescola();
	document.getElementById("mazzo").innerHTML = nomi[i];
	document.getElementById("pesca").innerHTML = "Pesca (" + mazzo.length + ")";
	return i;
}

var mescola = function () {
	for (var i = mazzo.length - 1; i > 0; i--) {
		temp = mazzo[i];
		rand = Math.floor(Math.random() * (i + 1))
		mazzo[i] = mazzo[rand];
		mazzo[rand] = temp;
	}
};

var pesca = function (n = 1) {
	for (var i = 0; i < n; i++) {
		if (mazzo.length > 0) {
			var carta = mazzo.pop();
			document.getElementById("carte").innerHTML += "<li>" + carta + "</li>";
			document.getElementById("pesca").innerHTML = "Pesca (" + mazzo.length + ")";
			// disegna(carta);
			navigator.clipboard.writeText(carta);
			return carta;
		} else return false;
	}
};

var disegna = function (carta) {
	var canvas = document.getElementById("carta");
	var context = canvas.getContext("2d");
	var w, h;
	canvas.width = w = 350;
	canvas.height = h = 150;

	var tipo = carta.split("/")[0].split("(")[0];
	var regione = carta.split("/")[1].split("(")[0];
	var nome = carta.split("/")[2].split("(")[0];
	var punti = carta.includes("(") ? carta.split("(")[1].replace(")", "") : null;

	context.fillStyle = "black";
	context.strokeStyle = "black";
	context.fillRect(0, 0, w, h);
	context.fillStyle = "white";
	context.fillRect(5, 5, w - 10, h - 10);
	context.fillStyle = "black";
	context.textBaseline = "alphabetical";
	context.font = "15px sans-serif";
	context.fillText(regione, 10, 25);
	context.font = "bold 20px sans-serif";
	context.fillText(nome, 10, 45);
	context.font = "italic 15px sans-serif";
	context.fillText({"U": "Unità", "T": "Territorio", "S": "Strategia"}[tipo], 10, 60);

	if (punti) {
		context.font = "20px sans-serif";
		context.textAlign = "right";
		context.fillText(punti, w - 10, h - 10);
	}
}

scegli(window.location.href.split("?")[1] || 0);