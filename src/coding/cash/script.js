let price = 18;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0.5],
  ['ONE', 1],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];


// HTML variables

const cash = document.getElementById('cash');
const changeInDrawer = document.getElementById('change-in-drawer');
const total = document.getElementById('total');
const inputForm = document.getElementById('input-form');
const changeDue = document.getElementById('change-due');


// Function to update drawer display

const initChangeInDrawer = () => {
  changeInDrawer.innerHTML = `
  <p><strong>Change in drawer:</strong></p>
  <p>Pennies: ${cid[0][1]}</p>
  <p>Nickels: ${cid[1][1]}</p>
  <p>Dimes: ${cid[2][1]}</p> 
  <p>Quarters: ${cid[3][1]}</p>
  <p>Ones: ${cid[4][1]}</p>
  <p>Fives: ${cid[5][1]}</p>
  <p>Tens: ${cid[6][1]}</p>
  <p>Twenties: ${cid[7][1]}</p>
  <p>Hundreds: ${cid[8][1]}</p>`
};


// function to update price display

const initPrice = () => {
  total.innerText = `$${price}`
};


// function to check cash is a number and greater than price

const checkCash = (num) => {
  const cashFl = parseFloat(num.value);
  console.log("price: " + price + typeof price);
  console.log("cashFl: " + cashFl + typeof cashFl);

  if (isNaN(cashFl)) {
    alert("Please enter a number");
    return 1;
  }
  
  if (cashFl < price) {
    alert("Customer does not have enough money to purchase the item");
    return 1;
  }

  if (cashFl === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return 1;
  }
};


// Function to calculate change per demonination

const calcChange = (num) => {
  const cashFl = parseFloat(num.value);
  const Change = parseFloat(cashFl) - price;
  let remainingChange = Change;

  // Set up an array to capture change per denomination
  // Each element: ['name', denomination unit, no. of units change]
  // Initialise no. of units change to 0
  const working = [
    ['PENNY', 0.01, 0],
    ['NICKEL', 0.05, 0],
    ['DIME', 0.1, 0],
    ['QUARTER', 0.25, 0],
    ['ONE', 1, 0],
    ['FIVE', 5, 0],
    ['TEN', 10, 0],
    ['TWENTY', 20, 0],
    ['ONE HUNDRED', 100, 0]
  ];

  // Loop through working from highest unit (backwards)
  for (let i = working.length - 1; i > -1; i--) {
    console.log(working[i][0]);
    console.log("Change: " + Change);
    console.log("remainingChange: " + remainingChange);

    // Check remaining change due > current denomination & available in drawer
    // If so add to change count, reduce remaining change, reduce available in drawer
    while (remainingChange >= working[i][1] && 
          parseFloat(cid[i][1].toFixed(2)) >= working[i][1]) {
      working[i][2]++;
      remainingChange -= working[i][1];
      remainingChange = parseFloat(remainingChange.toFixed(2));
      cid[i][1] -= working[i][1];
    }
    console.log("change in unit: " + working[i][2]);
  }
  return working;
}


// Function to update results
const updateResults = (num, arr) => {

  const cashFl = parseFloat(num.value);
  const Change = parseFloat(cashFl) - price;

  // Get the total change available in the drawer
  let totalChangeInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
    totalChangeInDrawer += cid[i][1];
    totalChangeInDrawer = parseFloat(totalChangeInDrawer.toFixed(2));
  }

  // Get the total of calculated change required by denomination
  let sumOfChange = 0;
  for (let y = 0; y < arr.length; y++) {
    sumOfChange += (arr[y][1] * arr[y][2]);
    sumOfChange = parseFloat(sumOfChange.toFixed(2));
    console.log("sumOfChange: " + sumOfChange + " " + typeof sumOfChange);
  }

  // Check total change is available in required denominations
  if (sumOfChange === Change) {

    // Update 'CLOSED' or 'OPEN' depending on whether all change availabe is used
    console.log("totalChangeInDrawer: " + totalChangeInDrawer + " " + typeof totalChangeInDrawer);
    console.log("sumOfChange: " + sumOfChange + " " + typeof sumOfChange);
    if (totalChangeInDrawer === 0) {
      changeDue.innerHTML = "<p>Status: CLOSED</p>"
    } else {
      changeDue.innerHTML = "<p>Status: OPEN</p>"
    }

    // Update change amount
    for (let i = arr.length - 1; i > -1; i--) {
      if (arr[i][2] !== 0) {
        changeDue.innerHTML += `<p>${arr[i][0]}: $${arr[i][1] * arr[i][2]}</p>`
      }
    }
  } else {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  }
};


// Event triggers
window.addEventListener('load', () => {
  initChangeInDrawer();
  initPrice();
  cash.value = "";
});

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  initChangeInDrawer();
  if (checkCash(cash) === 1) {
    return;
  } else {;
    const working = calcChange(cash);
    updateResults(cash, working);
  }
});
