// ===== Theme Toggle for Mission Statement =====
// Select the dropdown and the logo image
const themeSelector = document.querySelector('#theme');
const logo = document.querySelector('#logo');

// File names (ensure these two image files exist alongside your HTML)
const LIGHT_LOGO = 'byui-logo.png';
const DARK_LOGO  = 'byui-logo-white.png';

// Apply a theme based on the provided value
function applyTheme(value) {
  const isDark = value === 'dark';

  // Toggle the 'dark' class on <body>
  document.body.classList.toggle('dark', isDark);

  // Swap the logo to match contrast guidance
  logo.src = isDark ? DARK_LOGO : LIGHT_LOGO;
  logo.alt = isDark ? 'BYU–Idaho logo (white)' : 'BYU–Idaho logo (blue)';
}

// Handler for dropdown changes
function changeTheme() {
  // Current value is in themeSelector.value
  applyTheme(themeSelector.value);
}

// Initialize: set the dropdown to match current body state, then apply
(function init() {
  const isDark = document.body.classList.contains('dark');
  themeSelector.value = isDark ? 'dark' : 'light';
  applyTheme(themeSelector.value);

  // Listen for user selection changes
  themeSelector.addEventListener('change', changeTheme);
})();