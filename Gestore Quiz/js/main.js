
let url = "https://opentdb.com/api.php?amount=15&category=28&difficulty=medium&type=multiple";

async function GetQuiz (url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Errore nel recupero del quiz");
        }
        data = await response.json();
        console.log(data);
        CreateQuiz();
    } catch (error) {
        console.error("Error fetching quiz:", error);
    }
}


function CreateQuiz(){
    
}

GetQuiz();
CreateQuiz();