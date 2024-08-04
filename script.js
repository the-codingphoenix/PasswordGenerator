// Get DOM elements for result display and inputs
const headingText = document.querySelector('h1');
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const newBtn = document.getElementById('new-btn');
const passwordSettings = document.getElementById('password-settings');
const resultContainer = document.getElementById('result-container');
// Object containing functions for generating random characters
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Function to generate password based on selected criteria
function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
  
    // Return empty string if no types are selected
    if (typesCount === 0) {
      return '';
    }
  
    // Loop over the length and call the generator function for each type
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
  
    // Ensure the password is of the correct length
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
  }
  
  // Function to get a random lowercase letter
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  
  // Function to get a random uppercase letter
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  
  // Function to get a random number
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
  
  // Function to get a random symbol
  function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

function showSettings() {
    //change h1
    headingText.textContent = 'Password Generator';
    // hide results
    resultContainer.hidden = true;
    // show password settings
    passwordSettings.hidden = false;
}

function showResults() {
    //change h1
    headingText.textContent = "New Password";
    // hide password settings
    passwordSettings.hidden = true;
    // show results
    resultContainer.hidden = false;
}
  

//generate password
function generatePass() {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    showResults();
    // Generate password and display it
  resultEl.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
}

function copyPass() {
    // Create a temporary textarea element to hold the password
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    // Exit if there's no password
    if (!password) {
    return;
    }

    // Set the textarea value to the password and copy it
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    // Notify the user that the password has been copied
    alert('Password copied to clipboard!');
}

// Event listeners
generateBtn.addEventListener('click', generatePass);
copyBtn.addEventListener('click', copyPass);
newBtn.addEventListener('click', showSettings);

showSettings();