const textResult = document.getElementById('resultParagraph');
const button = document.getElementById('check-btn');
const regex = /[a-z0-9]/g;

const getInputField = () => {

  // get input text and convert to lowercase
  const inputValue = document.getElementById('text-input').value;
  if (inputValue === "") {
    alert("Please input a value");
    return;
  }
  const inputLower = inputValue.toLowerCase();

  // remove digits and symbols etc.
  const charsArray = inputLower.match(regex);
  if (charsArray === null) {
    textResult.innerText = `${inputValue} is not a palindrome`;
    return;
  }
  const reversedArray = [...charsArray];

  // reverse 
  reversedArray.reverse();

  // compare
  let counter = 0;
  for (let i = 0; i < charsArray.length; i++) {
    if (charsArray[i] === reversedArray[i]) {
      counter++;
    }
  }
  if (counter === charsArray.length) {
    textResult.innerText = `${inputValue} is a palindrome`;
  } else {
    textResult.innerText = `${inputValue} is not a palindrome`;
  }
};

button.addEventListener('click', getInputField);