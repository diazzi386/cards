// Funzioni carte
var carta_seme = function (id) {
	return ["Spade", "Coppe", "Denari", "Bastoni"][Math.floor(id / 10)];
};

var carta_numero = function (id) {
	return 1 + (id % 10);
};

var carta_figura = function (id) {
	var numero = carta_numero(id);
	if (numero == 1)
		return "Asso";
	else if (numero == 8)
		return "Fante";
	else if (numero == 9)
		return "Cavallo";
	else if (numero == 10)
		return "Re";
	else
		return numero;
};

var carta_punti = function (id) {
	var numero = carta_numero(id);
	if (numero == 1)
		return 11;
	else if (numero == 3)
		return 10;
	else if (numero > 7)
		return numero - 6;
	else
		return 0;
};

var carta_potere = function (id) {
	var numero = carta_numero(id);
	if (numero == 1)
		numero = 11;
	else if (numero == 3)
		numero = 10;
	return numero + (carta_seme(id) == briscola ? 24 : 0) + (carta_seme(id) == seme ? 12 : 0);
};

var carta_nome = function (id) {
	return carta_figura(id) + " di " + carta_seme(id);
};

// Funzioni mazzo
var mazzo_mescola = function () {
	// Rimuovere carte in eccesso in base al numero di giocatori (40 % G) a partire da carte senza valore, una per seme: 2, 3, ...
	var carte = [], temp = 0, rand = 0;
	for (var i = 0; i < 40; i++)
		carte[i] = i;
	for (var i = 39; i > 0; i--) {
		temp = carte[i];
		rand = Math.floor(Math.random() * (i + 1))
		carte[i] = carte[rand];
		carte[rand] = temp;
	}
	if (!mazzo_controlla(carte))
		console.error("Il mazzo non è completo!")
	return carte;
};

var mazzo_controlla = function (carte) {
	for (var i = 0; i < 40; i++) {
		for (var j = 0; j <= 40; j++) {
			if (j == 40)
				return false;
			else if (carte[j] == i)
				break;
		}
	}
	return true;
};

var mazzo_stampa = function (carte) {
	for (var i = 0; i < 40; i++)
		console.log(carta_nome(carte[i]))
};

//Funzioni mani
var mani_stampa = function (mani) {
	for (var i = 0; i < mani.length; i++) {
		console.log("Giocatore " + (i + 1) + " ha in mano:")
		for (var j = 0; j < mani[i].length; j++) {
			console.log("    " + carta_nome(mani[i][j]));
		}
	}
}

var giocatori = 2, mazzo, mani, tavolo, seme, briscola, punti, vincitore_mano, vincitore_partita;

// Funzioni partita
var partita_inizia = function () {
	mazzo = [], mani = [], tavolo = [], seme = 0, briscola = 0, punti = [], vincitore_mano = 0, vincitore_partita = 0;
	console.log("=== PREPARO LA PARTITA ===")
	console.log("Mescolo il mazzo...")
	mazzo = mazzo_mescola();
	console.log("Il mazzo ora contiene " + mazzo.length + " carte.")
	console.log("Azzero i punteggi giocatori...")
	for (var i = 0; i < giocatori; i++) {
		mani[i] = [];
		punti[i] = 0;
	}
	console.log("La carta che decide il seme di briscola è:")
	console.log(carta_nome(mazzo[0]));
	briscola = carta_seme(mazzo[0]);
	for (turno = 0; turno == 0 || mani[0].length > 0; turno++) {
		console.log("=== TURNO " + (turno + 1) + " ===")
		if (mazzo.length >= giocatori) {
			for (var i = 0; i < giocatori; i++) { // I giocatori pescano
				var j = (i + vincitore_mano) % giocatori;
				for (var k = 0; k < (turno == 0 ? 3 : 1); k++)
					mani[j].push(mazzo.pop());
			}
		}
		// console.log("Ogni giocatore ha in mano", mani[0].length, "carte")
		console.log("Il mazzo ora contiene", mazzo.length, "carte")
		console.log("Il seme di briscola è", briscola)
		mani_stampa(mani);
		tavolo = [];
		for (var i = 0; i < giocatori; i++) { // Carte giocate dai giocatori vanno sul tavolo (ora random)
			var j = (i + vincitore_mano) % giocatori;
			tavolo[j] = mani[j].splice(Math.floor(Math.random()*mani[j].length), 1)[0];
			if (i == 0)
				seme = carta_seme(tavolo[j]);
			console.log("Giocatore " + (j + 1) + " gioca:", carta_nome(tavolo[j]))
		}
		for (var i = 0; i < giocatori; i++) { // Decido chi vince la mano
			if (carta_potere(tavolo[i]) > carta_potere(tavolo[vincitore_mano]))
				vincitore_mano = i;
		}
		console.log("Giocatore", vincitore_mano + 1, "vince la mano")
		// Assegnazione punti
		for (var i = 0; i < giocatori; i++) { // Decido chi vince la mano
			punti[vincitore_mano] += carta_punti(tavolo[i]);
		}
		console.log("Punteggi giocatori:", punti)
	}

	// Decreto il vincitore e stampo i punti
	for (var i = 0; i < giocatori; i++) { // Decido chi vince la mano
		if (punti[i] > punti[vincitore_partita]) // Aggiungere parità?
			vincitore_partita = i;
	}
	
	console.log("=== FINE PARTITA ===")
	console.log("Vince la partita il giocatore", vincitore_partita + 1, "con", punti[vincitore_partita], "punti.")
}

// Main
partita_inizia();

// Introdurre multigiocatore contro computer o contro persona
// Introdurre semplice intelligenza computer
// Introdurre grafica con carte e simboli