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
let expression = "";
let lastExpression = "";
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

    if (currentNumber === "" && firstNumber === null) {
        return;
    }

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

    expression =
        `${formatNumber(firstNumber)} ${getOperatorSymbol(operator)}`;

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

    // Save the complete expression before calculation
    lastExpression =
        `${formatNumber(firstNumber)} ${getOperatorSymbol(operator)} ${formatNumber(secondNumber)}`;

    const finalResult = calculate(
        firstNumber,
        secondNumber,
        operator
    );

    // Handle division by zero or calculation errors
    if (finalResult === "Error") {

        currentInput.textContent = lastExpression;
        resultDisplay.textContent = "Error";

        firstNumber = null;
        currentNumber = "";
        operator = null;
        expression = lastExpression;
        shouldResetDisplay = true;

        return;
    }

    // Show expression above and answer below
    currentInput.textContent = lastExpression;
    resultDisplay.textContent = formatNumber(finalResult);

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

    // After equals, start deleting from the expression
    if (shouldResetDisplay) {

        const shortenedExpression = lastExpression
            .replace(/\s/g, "")
            .slice(0, -1);

        currentInput.textContent = "";
        resultDisplay.textContent = shortenedExpression || "0";

        firstNumber = null;
        currentNumber = shortenedExpression;
        operator = null;
        expression = shortenedExpression;
        lastExpression = "";
        shouldResetDisplay = false;

        return;
    }

    // Delete one character at a time
    if (currentNumber !== "") {

        currentNumber = currentNumber.slice(0, -1);

    } else if (expression !== "") {

        expression = expression.slice(0, -1);
        resultDisplay.textContent = expression || "0";
        return;

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

    // Show the full expression below while typing
    if (firstNumber !== null && operator !== null) {

        if (currentNumber !== "") {

            resultDisplay.textContent =
                `${formatNumber(firstNumber)} ${getOperatorSymbol(operator)} ${currentNumber}`;

        } else {

            resultDisplay.textContent = expression;

        }

    } else {

        resultDisplay.textContent =
            currentNumber !== "" ? currentNumber : "0";

    }

    // Keep the upper display empty until equals is pressed
    currentInput.textContent = "";

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