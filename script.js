const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClear = document.querySelector("[data-all-clear]");
const delButton = document.querySelector("[data-delete]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");


class Calculator {
    constructor (previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.previousOperand = this.previousOperand.toString().slice(0, -1);
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes("."))
        return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    pickOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let comp
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if ( isNaN(prev) || isNaN(current) ) return
        switch (this.operation) {
         case "+":
             comp = prev + current;
             break;
         case "-": 
             comp = prev - current;
             break;
         case "*":
             comp = prev * current;
             break;
        case "÷":
             comp = prev / current;
        }
        this.currentOperand = comp;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }

}

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.pickOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button => {
        calculator.compute();
        calculator.updateDisplay();
    })

allClear.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})