let url = "https://opentdb.com/api.php?amount=15&category=22&difficulty=medium&type=multiple&rand=" + Math.random();

let elementoDomanda = document.getElementById("domanda");
let bottone1 = document.getElementById("risposta1");
let bottone2 = document.getElementById("risposta2");
let bottone3 = document.getElementById("risposta3");
let bottone4 = document.getElementById("risposta4");

let dati = null;
let indice = 0;
let punteggio = 0;


async function CaricaQuiz(url) {
    try {
        const risposta = await fetch(url);
        if (!risposta.ok) {
            throw new Error("Errore nel recupero del quiz");
        }
        dati = await risposta.json();

        if (!dati.results || dati.results.length === 0) {
            elementoDomanda.innerHTML = "Errore: nessuna domanda ricevuta!";
            return;
        }

        MostraDomanda();
    } catch (errore) {
        console.log("Errore:", errore);
    }
}



function MostraDomanda() {
    if (indice >= dati.results.length) {
        elementoDomanda.innerHTML = `Quiz finito!<br>Punteggio: ${punteggio}/${dati.results.length}`;
        document.querySelector(".risposte").style.display = "none";
        return;
    }

    const q = dati.results[indice];

    elementoDomanda.innerHTML = q.question;

    let risposte = [
        q.correct_answer,
        ...q.incorrect_answers
    ];

    risposte.sort(() => Math.random() - 0.5);

    bottone1.innerHTML = risposte[0];
    bottone2.innerHTML = risposte[1];
    bottone3.innerHTML = risposte[2];
    bottone4.innerHTML = risposte[3];

    bottone1.onclick = () => ControllaRisposta(risposte[0], q.correct_answer);
    bottone2.onclick = () => ControllaRisposta(risposte[1], q.correct_answer);
    bottone3.onclick = () => ControllaRisposta(risposte[2], q.correct_answer);
    bottone4.onclick = () => ControllaRisposta(risposte[3], q.correct_answer);
}



function ControllaRisposta(rispostaUtente, rispostaCorretta) {
    if (rispostaUtente === rispostaCorretta) {
        punteggio++;
        elementoDomanda.innerHTML = "<span> Risposta corretta </span>";
    } else {
        elementoDomanda.innerHTML = "<span> Risposta sbagliata </span>";
    }
    setTimeout(() => {
        indice++;
        DisabilitaBottoni(false);
        MostraDomanda();
    }, 1000);
}

CaricaQuiz(url);