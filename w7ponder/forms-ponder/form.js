const theForm = document.querySelector("#checkoutForm");
const paymentSelect = document.querySelector("#paymentMethod");

const creditCardContainer = document.querySelector("#creditCardNumberContainer");
const paypalContainer = document.querySelector("#paypalUsernameContainer");

const creditNumberInput = document.querySelector("#creditCardNumber");
const expMonthInput = document.querySelector("#month");
const expYearInput = document.querySelector("#year");
const paypalInput = document.querySelector("#paypalUsername");

const errorsEl = document.querySelector(".errors");

function displayError(msg) {
  errorsEl.textContent = msg;
}

function isCardNumberValid(number) {
  return number === "1234123412341234";
}

function setVisibilityAndRequired(method) {
  creditCardContainer.classList.add("hide");
  paypalContainer.classList.add("hide");

  creditNumberInput.required = false;
  expMonthInput.required = false;
  expYearInput.required = false;
  paypalInput.required = false;

  if (method === "creditCard") {
    creditCardContainer.classList.remove("hide");
    creditNumberInput.required = true;
    expMonthInput.required = true;
    expYearInput.required = true;
    paymentSelect.setAttribute("aria-expanded", "true");
    return;
  }

  if (method === "paypal") {
    paypalContainer.classList.remove("hide");
    paypalInput.required = true;
    paymentSelect.setAttribute("aria-expanded", "true");
    return;
  }

  paymentSelect.setAttribute("aria-expanded", "false");
}

function normalizeDigits(value) {
  return value.trim().replace(/\s+/g, "");
}

function validateCreditCard() {
  let errorMsg = "";

  const cardNum = normalizeDigits(creditNumberInput.value);

  if (!/^\d{16}$/.test(cardNum)) {
    errorMsg += "Card number must be 16 digits\n";
  } else if (!isCardNumberValid(cardNum)) {
    errorMsg += "Card number is not valid\n";
  }

  const expMonthRaw = normalizeDigits(expMonthInput.value);
  const expYearRaw = normalizeDigits(expYearInput.value);

  if (!/^\d{1,2}$/.test(expMonthRaw) || !/^\d{2}$/.test(expYearRaw)) {
    errorMsg += "Expiration must be MM and YY\n";
    return errorMsg;
  }

  const expMonth = Number(expMonthRaw);
  const expYear = Number(expYearRaw);

  if (expMonth < 1 || expMonth > 12) {
    errorMsg += "Expiration month must be 01 to 12\n";
    return errorMsg;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const fullExpYear = 2000 + expYear;

  if (fullExpYear < currentYear || (fullExpYear === currentYear && expMonth < currentMonth)) {
    errorMsg += "Card is expired\n";
  }

  return errorMsg;
}

function submitHandler(event) {
  event.preventDefault();
  displayError("");

  let errorMsg = "";

  if (!theForm.fullName.value.trim()) errorMsg += "Full name is required\n";
  if (!theForm.email.value.trim()) errorMsg += "Email is required\n";
  if (!theForm.address.value.trim()) errorMsg += "Address is required\n";

  const method = paymentSelect.value;

  if (!method) {
    errorMsg += "Please select a payment method\n";
  } else if (method === "creditCard") {
    errorMsg += validateCreditCard();
  } else if (method === "paypal") {
    if (!paypalInput.value.trim()) errorMsg += "PayPal username is required\n";
  }

  if (errorMsg) {
    displayError(errorMsg);
    return;
  }

  theForm.innerHTML = "<h2>Thank you for your purchase.</h2>";
}

paymentSelect.addEventListener("change", (e) => {
  setVisibilityAndRequired(e.target.value);
});

theForm.addEventListener("submit", submitHandler);

setVisibilityAndRequired(paymentSelect.value);