// templates.mjs
// Template utilities shared across pages.

export function parkInfoTemplate(info) {
  return `
    <a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

export function mediaCardTemplate(info) {
  return `<div class="media-card">
    <a class="media-card__link" href="${info.link}">
      <img src="${info.image}" alt="${stripHtml(info.name)}" class="media-card__img">
      <h3 class="media-card__title">${info.name}</h3>
    </a>
    <p class="media-card__desc">${info.description}</p>
  </div>`;
}

export function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}

export function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice ? voice.phoneNumber : "";
}

export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses || []);
  const voice = getVoicePhone((info.contacts && info.contacts.phoneNumbers) || []);

  const line1 = mailing ? mailing.line1 : "";
  const city = mailing ? mailing.city : "";
  const state = mailing ? mailing.stateCode : "";
  const zip = mailing ? mailing.postalCode : "";

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div class="contact__address">
      <p>${line1}</p>
      <p>${city}, ${state} ${zip}</p>
    </div>
    <h4>Phone:</h4>
    <p class="contact__phone">${voice}</p>
  </section>`;
}

// Small helper to prevent HTML entities in alt text from rendering as markup.
function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, "").trim();
}