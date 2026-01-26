"use strict";

/* ================================
   DOM REFERENCES
================================ */

const nameEl = document.getElementById("characterName");
const classEl = document.getElementById("characterClass");
const levelEl = document.getElementById("characterLevel");
const healthEl = document.getElementById("characterHealth");
const statusEl = document.getElementById("statusMsg");

const attackBtn = document.getElementById("attackBtn");
const levelBtn = document.getElementById("levelBtn");

/* ================================
   CHARACTER OBJECT
================================ */

const character = {
  name: "Snortleblat",
  className: "Swamp Beast Diplomat",
  level: 8,
  health: 100,

  attacked() {
    if (this.health <= 0) {
      return;
    }

    this.health = this.health - 20;

    if (this.health <= 0) {
      this.health = 0;
      updateStatus("The character has died.");
      disableButtons();
    } else {
      updateStatus("Character was attacked. -20 health.");
    }

    render();
  },

  levelUp() {
    if (this.health <= 0) {
      updateStatus("Dead characters cannot level up.");
      return;
    }

    this.level = this.level + 1;

    updateStatus("Level increased by 1.");
    render();
  },
};

/* ================================
   UI FUNCTIONS
================================ */

function render() {
  nameEl.textContent = character.name;
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

/* ================================
   EVENT LISTENERS
================================ */

attackBtn.addEventListener("click", function () {
  character.attacked();
});

levelBtn.addEventListener("click", function () {
  character.levelUp();
});

/* ================================
   INITIAL RENDER
================================ */

render();
updateStatus("Ready for battle.");