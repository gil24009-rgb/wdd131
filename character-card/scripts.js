"use strict";

const classEl = document.getElementById("characterClass");
const levelEl = document.getElementById("characterLevel");
const healthEl = document.getElementById("characterHealth");
const statusEl = document.getElementById("statusMsg");

const attackBtn = document.getElementById("attackBtn");
const levelBtn = document.getElementById("levelBtn");

const character = {
  className: "Swamp Beast Diplomat",
  level: 3,
  health: 100,
  isDead: false,

  attacked() {
    if (this.isDead) return;

    this.health = this.health - 20;

    if (this.health <= 0) {
      this.health = 0;
      this.isDead = true;
      setStatus("Monster died");
      lockActions();
    } else {
      setStatus("Attacked");
    }

    render();
  },

  levelUp() {
    if (this.isDead) return;

    this.level = this.level + 1;
    setStatus("Level up");
    render();
  },
};

function render() {
  classEl.textContent = character.className;
  levelEl.textContent = String(character.level);
  healthEl.textContent = String(character.health);
}

function setStatus(message) {
  statusEl.textContent = message;
}

function lockActions() {
  attackBtn.disabled = true;
  levelBtn.disabled = true;
}

attackBtn.addEventListener("click", () => {
  character.attacked();
});

levelBtn.addEventListener("click", () => {
  character.levelUp();
});

render();
setStatus("Ready");