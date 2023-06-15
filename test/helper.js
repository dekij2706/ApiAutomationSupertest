let request = require("supertest");
const nock = require("nock");

/*These functions provide various combinations of request methods (POST, GET, DELETE, PUT) along with optional headers,
bodies, and expected response codes. Each function accepts arguments that define the URL, API endpoint, headers, body, and 
expected response code. They make use of the Supertest library to send the respective HTTP requests and return the response.*/

//--------------------- 1.POST requests: -----------------------------------------------------------------------------------

//POST REQUEST WITHOUT HEADER AND BODY
async function postRequestNoHeaderNoBody(...arg) {
  return request
    .agent(arg[0]) //URL
    .post(arg[1]) //API
    .expect(arg[2]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//POST REQUEST WITHOUT HEADER
async function postRequestNoHeader(...arg) {
  return request
    .agent(arg[0]) //URL
    .post(arg[1]) //API
    .send(arg[2]) //BODY
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//POST REQUEST WITHOUT BODY
async function postRequestNoBody(...arg) {
  return request
    .agent(arg[0]) //URL
    .post(arg[1]) //API
    .set(arg[2]) //HEADER
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//POST REQUEST WITHOUT BODY AND WITHOUT EXPECTING RESPONSE CODE
async function postRequestNoBodyNoCode(...arg) {
  return request
    .agent(arg[0]) //URL
    .post(arg[1]) //API
    .set(arg[2]) //HEADER
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//POST REQUEST WITH HEADER AND BODY
async function postRequest(...arg) {
  return request
    .agent(arg[0]) //URL
    .post(arg[1]) //API
    .send(arg[2]) //BODY
    .set(arg[3]) //HEADER
    .expect(arg[4]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//POST REQUEST WITH HEADER AND BODY WITHOUT EXPECTED RESPONSE CODE
async function postRequestNoCode(...arg) {
  return request
    .agent(arg[0]) //URL
    .post(arg[1]) //API
    .send(arg[2]) //BODY
    .set(arg[3]) //HEADER
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//--------------------- 2.GET requests: -----------------------------------------------------------------------------------

//GET REQUEST WITHOUT HEADER AND BODY
async function getRequestNoHeaderNoBody(...arg) {
  return request
    .agent(arg[0]) //URL
    .get(arg[1]) //API
    .expect(arg[2]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//GET REQUEST WITHOUT HEADER, BODY AND WITHOUT EXPECTING RESPONSE CODE
async function getRequestNoHeaderNoBodyNoCode(...arg) {
  return request
    .agent(arg[0]) //URL
    .get(arg[1]) //API
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//GET REQUEST WITHOUT HEADER
async function getRequestNoHeader(...arg) {
  return request
    .agent(arg[0]) //URL
    .post(arg[1]) //API
    .send(arg[2]) //BODY
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//GET REQUEST WITHOUT BODY
async function getRequestNoBody(...arg) {
  return request
    .agent(arg[0]) //URL
    .get(arg[1]) //API
    .set(arg[2]) //HEADER
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//GET REQUEST WITHOUT BODY and WITHOUT EXPECTING RESPONSE CODE
async function getRequestNoBodyNoCode(...arg) {
  return request
    .agent(arg[0]) //URL
    .get(arg[1]) //API
    .set(arg[2]) //HEADER
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//GET REQUEST WITH HEADER AND BODY
async function getRequest(...arg) {
  return request
    .agent(arg[0]) //URL
    .get(arg[1]) //API
    .send(arg[2]) //BODY
    .set(arg[3]) //HEADER
    .expect(arg[4]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

// Function for mocking a GET request to the API endpoint with a server error
async function mockGetRequestServerError(apiEndpoint) {
  // Mocking the GET request to the API endpoint with a server error
  nock(apiEndpoint).get("/").reply(500, {
    status: 500,
    message: "Internal Server Error",
  });

  // Making the GET request using supertest
  return request(apiEndpoint).get("/");
}

//--------------------- 3.DELETE requests: -----------------------------------------------------------------------------------

//DELETE REQUEST WITHOUT HEADER AND BODY
async function deleteRequestNoHeaderNoBody(...arg) {
  return request
    .agent(arg[0]) //URL
    .del(arg[1]) //API
    .expect(arg[2]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//DELETE REQUEST WITHOUT HEADER
async function deleteRequestNoHeader(...arg) {
  return request
    .agent(arg[0]) //URL
    .del(arg[1]) //API
    .send(arg[2]) //BODY
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//DELETE REQUEST WITHOUT BODY
async function deleteRequestNoBody(...arg) {
  return request
    .agent(arg[0]) //URL
    .del(arg[1]) //API
    .set(arg[2]) //HEADER
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

// DELETE REQUEST WITH HEADER AND BODY
async function deleteRequest(...arg) {
  return request
    .agent(arg[0]) // URL
    .del(arg[1]) // API
    .set(arg[3]) // HEADER
    .send(arg[2]) // BODY
    .expect(arg[4]) // EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; // RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//--------------------- 4.PUT requests: -----------------------------------------------------------------------------------

//PUT REQUEST WITHOUT HEADER
async function putRequestNoHeader(...arg) {
  return request
    .agent(arg[0]) //URL
    .put(arg[1]) //API
    .send(arg[2]) //BODY
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.response);
      return Promise.reject(err);
    });
}

//PUT REQUEST WITH HEADER AND BODY
async function putRequest(...arg) {
  return request
    .agent(arg[0]) //URL
    .put(arg[1]) //API
    .set(arg[3]) //HEADER
    .send(arg[2]) //BODY
    .expect(arg[4]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//PUT REQUEST WITH NO BODY
async function putRequestNoBody(...arg) {
  return request
    .agent(arg[0]) //URL
    .put(arg[1]) //API
    .set(arg[2]) //HEADER
    .expect(arg[3]) //EXPECTED RESPONSE CODE
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

//PUT REQUEST WITH HEADER AND BODY BUT WITHOUT EXPECTING RESPONSE CODE
async function putRequestNoCode(...arg) {
  return request
    .agent(arg[0]) //URL
    .put(arg[1]) //API
    .send(arg[2]) //BODY
    .set(arg[3]) //HEADER
    .then(function (res) {
      return res; //RETURNS RESPONSE
    })
    .catch(function (err) {
      console.error(err.message);
      return Promise.reject(err);
    });
}

module.exports = {
  postRequestNoHeaderNoBody,
  postRequestNoHeader,
  postRequestNoBody,
  postRequestNoBodyNoCode,
  postRequest,
  postRequestNoCode,
  getRequestNoHeaderNoBody,
  getRequestNoHeaderNoBodyNoCode,
  getRequestNoHeader,
  getRequestNoBody,
  getRequestNoBodyNoCode,
  getRequest,
  mockGetRequestServerError,
  deleteRequestNoHeaderNoBody,
  deleteRequestNoHeader,
  deleteRequestNoBody,
  deleteRequest,
  putRequestNoHeader,
  putRequest,
  putRequestNoBody,
  putRequestNoCode,
};
