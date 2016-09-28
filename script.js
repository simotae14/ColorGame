// creo una var che tenga conto del numero di quadrati
// della modalità selezionata
var numeroQuadrati = 6;
var colori = [];
// inizializzo il quadrato che è la soluzione
var coloreSol;
// recupero tutti gli elementi squares
var quadrati = document.querySelectorAll(".square");
// recupero lo span che mostra nell'header il codice
// RGB da indovinare
var coloreMostrato = document.querySelector("#colorDisplay");
// recupero il tag con lo span dove mostro i msg
// di errore o di correttezza
var messaggioMostrato = document.querySelector("#message");
// Seleziono l'h1 a cui cambierò sfondo quando
// do la risposta corretta
var h1 = document.querySelector("h1");
// recupero il bottone per resettare i colori */
var bottoneReset = document.querySelector("#reset");
var bottoniMode = document.querySelectorAll(".mode");

init();

// definisco la funzione init DI INIZIALIZZAZIONE
function init(){
	// bottoni modalità EventListeners
	setUpBottoniMode();
	setUpQuadrati();
	// resetto la schermata
	reset();
}

function setUpBottoniMode(){
	// CICLO I DUE BOTTONI
	for(var i = 0; i < bottoniMode.length; i++){
		bottoniMode[i].addEventListener("click", function(){
			// rimuovo la classe selected da entrambi i bottoni
			bottoniMode[0].classList.remove('selected');
			bottoniMode[1].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === "Facile" ? numeroQuadrati = 3 : numeroQuadrati = 6;
			reset();
		});
	}
}

function setUpQuadrati(){
		for(var i = 0; i < quadrati.length; i++){
		// metto un handler per ogni square, che gestisca
		// l'evento del click
		quadrati[i].addEventListener("click", function(){
			// recupera il colore del quadrato cliccato
			var coloreCliccato = this.style.background;
			// e comparalo con il colore del quadrato soluzione
			if(coloreCliccato === coloreSol){
				// cambio il contenuto del message per dire
				// che la scelta è corretta
				messaggioMostrato.textContent = "Corretto!";
				// cambio il testo del bottone Reset a "Prova Ancora"
				bottoneReset.textContent = "Prova Ancora?";
				// e cambio il colore a tutti i quadrati per 
				// corrispondere a quello della soluzione
				cambiaColore(coloreCliccato);
				// modifico lo sfondo dell'h1 con il colore indovinato
				h1.style.background = coloreCliccato;
			} else {
				// devo nascondere il quadrato
				// assegnandogli lo stesso colore
				// dello sfondo del container
				this.style.background = "white";
				this.style.boxShadow = "none";
				// e aggiorno il messaggio dicendo di provare ancora
				messaggioMostrato.textContent = "Prova di Nuovo";
			}
		});
	}
}

// creo una funzione RESET che verrà spesso usata
function reset(){
	// genero tutti i nuovi colori
	colori = generaColoriRandom(numeroQuadrati);
	// seleziono la nuova sol dall'array
	coloreSol = creaSoluzione();
	// cambio il valore di coloreMostrato per fare in modo
	// che corrisponda al coloreSol
	coloreMostrato.textContent = coloreSol;
	// cambio il testo del bottone Reset a "Prova Ancora"
	bottoneReset.textContent = "Nuovi Colori";
			
	// azzero il messaggio mostrato
	messaggioMostrato.textContent = "";
	// cambio i colori dei quadrati
	for(var i = 0; i < quadrati.length; i++){
		if(colori[i]){
			quadrati[i].style.display = "block";
			quadrati[i].style.background = colori[i];
			quadrati[i].style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.5)";
		} else {
			quadrati[i].style.display = "none";
		}
	}
	// RESETTO IL BACKGROUND DELL'HEADER A QUELLO DEFAULT
	h1.style.background = "steelblue";
}

// HANLDER DEL CLICK BOTTONE RESET
bottoneReset.addEventListener("click", function(){
	reset();
});

// DEFINISCO LA FUNZIONE CHE CAMBIA IL COLORE
// A TUTTI I QUADRATI NEL CASO DI CORRETTA RISP
// ED ANCHE ALL'HEADER
function cambiaColore(coloreString){
	// ciclo tutti i quadrati per cambiarne il colore
	// in modo che sia corrispondente a quello
	// passato alla funzione
	quadrati.forEach(function(quad){
		quad.style.background = coloreString;
		quad.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.5)";
	});
};

// DEFINISCO LA FUNZIONE PER GENERARE IL COLORE soluzione
function creaSoluzione(){
	// devo generare un numero random che vada da 0 a 6 o da 0 a 3
	// dipenderà dalla lunghezza dell'array
	// ovvero gli indici dell'array dei colori
	var randomIndex = Math.floor(Math.random() * colori.length);
	// restituisco il colore rgb al dato indice
	return colori[randomIndex];
}

// DEFINISCO LA FUNZIONE CHE CREA LA LISTA DI COLORI random
// CHE ASSOCERò AI QUADRATI
function generaColoriRandom(num){
	// creo un array
	var arr = [];
	// aggiungo num colori random all'array
	// ripeto num volte
	for(var i = 0; i < num; i++){
		// recupero il colore random e lo inserisco
		// dentro l'array
		arr.push(randomColor());
	}
	// restituisco l'array
	return arr;
}

// DEFINISCO UNA FUNZIONE CHE GENERA IL COLORE
// random
function randomColor(){
	// seleziona il "red" da 0 a 255
	var red = Math.floor(Math.random() * 256);
	// seleziona il "green" da 0 a 255
	var green = Math.floor(Math.random() * 256);
	// seleziona il "blue" da 0 a 255
	var blue = Math.floor(Math.random() * 256);
	return ("rgb(" + red + ", " + green + ", " + blue + ")");
}