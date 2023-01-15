const modules = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const addEventListeners = (type) => {
    modules.forEach(module => {
        document.getElementById(`module${module}-${type}`)
            .addEventListener("click", () => startGame(module, type));
    });
}

addEventListeners("trivia");
addEventListeners("practice");

function startGame(module, type) {
    localStorage.setItem("module", module);
    localStorage.setItem("gamemode", type);
    location.href = "http://127.0.0.1:5500/pages/game.html";
}