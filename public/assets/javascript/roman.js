const inpNum = document.getElementById('number');
const outNum = document.getElementById('output');
const convertBtn = document.getElementById('convert-btn');
let converted;

const convArray = [
{roman: "M", arabic: 1000},
{roman: "CM", arabic: 900},
{roman: "D", arabic: 500},
{roman: "CD", arabic: 400},
{roman: "C", arabic: 100},
{roman: "XC", arabic: 90},
{roman: "L", arabic: 50},
{roman: "XL", arabic: 40},
{roman: "X", arabic: 10},
{roman: "IX", arabic: 9},
{roman: "V", arabic: 5},
{roman: "IV", arabic: 4},
{roman: "I", arabic: 1}
];

convertBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const converted = parseInt(inpNum.value);
  
  if (inpNum.value == "") {
    output.innerHTML = `<p id=resultTxt>Please enter a valid number</p>`;
  }
  else if (converted < 0) {
    output.innerHTML = `<p id=resultTxt>Please enter a number greater than or equal to 1</p>`;
  }
  else if (converted >= 4000) {
    output.innerHTML = `<p id=resultTxt>Please enter a number less than or equal to 3999</p>`;
  }
  else {
    conversion(converted);
  }
});

const conversion = (conv) => {
  let numeralCt = 0;
  let string = "";
  for (let convLp = 0; convLp < convArray.length; convLp++) {
    if (conv / convArray[convLp].arabic > 0) {
      numeralCt = Math.floor(conv / convArray[convLp].arabic);
      conv = conv % convArray[convLp].arabic;
      for (let str = 0; str < numeralCt; str++) {
        string += convArray[convLp].roman;
      }
    }
  }
  outNum.innerHTML = `<p id="resultTxt">${string}</p>`; 
};
