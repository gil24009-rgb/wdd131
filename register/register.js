/* ============================
   WDD 131 — Camp Registration
   Behavior: Add Participants + Submit Summary
   ============================ */

const state = {
  count: 1, // current participants
};

const form = document.querySelector('#registerForm');
const participantsFieldset = document.querySelector('#participantsFieldset');
const addBtn = document.querySelector('#add');
const summaryEl = document.querySelector('#summary');

/* ---------- Templates ---------- */
function participantTemplate(count) {
  // Ensure all IDs/names are unique by suffixing with count
  return `
  <section class="participant" id="participant${count}" data-participant="${count}" aria-label="Participant ${count}">
    <p class="participant-label">Participant ${count}</p>

    <div class="item">
      <label for="fname${count}">First Name <span aria-hidden="true">*</span></label>
      <input id="fname${count}" name="fname${count}" type="text" required />
    </div>

    <div class="item activities">
      <label for="activity${count}">Activity # <span aria-hidden="true">*</span></label>
      <input id="activity${count}" name="activity${count}" type="text" inputmode="numeric" required />
    </div>

    <div class="item">
      <label for="fee${count}">Fee ($) <span aria-hidden="true">*</span></label>
      <input id="fee${count}" name="fee${count}" type="number" min="0" step="1" required />
    </div>

    <div class="item">
      <label for="date${count}">Desired Date <span aria-hidden="true">*</span></label>
      <input id="date${count}" name="date${count}" type="date" required />
    </div>

    <div class="item">
      <label for="grade${count}">Grade</label>
      <select id="grade${count}" name="grade${count}">
        <option value="" selected disabled></option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
        <option value="6">6th</option>
        <option value="7">7th</option>
        <option value="8">8th</option>
        <option value="9">9th</option>
        <option value="10">10th</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </select>
    </div>
  </section>`;
}

function successTemplate({ adultName, participantCount, total }) {
  const plural = participantCount === 1 ? 'participant' : 'participants';
  return `
    <h2>Registration Successful</h2>
    <p>Thank you <strong>${adultName}</strong> for registering.</p>
    <p>You have registered <strong>${participantCount}</strong> ${plural} and owe <strong>$${total}</strong> in fees.</p>
  `;
}

/* ---------- Helpers ---------- */
function totalFees() {
  // Grab any input with id starting with "fee"
  let feeElements = document.querySelectorAll('[id^="fee"]');
  feeElements = [...feeElements];

  // Sum as integers; treat invalid/empty as 0
  const total = feeElements.reduce((sum, el) => {
    const n = parseInt(el.value, 10);
    return sum + (Number.isFinite(n) && n >= 0 ? n : 0);
  }, 0);

  return total;
}

function insertParticipant() {
  state.count += 1;
  const html = participantTemplate(state.count);

  // Insert before the "Add Participant" button so the button stays on the last row
  addBtn.insertAdjacentHTML('beforebegin', html);
}

/* ---------- Event Wiring ---------- */
addBtn.addEventListener('click', insertParticipant);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Basic validation: required adult name and all visible required inputs
  const adultNameInput = document.querySelector('#adult_name');
  const requiredInputs = form.querySelectorAll('input[required], select[required]');
  let ok = true;

  requiredInputs.forEach((inp) => {
    // Only validate elements that are currently in the DOM (they are)
    if (!inp.checkValidity()) {
      inp.reportValidity();
      ok = false;
    }
  });

  if (!ok) return;

  const total = totalFees();
  const adultName = (adultNameInput.value || '').trim();
  const participantCount = state.count;

  // Hide the form and show summary
  form.hidden = true;
  summaryEl.innerHTML = successTemplate({ adultName, participantCount, total });
  summaryEl.hidden = false;

  // Optional: scroll to summary
  summaryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
