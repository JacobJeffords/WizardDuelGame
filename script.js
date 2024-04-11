var currentActivePlayer = "hp1";
var activeDefend = 0;
var logHistory = [];
var playerNames = {
    "hp1": "Player 1",
    "hp2": "Player 2"
}

function activateDefense() {
    activeDefend = 1;
    updateLogActivateDef(currentActivePlayer);
    changeActivePlayer();
}

function attack() {
    if (activeDefend === 1) {
        defend()
    } else {
        const currentHealth = Number(document.getElementById(currentActivePlayer).textContent)
        const atk = document.getElementById(currentActivePlayer).textContent = currentHealth - Math.floor(Math.random() * 10);
        checkHP();
        updateLogAttack(currentActivePlayer);
        changeActivePlayer();
    }
}

function checkHP() {
    const currentHealth = Number(document.getElementById(currentActivePlayer).textContent)
    if (currentHealth <= 0) {
        document.getElementById("attackbutton").disabled = true;
        document.getElementById("healbutton").disabled = true;
    }
}

function changeActivePlayer() {
    var hp1 = "hp1";
    var hp2 = "hp2";

    if (currentActivePlayer === hp1) {
        currentActivePlayer = hp2;
    } else {
        currentActivePlayer = hp1;
    }
}

function defend() {
    const currentHealth = Number(document.getElementById(currentActivePlayer).textContent);
    const def = Math.floor(Math.random() * 7);
    const newHealth = Math.max(0, currentHealth - def);
    document.getElementById(currentActivePlayer).textContent = newHealth;
    checkHP();
    updateLogDefend(currentActivePlayer);
    changeActivePlayer();
}

function heal() {
    const currentHealth = Number(document.getElementById(currentActivePlayer).textContent)
    if (currentHealth < 100) {
        document.getElementById(currentActivePlayer).textContent = currentHealth + Math.floor(Math.random() * 5 + 3);
        checkHP();
        updateLogHeal(currentActivePlayer);
        changeActivePlayer();
    } else {
        checkHP();
        changeActivePlayer();
    }
}

function reset() {
    document.getElementById("hp1").textContent = 100;
    document.getElementById("hp2").textContent = 100;
    activeDefend = 0;
    currentActivePlayer = "hp1";
}

function updateLogActivateDef(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " is defending!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}

function updateLogAttack(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " has attacked!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}

function updateLogDefend(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " has defended an attack!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}

function updateLogHeal(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " has healed!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}
