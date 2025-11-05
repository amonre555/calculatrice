let number1 = "";
let operator = "";
let number2 = "";
let calculated = false;

const numberButtons = document.querySelectorAll("button[data-number]");
const operatorsButtons = document.querySelectorAll("button[data-operator]");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equals");
const display = document.querySelector("#display");

// Functions globales
function addNumber(number) {
  if (operator == "") {
    if (!calculated) {
      number1 += number;
      if (display.innerHTML == "0") {
        display.innerHTML = number;
      } else {
        display.innerHTML += number;
      }
    }
  } else {
    number2 += number;
    display.innerHTML += number;
  }
}

function addOperator(ope) {
  if (number1 != "" && operator != "" && number2 != "") {
    const res = calcul(number1, number2, operator);
    number1 = res;
    number2 = "";
    calculated = true;
    operator = ope;
    display.innerHTML = res + operator;
  } else if (number1 != "" && operator == "" && number2 == "") {
    calculated = false;
    operator = ope;
    display.innerHTML += ope;
  }
}

function clear() {
  number1 = "";
  operator = "";
  number2 = "";
  calculated = false;
  display.innerHTML = 0;
}

function equals() {
  const res = calcul(number1, number2, operator);
  number1 = res;
  number2 = "";
  operator = "";
  calculated = true;
  display.innerHTML = res;
}

function isANumber(key) {
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(key);
}

function isAnOperator(key) {
  return ["+", "-", "*", "/"].includes(key);
}

function calcul(a, b, operateur) {
  if (operateur == "+") {
    return Number(a) + Number(b);
  } else if (operateur == "-") {
    return Number(a) - Number(b);
  } else if (operateur == "/") {
    return Number(a) / Number(b);
  } else {
    return Number(a) * Number(b);
  }
}

// Functions press
function pressButtonNumber(key) {
  if (isANumber(key)) {
    addNumber(key);
  }
}

function pressButtonOperator(key) {
  if (isAnOperator(key)) {
    addOperator(key);
  }
}

function pressButtonEquals(key) {
  if (key == "Enter") {
    equals();
  }
}

function pressButtonClear(key) {
  if (key == "c" || key == "C" || key == "Escape") {
    clear();
  }
}

// Functions boutons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addNumber(button.textContent);
  });
});

operatorsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addOperator(button.textContent);
  });
});

clearButton.addEventListener("click", () => {
  clear();
});

equalButton.addEventListener("click", () => {
  equals();
});

// Function clavier
document.addEventListener("keydown", (event) => {
  event.target.blur()
  pressButtonNumber(event.key);
  pressButtonOperator(event.key);
  pressButtonEquals(event.key);
  pressButtonClear(event.key);
});