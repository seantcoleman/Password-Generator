const display = document.getElementById("display1");
const generateBtn = document.getElementById("generate")
const passwordLength = document.getElementById("length")
const numbersCheckbox = document.getElementById("numbers")
const upperCaseCheckbox = document.getElementById("uppercase")
const symbolsCheckbox = document.getElementById("symbols")
const form = document.getElementById("passwordGeneratorForm")

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
  
form.addEventListener("submit", e => {
    e.preventDefault()
    const characterAmount = passwordLength.value
    const includeUppercase = upperCaseCheckbox.checked
    const includeNumbers = numbersCheckbox.checked
    const includeSymbols = symbolsCheckbox.checked
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers,    includeSymbols)
    display.textContent = password
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = LOWERCASE_CODES
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES)
    
    let passwordChar = [];
    
    for ( let i = 0; i < passwordLength.value; i++) {
        let characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordChar.push(String.fromCharCode(characterCode));
    }
     return passwordChar.join('');
}