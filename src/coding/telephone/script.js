const phoneNum = document.getElementById('user-input');
const result = document.getElementById('results-div');

const check = document.getElementById('check-btn');
const clear = document.getElementById('clear-btn');

const regex = /^1?\s?(\d{3}|\(\d{3}\))\s?-?\d{3}\s?-?\d{4}$/

check.onclick = checkNum;
clear.onclick = clearNum;

function checkNum() {
  console.log("check button pressed");
  const phoneString = phoneNum.value;
  if (phoneString === "") {
    window.alert("Please provide a phone number");
    return;
  }
  console.log("phone string: " + phoneString);
  console.log("test: " + regex.test(phoneString));
  if (regex.test(phoneString)) {
    result.innerText += "\n" + "Valid US number: " + phoneString;
  } else {
    result.innerText += "\n" + "Invalid US number: "+ phoneString;
  }
}

function clearNum() {
  console.log("clear button pressed");
  result.innerText = "";
}



