// CSV file path
    const filePath = "/question_files/";

var dataList = [];
var currentIndex = 1;
var lives = 5;

main()

function main() {
    fetchCSV();
    if (localStorage.getItem("gamemode") == "trivia") {
        document.getElementById("lives").innerHTML = "lives: " + lives
    }
}

function refreshLives() {
    document.getElementById("lives").innerHTML = "lives: " + lives
    if (lives == 0) {
        alert("Game Over!!");
        location.href = "http://127.0.0.1:5500";
    }
}

function initilizeNewQuestion() {
    if (localStorage.getItem("gamemode") == "trivia") {
        if (!confirm("Was your answer correct? press OK for yes / Cancel for no")) {
            lives--;
            refreshLives();
        }
    }
    const output = document.getElementById("answer");
    output.innerHTML = '';
    dispayQuestion();
}

function showAnswer() {
        const output = document.getElementById("answer");
        output.innerHTML = `<p> ${localStorage.getItem("currentAnswer")}</p>`;
}

async function fetchCSV() {
await fetch(filePath + "module" + localStorage.getItem("module") + ".csv")
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n");
        const headers = rows[0].split(",");
        const rowsData = rows.slice(1);
        rowsData.map((row) => {
          const obj = {};
          const rowData = row.split(",");
          headers.forEach((header, index) => {
            obj[header] = rowData[index];
          });
          dataList.push(obj);
        });
          dispayQuestion();
    });
}
    
function dispayQuestion() {
    console.log(dataList);

    var _rnd = Math.floor(Math.random() * dataList.length);

    localStorage.setItem("currentQuestion", dataList[_rnd].question);
    console.log(dataList[_rnd].answer);
    localStorage.setItem("currentAnswer", dataList[_rnd].answer);

    const output = document.getElementById("question");
    output.innerHTML = `<p> ${localStorage.getItem("currentQuestion")}</p>`;
}
      
document.getElementById("showanswer")
    .addEventListener("click", () =>
        showAnswer()
);

document.getElementById("showquestion")
    .addEventListener("click", () =>
        initilizeNewQuestion()
);
