// ================================
// Get elements from HTML
// ================================

const currentInput = document.getElementById("currentInput");
const resultDisplay = document.getElementById("result");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const equalsButton = document.querySelector('[data-action="equals"]');


// ================================
// Calculator Variables
// ================================

let firstNumber = null;
let currentNumber = "";
let operator = null;

let shouldResetDisplay = false;


// ================================
// Number Button Event Listeners
// ================================

numberButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        enterNumber(number);

    });

});


// ================================
// Operator Button Event Listeners
// ================================

operatorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedOperator = button.dataset.operator;

        chooseOperator(selectedOperator);

    });

});


// ================================
// Enter Number
// ================================

function enterNumber(number) {

    // If an error is currently displayed
    if (resultDisplay.textContent === "Error") {

        clearCalculator();

    }


    // If a result was just calculated
    if (shouldResetDisplay) {

        currentNumber = "";

        shouldResetDisplay = false;

    }


    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {

        return;

    }


    // If decimal is the first character
    if (number === "." && currentNumber === "") {

        currentNumber = "0.";

    } else {

        currentNumber += number;

    }


    updateDisplay();

}


// ================================
// Choose Operator
// ================================

function chooseOperator(selectedOperator) {

    // Don't allow operator without number
    if (currentNumber === "" && firstNumber === null) {

        return;

    }


    // If an operator already exists,
    // calculate previous operation first.
    if (firstNumber !== null && currentNumber !== "") {

        const secondNumber = parseFloat(currentNumber);

        firstNumber = calculate(
            firstNumber,
            secondNumber,
            operator
        );

    } else if (firstNumber === null) {

        firstNumber = parseFloat(currentNumber);

    }


    operator = selectedOperator;

    currentNumber = "";

    shouldResetDisplay = false;


    updateDisplay();

}


// ================================
// Equals Button
// ================================

equalsButton.addEventListener("click", () => {

    if (
        firstNumber === null ||
        currentNumber === "" ||
        operator === null
    ) {

        return;

    }


    const secondNumber = parseFloat(currentNumber);


    const finalResult = calculate(
        firstNumber,
        secondNumber,
        operator
    );


    // Check for error
    if (finalResult === "Error") {

        resultDisplay.textContent = "Error";

        currentInput.textContent = "Cannot divide by zero";

        firstNumber = null;
        currentNumber = "";
        operator = null;

        shouldResetDisplay = true;

        return;

    }


    resultDisplay.textContent = formatNumber(finalResult);

    currentInput.textContent =
        `${firstNumber} ${getOperatorSymbol(operator)} ${secondNumber}`;


    firstNumber = finalResult;

    currentNumber = String(finalResult);

    operator = null;

    shouldResetDisplay = true;

});


// ================================
// Clear Button
// ================================

clearButton.addEventListener("click", () => {

    clearCalculator();

});


// ================================
// Clear Calculator
// ================================

function clearCalculator() {

    firstNumber = null;

    currentNumber = "";

    operator = null;

    shouldResetDisplay = false;

    currentInput.textContent = "0";

    resultDisplay.textContent = "0";

}


// ================================
// Delete / Backspace
// ================================

deleteButton.addEventListener("click", () => {

    if (shouldResetDisplay) {

        clearCalculator();

        return;

    }


    currentNumber = currentNumber.slice(0, -1);


    if (currentNumber === "") {

        resultDisplay.textContent = "0";

    }


    updateDisplay();

});


// ================================
// Calculate
// ================================

function calculate(first, second, selectedOperator) {

    switch (selectedOperator) {

        case "+":

            return first + second;


        case "-":

            return first - second;


        case "*":

            return first * second;


        case "/":

            if (second === 0) {

                return "Error";

            }

            return first / second;


        default:

            return second;

    }

}


// ================================
// Update Display
// ================================

function updateDisplay() {

    if (currentNumber === "") {

        resultDisplay.textContent = "0";

    } else {

        resultDisplay.textContent = currentNumber;

    }


    if (firstNumber !== null && operator !== null) {

        currentInput.textContent =
            `${formatNumber(firstNumber)} ${getOperatorSymbol(operator)}`;

    } else {

        currentInput.textContent = "";

    }

}


// ================================
// Operator Symbol
// ================================

function getOperatorSymbol(selectedOperator) {

    switch (selectedOperator) {

        case "+":

            return "+";


        case "-":

            return "−";


        case "*":

            return "×";


        case "/":

            return "÷";


        default:

            return "";

    }

}


// ================================
// Format Number
// ================================

function formatNumber(number) {

    if (!Number.isFinite(number)) {

        return "Error";

    }


    return Number(
        parseFloat(number.toFixed(10))
    ).toString();

}