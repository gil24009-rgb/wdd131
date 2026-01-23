const form = document.querySelector("#ccForm");
const msg = document.querySelector("#formMsg");

const cardNumberEl = document.querySelector("#cardNumber");
const monthEl = document.querySelector("#month");
const yearEl = document.querySelector("#year");

function setMessage(text, isSuccess) {
  msg.textContent = text;
  msg.style.color = isSuccess ? "#1f7a3a" : "#9b1c1c";
}

function digitsOnly(value) {
  return value.replace(/\D/g, "");
}

function isExpired(mm, yy) {
  const month = Number(mm);
  const year2 = Number(yy);

  if (!Number.isFinite(month) || !Number.isFinite(year2)) return true;
  if (month < 1 || month > 12) return true;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const currentYear2 = now.getFullYear() % 100;

  if (year2 < currentYear2) return true;
  if (year2 === currentYear2 && month < currentMonth) return true;

  return false;
}

function formatCardInput(e) {
  const raw = digitsOnly(e.target.value).slice(0, 16);
  const parts = raw.match(/.{1,4}/g) || [];
  e.target.value = parts.join(" ");
}

cardNumberEl.addEventListener("input", formatCardInput);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setMessage("", false);

  const rawCard = digitsOnly(cardNumberEl.value);
  const mm = digitsOnly(monthEl.value);
  const yy = digitsOnly(yearEl.value);

  if (!form.checkValidity()) {
    form.reportValidity();
    setMessage("Please complete all required fields using the correct formats.", false);
    return;
  }

  if (rawCard !== "1234123412341234") {
    setMessage("Card number must be exactly 1234123412341234.", false);
    cardNumberEl.focus();
    return;
  }

  if (isExpired(mm, yy)) {
    setMessage("This card is expired. Please enter a valid future date.", false);
    monthEl.focus();
    return;
  }

  setMessage("Success. Payment submitted for $199.", true);
  form.reset();
});