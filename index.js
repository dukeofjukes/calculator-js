/* get document refs */

const display = document.querySelector(".display");
const opBtns = [...document.querySelectorAll(".op")];
const numBtns = [...document.querySelectorAll(".num")];
const decimalBtn = document.querySelector("#decimal");
const negateBtn = document.querySelector("#negate");
const clearBtn = document.querySelector("#clear");
const backspaceBtn = document.querySelector("#backspace");
const equalsBtn = document.querySelector("#equals");

/* define vars */

let op = null;
let a = undefined;
let b = undefined;

/* assign event listeners */

opBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (display.textContent === "") {
      return;
    }

    if (op != null) {
      // if an op has already been selected (chaining), perform that op first
      b = Number(display.textContent);
      clearDisplay();
      operate(op, a, b);
    }
    a = Number(display.textContent);
    clearDisplay();
    b = undefined;
    op = getOp(btn.id);
  })
);

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => appendDisplay(btn.textContent));
});

decimalBtn.addEventListener("click", () => {
  if (display.textContent.includes(".")) {
    return;
  }
  display.textContent += ".";
});

negateBtn.addEventListener("click", () => {
  if (display.textContent === "" || display.textContent === ".") {
    return;
  }
  display.textContent = -1 * Number(display.textContent);
});

clearBtn.addEventListener("click", () => clearDisplay());

backspaceBtn.addEventListener("click", () => backspaceDisplay());

equalsBtn.addEventListener("click", () => {
  if (op === null || display.textContent === "") {
    return;
  }
  b = Number(display.textContent);
  clearDisplay();
  operate(op, a, b);

  // reset
  op = null;
  a = Number(display.textContent);
  b = undefined;
});

/* define functions */

function appendDisplay(num) {
  display.textContent += num;
}

function clearDisplay() {
  display.textContent = "";
}

function backspaceDisplay() {
  if (display.textContent.length === 0) {
    return;
  }
  display.textContent = display.textContent.slice(
    0,
    display.textContent.length - 1
  );
}

function getOp(id) {
  if (id === "divide") {
    return divide;
  } else if (id === "multiply") {
    return multiply;
  } else if (id === "subtract") {
    return subtract;
  } else if (id === "add") {
    return add;
  }
  return null;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "ERROR";
  }
  return a / b;
}

function operate(op, a, b) {
  display.textContent = op(a, b);
}
