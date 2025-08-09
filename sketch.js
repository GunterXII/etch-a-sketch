// Variabile globale che tiene traccia del colore corrente del "pennello"
let color = "black";

// Variabile booleana che abilita/disabilita il coloring al passaggio del mouse
let click = true;

/**
 * Funzione che crea (o ricrea) la griglia di quadratini
 * @param {number} size — numero di quadrati per riga/colonna
 */
function populateBoard(size) {
    // Seleziona il contenitore .board dal DOM
    let board = document.querySelector(".board");

    // Seleziona tutti i div presenti nella pagina (da rimuovere)
    let squares = document.querySelectorAll("div");

    // Rimuove ciascun div trovato (ma ATTENZIONE: manca le (), vedremo dopo)
    squares.forEach(div => {
        div.remove;
    });

    // Imposta il layout a griglia con 'size' colonne uguali
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    // Imposta il layout a griglia con 'size' righe uguali
    board.style.gridTemplateRows    = `repeat(${size}, 1fr)`;

    // Calcola il numero totale di quadratini (size * size)
    let amount = size * size;

    // Ciclo per creare 'amount' quadratini
    for (let i = 0; i < amount; i++) {
        // Crea un nuovo elemento <div>
        let square = document.createElement("div");

        // Aggiunge un listener: quando passo il mouse sopra, chiamo colorSquare
        square.addEventListener("mouseover", colorSquare);

        // Imposta il colore iniziale di ciascun quadrato a bianco (sfondo pulito)
        square.style.backgroundColor = "white";

        // Inserisce il nuovo quadratino alla fine del container .board
        board.insertAdjacentElement("beforeend", square);
    }
}

// Alla prima esecuzione, crea una griglia 16×16
populateBoard(16);

/**
 * Funzione che cambia la dimensione della griglia in base all'input
 * @param {string|number} input — valore letto dall'input (stringa o numero)
 */
function changeSize(input) {
    // Se input è compreso tra 2 e 100 (inclusi), ricrea la board
    if (input >= 2 && input <= 100) {
        populateBoard(input);
    } else {
        // Altrimenti logga un avviso (puoi sostituire con alert o messaggio in pagina)
        console.log("too many squares");
    }
}

/**
 * Funzione che colora il quadratino quando ci passo sopra col mouse
 * 'this' è il div su cui è avvenuto il mouseover
 */
function colorSquare() {
    // Se il click-mode è attivo
    if (click) {
        // Se la modalità è 'random', genero un colore casuale in HSL
        if (color === 'random') {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
            // Altrimenti uso il colore selezionato (black, white, ecc.)
            this.style.backgroundColor = color;
        }
    }
}

/**
 * Funzione che cambia il colore del pennello in base alla scelta dell'utente
 * @param {string} choice — 'black', 'white' o 'random'
 */
function changeColor(choice) {
    color = choice;
}

/**
 * Funzione che resetta (ripulisce) tutti i quadratini tornando bianchi
 */
function reset() {
    // Seleziona la board e tutti i suoi div interni
    let board = document.querySelector(".board");
    let squares = board.querySelectorAll("div");

    // Imposta ciascun quadrato a sfondo bianco
    squares.forEach(div => {
        div.style.backgroundColor = 'white';
    });
}

// Aggiunge un listener al body per abilitare/disabilitare il coloring al click
document.querySelector('body').addEventListener("click", (e) => {
    // Inverte lo stato booleano di 'click'
    click = !click;

    // Aggiorna il testo della modalità nella pagina
    if (click) {
        document.querySelector(".mode").textContent = "Mode: coloring";
    } else {
        document.querySelector(".mode").textContent = "Mode: not coloring";
    }
});
