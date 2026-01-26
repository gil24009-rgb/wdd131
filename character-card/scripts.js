"use strict";

const ui = {
  name: document.querySelector("#characterName"),
  className: document.querySelector("#characterClass"),
  level: document.querySelector("#characterLevel"),
  health: document.querySelector("#characterHealth"),
  image: document.querySelector("#characterImage"),
  status: document.querySelector("#statusMsg"),
  attackBtn: document.querySelector("#attackBtn"),
  levelBtn: document.querySelector("#levelBtn"),
};

const character = {
  name: "Snortleblat",
  className: "Swamp Beast Diplomat",
  level: 8,
  health: 100,
  imageSrc: "./images/swamp_beast.webp",
  imageAlt: "Swamp creature standing in shallow water",

  attacked() {
    if (this.health <= 0) return;

    this.health -= 20;
    if (this.health < 0) this.health = 0;

    if (this.health === 0) {
      setStatus(`${this.name} has died.`);
      disableActions(true);
      return;
    }

    setStatus(`${this.name} took damage.`);
  },

  levelUp() {
    if (this.health <= 0) {
      setStatus(`${this.name} cannot level up because the character is dead.`);
      return;
    }

    this.level += 1;
    setStatus(`${this.name} leveled up.`);
  },
};

function setStatus(message) {
  ui.status.textContent = message;
}

function disableActions(disabled) {
  ui.attackBtn.disabled = disabled;
  ui.levelBtn.disabled = disabled;
}

function render() {
  ui.name.textContent = character.name;
  ui.className.textContent = character.className;
  ui.level.textContent = String(character.level);
  ui.health.textContent = String(character.health);

  ui.image.src = character.imageSrc;
  ui.image.alt = character.imageAlt;
}

ui.attackBtn.addEventListener("click", () => {
  character.attacked();
  render();
});

ui.levelBtn.addEventListener("click", () => {
  character.levelUp();
  render();
});

render();
setStatus("Ready.");