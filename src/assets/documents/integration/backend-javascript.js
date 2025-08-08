// server.js - Local proxy to call SAP Integration Suite from the browser

const express = require('express');
const fetch = require('node-fetch'); // install with: npm install node-fetch@2
const app = express();
const PORT = 5000;

// Your Integration Suite target URL
const T_SINGLE_URL = 'https://14e6c98atrial.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/request-business-partners';

const T_ALL_URL = 'https://14e6c98atrial.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/request-business-partners/all';

const T_SINGLE_ADD = 'https://14e6c98atrial.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/request-business-partners/single/add';

const T_ALL_ADD = 'https://14e6c98atrial.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/request-business-partners/all/add';





// Your bearer token for Integration Suite
let BEARER_TOKEN = 'dummy value for first attempt';

app.use(express.json()); // allow JSON body parsing

// all purpose middleware to check request is received
app.use((req, res, next) => {
  next();
});

// Enable CORS for browser access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  // Handle preflight OPTIONS request directly
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Proxy endpoint
app.all('/api/bp/single', handleBPRequestWithOpt(T_SINGLE_URL));
app.all('/api/bp/all', handleBPRequestWithOpt(T_ALL_URL));
app.all('/api/bp/single/add', handleBPRequestWithOpt(T_SINGLE_ADD));
app.all('/api/bp/all/add', handleBPRequestWithOpt(T_ALL_ADD));


function handleBPRequestWithOpt(option) {
  return async function handleBPRequest(req, res) {
    try {
      let response = await fetch(option, {
        method: req.method,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
      });

      if (response.status === 401) {
        console.log('Token expired. Getting a new one...');
        token = await getNewToken();
        return await handleBPRequest(req, res);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // if successful
      const data = await response.json();
      res.status(response.status).json(data);  

    } catch (err) {
      console.error('Proxy error:', err);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
};

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});

// Get new token

async function getNewToken() {
  const tokenUrl = '{enter your token URL here}'; // replace with your token URL
  const clientId = '{enter your client ID here}'; // replace with your client ID
  const clientSecret = '{enter your client secret here}'; // replace with your client secret

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    })
  });

  if (!response.ok) {
    throw new Error('Failed to retrieve token');
  }

  const data = await response.json();
  BEARER_TOKEN = data.access_token;
}