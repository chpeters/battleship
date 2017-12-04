const root = 'http://localhost:4000/api/' // change this in prod
const POST = 'POST'     // CREATE
//const GET = 'GET'       // READ
const PUT = 'PUT'       // UPDATE
const DELETE = 'DELETE' // DELETE

function createEndpoint(path) {
  return root + path ;
}

async function request(path, options = { credentials: 'include' }) {
  let response = await fetch(path, options)
  return parseResponse(response)
}

function createRequestOptions(requestType, data) {
  let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  })

  return {
    method: requestType,
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(data),
  }
}

async function parseResponse(response) {
  let json = await response.json()
  if (response.ok) {
    return json
  } else {
    return Promise.reject(json)
  }
}

const api = {

  newTableCode() {
    return "" + (Math.floor(Math.random() * 90000000) + 10000000);
  }

}

export default api;
