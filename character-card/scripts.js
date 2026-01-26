"use strict";

/* DOM */

const classEl = document.getElementById("characterClass");
const levelEl = document.getElementById("characterLevel");
const healthEl = document.getElementById("characterHealth");
const statusEl = document.getElementById("statusMsg");

const attackBtn = document.getElementById("attackBtn");
const levelBtn = document.getElementById("levelBtn");

/* CHARACTER OBJECT */

const character = {
  name: "Snortleblat",
  className: "Swamp Beast Diplomat",
  level: 8,
  health: 100,

  attacked() {
    if (this.health === 0) return;

    this.health -= 20;

    if (this.health <= 0) {
      this.health = 0;
      updateStatus("The character has died.");
      disableButtons();
    } else {
      updateStatus("Character attacked. Health -20.");
    }

    render();
  },

  levelUp() {
    if (this.health === 0) {
      updateStatus("Dead characters cannot level up.");
      return;
    }

    this.level += 1;

    updateStatus("Level increased.");
    render();
  },
};

/* UI FUNCTIONS */

function render() {
  classEl.textContent = character.className;
  levelEl.textContent = character.level;
  healthEl.textContent = character.health;
}

function updateStatus(message) {
  statusEl.textContent = message;
}

function disableButtons() {
  attackBtn.disabled = true;
  levelBtn.disabled = true;
}

/* EVENTS */

attackBtn.addEventListener("click", () => {
  character.attacked();
});

levelBtn.addEventListener("click", () => {
  character.levelUp();
});

/* INIT */

render();
updateStatus("Ready.");