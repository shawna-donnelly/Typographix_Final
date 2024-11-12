const themeSwitcher = document.getElementById("theme-switcher");
const nav = document.getElementById("nav");
const menuIcon = document.querySelector(".menu-icon");

// Update Theme Icon & Text
const updateThemeIcon = (isDarkMode) => {
  themeSwitcher.children[0].textContent = isDarkMode
    ? "Dark Mode"
    : "Light Mode";

  themeSwitcher.children[1].classList.replace(
    isDarkMode ? "fa-sun" : "fa-moon",
    isDarkMode ? "fa-moon" : "fa-sun"
  );
  localStorage.setItem("theme", "dark");
};

// Determine if Dark Mode is Preferred
const prefersDarkMode = () => {
  console.log(
    "matchMedia",
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

// Set the theme based on the preference
const setThemeBasedOnPreference = () => {
  const isDarkMode = prefersDarkMode();

  document.documentElement.setAttribute(
    "data-theme",
    isDarkMode ? "dark" : "light"
  );
  updateThemeIcon(isDarkMode);
};

const switchTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme === "dark");
};

// Event Listener
themeSwitcher.addEventListener("click", switchTheme);

// Check Local Storage for Theme
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  console.log({savedTheme})

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme === "dark");
  } else {
    setThemeBasedOnPreference();
  }
};

// LIsten for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    setThemeBasedOnPreference();
  });

// Initialize Theme when script loads
initializeTheme();

// Navigation
const toggleMenu = () => {
  nav.classList.toggle("active");
  menuIcon.classList.toggle("active");
};

const hideMenu = () => {
  nav.classList.remove("active");
  menuIcon.classList.remove("active");
};
