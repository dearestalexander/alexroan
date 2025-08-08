const bpForm = document.getElementById('bp-form');
const searchErrorText = document.getElementById('bp-error');
const bpResults = document.getElementById('js-bp-results');

let displayDetail;
let displayAddress;

const urlBpSingle = 'http://localhost:5000/api/bp/single';
const urlBpAll = 'http://localhost:5000/api/bp/all';
const urlBpSingleWithAdd = 'http://localhost:5000/api/bp/single/add';
const urlBpAllWithAdd = 'http://localhost:5000/api/bp/all/add';

const token = "";

bpForm.addEventListener('submit', async (e) => {
  bpResults.innerHTML = ""; // clear results
  e.preventDefault();

  const bpNumber = document.getElementById('bp-inp-number').value;
  const getAddress = document.getElementById('bp-inp-address').checked;
  const tabResults = document.getElementById('bp-inp-tab').checked;
  displayDetail = tabResults;
  displayAddress = getAddress;

  // check valid input
  if (bpNumber == "" ||  /^\d{7}$/.test(bpNumber)) {
    searchErrorText.innerText = "";  
  } else {
    searchErrorText.innerText = "Leave blank or enter a 6 digit BP id";
    return;
  }

  // track request details
  const request = {
    url: "",
    method: "",
    body: ""
  }

  if (bpNumber != "" && !getAddress) {
    request.url = urlBpSingle;
    request.method = "POST";
    request.body = {
      employee_id: bpNumber
    }
  } else if (bpNumber != "" && getAddress) {
    request.url = urlBpSingleWithAdd;
    request.method = "POST";
    request.body = {
      employee_id: bpNumber
    }
  } else if (bpNumber === "" && !getAddress) {
    request.url = urlBpAll;
    request.method = "GET";
  } else if (bpNumber === "" && getAddress) {
    request.url = urlBpAllWithAdd;
    request.method = "GET";
  }
  getData(request);
})


// main function
async function getData(request) {
  try {
    let response = await getResponse(request, token);
    const data = await response.json();

    const bpArray = await normaliseBPResponse(data);
    outputData(bpArray);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


// fetch to web app server
async function getResponse(request, token) {
  return fetch(request.url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : JSON.stringify(request.body),
  });
}


// ensure results are always in an array
async function normaliseBPResponse(data) {
  if (Array.isArray(data.d?.results)) {
    return data.d.results; // multiple BPs
  } else if (data.d) {
    return [data.d]; // wrap single BP in array for consistent handling
  } else {
    return []; // or handle unexpected response
  }
}

// display results
function outputData(array) {
  if (displayDetail) {
    const tableContainer = document.createElement("div");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // headers
    const firstObj = array[0];
    const headerRow = document.createElement("tr")
    for (const myTitle in firstObj) {
      const th = document.createElement("th");
      th.textContent = myTitle;
      headerRow.appendChild(th);
    }
    if (displayAddress) {
      const firstObjAdd = firstObj.to_BusinessPartnerAddress.results[0];
      for (const myAddTitle in firstObjAdd) {
        const th = document.createElement("th");
        th.textContent = myAddTitle;
        headerRow.appendChild(th);
      }
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // rows
    array.forEach(bp => {
      const row = document.createElement('tr');
      for (const myKey in bp) {
        const cell = document.createElement('td');
        cell.textContent = bp[myKey]
        row.appendChild(cell);
      }
      if (displayAddress) {
        const addRow = bp.to_BusinessPartnerAddress.results[0];
        for (const myAddRow in addRow) {
        const td = document.createElement("td");
        td.textContent = addRow[myAddRow];
        row.appendChild(td);
        }
      }
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    tableContainer.classList.add("js-results-table");
    bpResults.appendChild(tableContainer);

  } else {
    const cards = document.createElement('div');
    cards.classList.add('js-results-cards');
      array.forEach(bp => {
        const card = document.createElement('div');
        card.classList.add("js-results-card")
        card.innerHTML = `
          <h2 class="card-bp">Business partner: 
            <span class="card-bp-no">${bp.BusinessPartner}</span>
          </h2> 
          <div class="card-details">
            <span class="card-field">Name: 
              <span class="card-value">${bp.BusinessPartnerFullName}</span>
            </span>
            <span class="card-field">Female: 
              <span class="card-value">${bp.IsFemale}</span>
            </span> 
            <span class="card-field">Male: 
              <span class="card-value">${bp.Male}</span>
            </span> 
              <span class="card-field">Personnel number: <span class="card-value">${bp.PersonNumber}</span>
            </span>  
            <span class="card-field">Blocked: 
              <span class="card-value">${bp.BusinessPartnerIsBlocked}</span>
            </span>
          </div>`
        if (displayAddress) {
          bp.to_BusinessPartnerAddress.results.forEach(add => {
            card.innerHTML += `
            <div class="card-details">
                <span class="card-field">Address ID: <span class="card-value">${add.AddressID}</span></span>
                <span class="card-field">HouseNumber: <span class="card-value">${add.HouseNumber}</span></span>
                <span class="card-field">StreetName: <span class="card-value">${add.StreetName}</span></span>
                <span class="card-field">CityName: <span class="card-value">${add.CityName}</span></span>
                <span class="card-field">Country: <span class="card-value">${add.Country}</span></span>
                <span class="card-field">Postal code: <span class="card-value">${add.PostalCode}</span></span>
            </div>`
          })
        
      }
      cards.appendChild(card);
    })
    bpResults.appendChild(cards);
  }
}