
const bill = document.getElementById("input-bill");
const tipButton = document.querySelectorAll(".tip-btn");
const tipCustom = document.getElementById("custom");
const numPeople = document.getElementById("people-input");
const errorMsg = document.querySelector(".error-msg");
const tipAmountOutput = document.querySelector(".tip-amount-output");
const totalOutput = document.querySelector(".total-amount-output");
const resetBtn = document.querySelector(".reset");

bill.addEventListener("input", setBillInput);
tipButton.forEach(btn => {
    btn.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", setCustomInput);
numPeople.addEventListener("input", setPeopleInput);
resetBtn.addEventListener("click", resetAll);


var billValue = 0.0; // Default value of bill input
var tipValue = 0.15; // Default value of tip-btn (15% active state)
var customValue = 0.0; // Default value of custom input
var peopleValue = 1; // Default value of number of people

// VALIDATE NUMBERS FUNCTIONS
function validateFloat(s) {
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}

// BILL SECTION
function setBillInput() {
    //Cut invalid characters
    if (!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length - 1);
    }

    billValue = parseFloat(bill.value).toFixed(2);
    calculateTip();
}

// TIP BUTTONS SECTION
function handleClick(event) {
    tipButton.forEach(btn => {
        // Remove active state
        btn.classList.remove("btn-active");

        // Set active state
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add("btn-active");
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    })

    // clear custom tip
    tipCustom.value = "";

    calculateTip();
    //console.log(tipValue);
}

// CUSTOM INPUT SECTION
function setCustomInput() {
    //Cut invalid characters
    if (!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
    }

    tipValue = parseFloat(tipCustom.value) / 100;

    // remove active state button when selecting custom input
    tipButton.forEach(btn => {
        btn.classList.remove("btn-active");
    })

    if (tipCustom.value !== "") {
        calculateTip();
    }
    //console.log(customValue);

}

// NUM OF PEOPLE SECTION
function setPeopleInput() {
    //Cut invalid characters
    if (!validateInt(numPeople.value)) {
        numPeople.value = numPeople.value.substring(0, numPeople.value.length - 1);
    }

    peopleValue = parseInt(numPeople.value);

    //Set error message if input is 0
    if (peopleValue <= 0) {
        errorMsg.classList.add("error-msg-on");
        numPeople.classList.add("error-input");
    } else {
        errorMsg.classList.remove("error-msg-on");
        numPeople.classList.remove("error-input");

    }

    calculateTip();
    //console.log(peopleValue);
}

// Do the math
function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        tipAmountOutput.innerHTML = "$" + tipAmount.toFixed(2);
        totalOutput.innerHTML = "$" + total.toFixed(2);
    }
}

// Reset button
function resetAll() {
    bill.value = "0.0";
    setBillInput();

    tipButton[2].click();

    numPeople.value = "1";
    setPeopleInput();
}
