const display = document.querySelector(".display")
let displayVal = Number(display.textContent)
let isResultOfOperation = true;

function operate(operator, a, b) {
  let result;
  console.log(operator,a,b);
  switch (operator) {
    case "+": 
      result = Number(a) + Number(b);
      break;
    case "-": 
      result = Number(a) - Number(b);
      break;
    case "*": 
      result = Number(a) * Number(b);
      break;
    case "/": 
      if (b == 0) {
        clearDisplay();
        result = "bruh";
      }
      else {
        result = Number(a) / Number(b);
      }
      break;
    default: 
      result = b;
  }
  if (typeof result == "number") {
    result = Math.round(result * 100000000) / 100000000;
  }
  return result;
}

function addNumberToDisplay(num) {
// if 0 or the result of an operation, then num
// if number that is not the result of an operation, then append
  if ((isResultOfOperation || displayVal === 0) && !display.textContent.endsWith(".")) {
    display.textContent = num;
  }
  else {
    display.textContent += num;
  }
  displayVal = Number(display.textContent);
  isResultOfOperation = false;
}

function clearDisplay() {
  firstNum = 0;
  secondNum = 0;
  isResultOfOperation = false;
  operator = "";
  displayVal = 0;
  display.textContent = "0";
}

// operator handler
function operatorHandler(value) {
  console.log(operator)
  console.log(firstNum)
  if (operator) {
    secondNum = displayVal;
    displayVal = operate(operator, firstNum, secondNum);
    display.textContent = displayVal;
  }
  firstNum = displayVal;
  operator = value;
  isResultOfOperation = true;
}

// equals
function equalsHandler() {
  secondNum = displayVal;

  displayVal = operate(operator, firstNum, secondNum);
  console.log(displayVal);
  display.textContent = displayVal;

  operator = "";
  secondNum = 0;
  isResultOfOperation = true;
}

function decimalHandler() {
  // if just after operator is clicked, change to 0.
  if (isResultOfOperation || (displayVal === 0 && !display.textContent.endsWith("."))) {
    display.textContent = "0.";
    isResultOfOperation = false;
  }
  else if (!display.textContent.includes("."))
  {
    display.textContent += ".";
    isResultOfOperation = false;
  }
}

function percentHandler() {
  displayVal /= 100;
  display.textContent = displayVal;
}

function negateHandler() {
  displayVal *= -1;
  display.textContent = displayVal;
}

// buttons
for (let button of document.querySelectorAll(".number")) {
  button.addEventListener('click', (event) => {addNumberToDisplay(event.target.value)});
}

let firstNum = 0;
let secondNum = 0;
let operator;

// if operator pressed: 
// if regular calculation, store display in first number and operator, await second number and =
// if part of longer string of numbers, evaluate and update display, then wait for number and all that
for (let button of document.querySelectorAll(".operator")) {
  button.addEventListener('click', () => operatorHandler(button.value));
}

const equals = document.querySelector(".equals")
equals.addEventListener('click', equalsHandler)

const clear = document.querySelector(".clear")
clear.addEventListener('click', clearDisplay)

const negate = document.querySelector(".negate")
negate.addEventListener('click', negateHandler)

const percent = document.querySelector(".percent")
percent.addEventListener('click', percentHandler)

const decimal = document.querySelector(".decimal")
decimal.addEventListener('click', decimalHandler)

// bind keys to buttons
document.body.addEventListener('keypress', (event) => {
  let key = event.key
  console.log(key);
  if ("0123456789".includes(key)) {
    addNumberToDisplay(key);
  }
  else if ("+-*/".includes(key)) {
    operatorHandler(key)
  }
  else if (key === "Enter" || key === "=") {
    equalsHandler();
  }
  else if (key === ".") {
    decimalHandler();
  }
  else if (key === "%") {
    percentHandler();
    
  }
  else if (key === "n") {
    negateHandler();
  }
  else if (key === "c") {
    clearDisplay();
  }
})