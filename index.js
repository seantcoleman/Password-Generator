// DOM Elements
const display = document.getElementById("display1");
const generateBtn = document.getElementById("generate");
const passwordLength = document.getElementById("length");
const numbersCheckbox = document.getElementById("numbers");
const upperCaseCheckbox = document.getElementById("uppercase");
const symbolsCheckbox = document.getElementById("symbols");

const form = document.getElementById("passwordGeneratorForm");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");

// Character Code Generating Function
let arrayFromLowToHigh = (low, high) => {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
};

// Generating Character Codes
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = passwordLength.value;
  const includeUppercase = upperCaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  display.textContent = password;

  // Update strength indicator
  updateStrengthIndicator(password);
});

copyBtn.addEventListener("click", () => {
  const password = display.textContent;
  if (password && password !== "Click generate to create a password") {
    navigator.clipboard.writeText(password).then(() => {
      copyBtn.textContent = "✓";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "📋";
        copyBtn.classList.remove("copied");
      }, 2000);
    });
  }
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);

  // Ensure at least one character from each selected type
  let passwordChar = [];

  if (includeUppercase) {
    const randomUpper =
      UPPERCASE_CODES[Math.floor(Math.random() * UPPERCASE_CODES.length)];
    passwordChar.push(String.fromCharCode(randomUpper));
  }

  if (includeNumbers) {
    const randomNumber =
      NUMBER_CODES[Math.floor(Math.random() * NUMBER_CODES.length)];
    passwordChar.push(String.fromCharCode(randomNumber));
  }

  if (includeSymbols) {
    const randomSymbol =
      SYMBOL_CODES[Math.floor(Math.random() * SYMBOL_CODES.length)];
    passwordChar.push(String.fromCharCode(randomSymbol));
  }

  // Fill the rest with random characters
  while (passwordChar.length < characterAmount) {
    let characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordChar.push(String.fromCharCode(characterCode));
  }

  // Shuffle the password
  for (let i = passwordChar.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChar[i], passwordChar[j]] = [passwordChar[j], passwordChar[i]];
  }

  return passwordChar.join("");
}

function checkPasswordStrength(password) {
  let score = 0;
  let feedback = [];

  // Length check
  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;
  else feedback.push("Too short");

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Determine strength level
  if (score >= 5) return { level: "strong", score: score, feedback: feedback };
  if (score >= 4) return { level: "good", score: score, feedback: feedback };
  if (score >= 3) return { level: "fair", score: score, feedback: feedback };
  return { level: "weak", score: score, feedback: feedback };
}

function updateStrengthIndicator(password) {
  const strength = checkPasswordStrength(password);

  // Remove existing classes
  strengthFill.className = "strength-fill";

  // Add new class and update text
  strengthFill.classList.add(strength.level);
  strengthText.textContent = `Strength: ${
    strength.level.charAt(0).toUpperCase() + strength.level.slice(1)
  }`;
}
