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
let BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vMTRlNmM5OGF0cmlhbC5hdXRoZW50aWNhdGlvbi5hcDIxLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktZGJlMTliZmE5MCIsInR5cCI6IkpXVCIsImppZCI6ICJzYkZFVTNyaUFoUUFDK0xqTjZoMXNMMFIramFaeUxjeWtybnNwWTBQbkdzPSJ9.eyJqdGkiOiJkOWExNDI0NTZlMDg0NjIwOGUwMzE2NzdiMjAxNGY2OSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiJlY2ZlZjJmMS01ZjRjLTQyNTQtYTM5Ny1jOTUyNmIxZTlmNGYiLCJ6ZG4iOiIxNGU2Yzk4YXRyaWFsIiwic2VydmljZWluc3RhbmNlaWQiOiI3NWU3ZDA5YS1lN2NmLTRmNTctYjJhYy02N2QyY2ZjMWNmODEifSwic3ViIjoic2ItNzVlN2QwOWEtZTdjZi00ZjU3LWIyYWMtNjdkMmNmYzFjZjgxIWI3MTg0N3xpdC1ydC0xNGU2Yzk4YXRyaWFsIWIxOTYiLCJhdXRob3JpdGllcyI6WyJ1YWEucmVzb3VyY2UiLCJpdC1ydC0xNGU2Yzk4YXRyaWFsIWIxOTYuRVNCTWVzc2FnaW5nLnNlbmQiXSwic2NvcGUiOlsidWFhLnJlc291cmNlIiwiaXQtcnQtMTRlNmM5OGF0cmlhbCFiMTk2LkVTQk1lc3NhZ2luZy5zZW5kIl0sImNsaWVudF9pZCI6InNiLTc1ZTdkMDlhLWU3Y2YtNGY1Ny1iMmFjLTY3ZDJjZmMxY2Y4MSFiNzE4NDd8aXQtcnQtMTRlNmM5OGF0cmlhbCFiMTk2IiwiY2lkIjoic2ItNzVlN2QwOWEtZTdjZi00ZjU3LWIyYWMtNjdkMmNmYzFjZjgxIWI3MTg0N3xpdC1ydC0xNGU2Yzk4YXRyaWFsIWIxOTYiLCJhenAiOiJzYi03NWU3ZDA5YS1lN2NmLTRmNTctYjJhYy02N2QyY2ZjMWNmODEhYjcxODQ3fGl0LXJ0LTE0ZTZjOThhdHJpYWwhYjE5NiIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiMjZmMzQwMDEiLCJpYXQiOjE3NTM5NjM2NzksImV4cCI6MTc1Mzk2Nzg3OSwiaXNzIjoiaHR0cHM6Ly8xNGU2Yzk4YXRyaWFsLmF1dGhlbnRpY2F0aW9uLmFwMjEuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiJlY2ZlZjJmMS01ZjRjLTQyNTQtYTM5Ny1jOTUyNmIxZTlmNGYiLCJhdWQiOlsidWFhIiwic2ItNzVlN2QwOWEtZTdjZi00ZjU3LWIyYWMtNjdkMmNmYzFjZjgxIWI3MTg0N3xpdC1ydC0xNGU2Yzk4YXRyaWFsIWIxOTYiLCJpdC1ydC0xNGU2Yzk4YXRyaWFsIWIxOTYuRVNCTWVzc2FnaW5nIl19.Gpjjs1E4HoTiN6qOC_P8l04tqb_TK6fg4TPpvuWJHvYm-Qp4KuH0qn1-wuLxAPyLDvE75q45GlG9q9DPtDS771cP9gmIxyket9Lqbs-JKhY0rmB6LAH9s-PS9438UY32V0jw-v0zTpZvgR_DwxJuo7bik5Nd-_1Trtu6wtgAYAzUPEsNNdpzpeM-7R21G_7UuwoighPUB40BKd1FkdKH61MWGpD0y1hRBZEN9XYnsVqTXbKZklc2740dzQvy5SnyIg_Nkn5TopcolaCxc44ZrJhAf4ZnyuwCPWyJWd0UaQyIg-R_maY1lBB7Z6aWgihhgb1J6FimsK5LY_6pWEu-aA';

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
  const tokenUrl = 'https://14e6c98atrial.authentication.ap21.hana.ondemand.com/oauth/token';
  const clientId = 'sb-75e7d09a-e7cf-4f57-b2ac-67d2cfc1cf81!b71847|it-rt-14e6c98atrial!b196';
  const clientSecret = '838cb96c-bc3c-46e8-b933-7a0af00085cb$t6xszUlWimdlrmNQfrGLLk3d0gOuzUim_T0VQj0PrKQ=';

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