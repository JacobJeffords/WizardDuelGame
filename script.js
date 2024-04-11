var currentActivePlayer = "hp1"; // Checks current active player.
var activeDefend = 0; // Checks whether or not a player is defending.
var logHistory = []; // Tracks logged actions.
var playerNames = {
    "hp1": "Player 1",
    "hp2": "Player 2"
}

// Changes activeDefend to 1 to signify that defense is active.
function activateDefense() {
    activeDefend = 1;
    updateLogActivateDef(currentActivePlayer);
    changeActivePlayer();
}

// Attack function. Checks if defend is active: if not, randomly determines attack value before applying. Then checks HP to determine if a player has won or not,
// then updates the log to document that a player has attacked, and finally, changes the active player.
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

// Checks to see if a player's HP has reached 0. If so, disables buttons to signify a win.
function checkHP() {
    const currentHealth = Number(document.getElementById(currentActivePlayer).textContent)
    if (currentHealth <= 0) {
        document.getElementById("attackbutton").disabled = true;
        document.getElementById("healbutton").disabled = true;
        document.getElementById("defendbutton").disabled = true;
    }
}

// Changes the active player.
function changeActivePlayer() {
    var hp1 = "hp1";
    var hp2 = "hp2";

    if (currentActivePlayer === hp1) {
        currentActivePlayer = hp2;
    } else {
        currentActivePlayer = hp1;
    }
}

// If defense is active, and a player attacks, their damage is reduced by a randomized number.
function defend() {
    const currentHealth = Number(document.getElementById(currentActivePlayer).textContent);
    const def = Math.floor(Math.random() * 7);
    const newHealth = Math.max(0, currentHealth - def);
    document.getElementById(currentActivePlayer).textContent = newHealth;
    checkHP();
    updateLogDefend(currentActivePlayer);
    changeActivePlayer();
}

// Heals a player by a random number that cannot be less than 4. HP may go above 100; this is a bug that I don't know how to fix at this time.
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

// Resets all HP to 100, resets the defense value, and changes the current player back to Player 1.
function reset() {
    document.getElementById("hp1").textContent = 100;
    document.getElementById("hp2").textContent = 100;
    activeDefend = 0;
    currentActivePlayer = "hp1";
}

// Updates the log to track an active defense.
function updateLogActivateDef(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " is defending!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}

// Updates the log to track an attack.
function updateLogAttack(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " has attacked!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}

// Updates the log to track a defense.
function updateLogDefend(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " has defended an attack!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}

// Updates the log to track a heal.
function updateLogHeal(player) {
    const logElement = document.getElementById("dialog");
    const playerName = playerNames[player];
    const newLog = playerName + " has healed!";

    logHistory.unshift(newLog);
    logHistory = logHistory.slice(0, 16);
    const updatedLog = logHistory.join("<br>");
    logElement.innerHTML = updatedLog;
}
