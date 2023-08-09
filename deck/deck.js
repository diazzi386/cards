var mazzi = [
	[
		"T/Isola di Aze (0/5)",
		"T/Isola di Aze (0/5)",
		"T/Isola di Ife (0/5)",
		"T/Isola di Ife (0/5)",
		"T/Ora (0/10)",
		"U/Reclute della Marina di Ora (1/1)",
		"U/Reclute della Marina di Ora (1/1)",
		"U/Esploratori della Marina di Ora (2/2)",
		"U/Esploratori della Marina di Ora (2/2)",
		"U/Sabotatori della Marina di Ora (3/3)",
		"S/Nave Scuola della Marina",
		"S/Nave Scuola della Marina",
		"S/Tifone delle Isole di Ora",
		"S/Presidio di Ife",
		"S/Presidio di Ife"
	], [
		"T/Capo Vici (0/10)",
		"T/Costa di Sofa (0/5)",
		"T/Costa di Sofa (0/5)",
		"T/Isola di Maha (0/5)",
		"T/Lago di Evena (0/5)",
		"U/Apprendisti Marinai (1/1)",
		"U/Apprendisti Marinai (1/1)",
		"U/Ricognitori della Marina (2/2)",
		"U/Ufficiali di Sofa (2/2)",
		"U/Ufficiali di Sofa (2/2)",
		"S/Partenza da Capo Vici",
		"S/Assalto alle isole di Ora",
		"S/Assalto alle isole di Ora",
		"S/Tempesta della costa di Sofa",
		"S/Accademia Navale di Sofa",
	]
];

var mani = [];
var cimiteri = [];
var punti = [];
var territori = [];
var truppe = [];
var strategie = [];
var giocatore = 0;
var turno = -1;
var carteGiocabili = 1;

var prepara = function () {
	for (var i = 0; i < mazzi.length; i++) {
		mani.push([]);
		cimiteri.push([]);
		strategie.push([]);
		punti.push(0);
	}
}

var mescola = function () {
	for (var g = 0; g < mazzi.length; g++) {
		for (var i = mazzi[g].length - 1; i > 0; i--) {
			temp = mazzi[g][i];
			rand = Math.floor(Math.random() * (i + 1))
			mazzi[g][i] = mazzi[g][rand];
			mazzi[g][rand] = temp;
		}
	}
};

var pesca = function (n = 1, g = giocatore) {
	for (var i = 0; i < n; i++) {
		if (mazzi[g].length > 0)
			mani[g].push(mazzi[g].pop());
		else
			return console.warn("Hai terminato le carte del tuo mazzo.");
	}

	mani[g].sort();
	return mani[g][mani[g].length - 1];
};

var gioca = function (c, t, g = giocatore) {
	if (carteGiocabili <= 0)
		return console.warn("Non puoi più giocare carte questo turno.")
	if (!mani[g][c])
		return console.warn("Che carta vuoi giocare?")
	var temp;
	if (mani[g][c].includes("T/")) {
		truppe.push([]);
		for (var i = 0; i < mazzi.length; i++)
			truppe[truppe.length - 1][i] = [];
		territori.push(mani[g].splice(c, 1)[0]);
		temp = territori[territori.length - 1];
	} else if (territori[t] && truppe[t][g]) {
		truppe[t][g].push(mani[g].splice(c, 1)[0]);
		temp = truppe[t][g][truppe[t][g].length - 1];
	}
	if (temp)
		if (--carteGiocabili <= 0)
			fineTurno();
	return temp;
};

var scarta = function (i, g = giocatore) {
	if (!mani[g][i]) return console.warn("Che carta vuoi scartare?")
	cimiteri[g].push(mani[g].splice(i, 1)[0]);
	// return cimiteri[g][cimiteri[g].length - 1];
};

var fineTurno = function (s = true, p = true) {
	giocatore = (giocatore + 1) % mazzi.length;
	carteGiocabili = 1;
	if (giocatore == 0)
		turno++;
	if (p)
		pesca(1);
	if (s) {
		console.log("*");
		if (giocatore == 0)
			console.log("TURNO " + turno + "");
		console.log("Giocatore " + giocatore + "");
		mano();
		inCampo();
	}
	// return giocatore;
};

var mano = function (g = giocatore) {
	console.log("La tua mano");
	for (var i = 0; i < mani[giocatore].length; i++) {
		console.log(i, mani[giocatore][i]);
	}
}

var inCampo = function (t) {
	if (t == undefined) {
		console.log("In campo");
		if (territori.length > 0) {
			for (var i = 0; i < territori.length; i++) {
				console.log(i, territori[i]);
			}
		} else
			console.log("(vuoto)");
	} else if (!territori[t])
		return console.warn("Territorio non trovato.")
	else {
		console.log("Territorio");
		console.log(territori[t]);
		for (var i = 0; i < mazzi.length; i++)
			console.log(truppe[t][i]);
	}
}

prepara();
mescola();
pesca(5, 0);
fineTurno(false, false);
pesca(5, 1);
fineTurno(true, false);

// tavolo[0] = mani[0].splice(0, 1)