const request = require("supertest");
let helpers = require("./helper.js");
let expect = require("chai").expect;
const { apiEndpoint, incorrectEndpoint } = require("./config.js");
let testData = require("./testData.js");
const nock = require("nock");

describe("CRUD API Testing", () => {
  //GET Method - Positive
  it("GET all values - should return a list of all values in the store", async () => {
    console.log("Get all values");

    const getAllValuesResponse = await helpers.getRequestNoHeaderNoBody(apiEndpoint, "/", 200);
    expect(getAllValuesResponse.body).to.be.an("array");
    //  Verify that each item in the response has the "main_key" and "value" fields
    getAllValuesResponse.body.forEach((item) => {
      expect(item).to.have.property("main_key");
      expect(item.main_key).to.be.a("string");
      expect(item).to.have.property("value");
    });
    //  Verify that the response contains the expected number of items, matching the key store quota of 10
    expect(getAllValuesResponse.body.length).to.equal(10);
    console.log(getAllValuesResponse.body);
  });
  // GET Method - Negative
  it("GET request to incorrect endpoint - should return a 404 error", async () => {
    console.log("Send GET request to incorrect endpoint");

    const getIncorrectEndpointResponse = await helpers.getRequestNoHeaderNoBody(incorrectEndpoint, "/", 404);
    expect(getIncorrectEndpointResponse.body).to.have.property("message");
    expect(getIncorrectEndpointResponse.body.message).to.equal("Not Found");
  });
  //Send a GET request and simulate a server error and verify that the API returns a 5XX error - use Mocking with Nock
  it("Mocking the GET request to the API endpoint with a server error 5xx", function (done) {
    helpers.mockGetRequestServerError(apiEndpoint);

    // Making the GET request using supertest
    request(apiEndpoint)
      .get("/")
      .end(function (err, res) {
        // Asserting the response status and error message
        expect(res.status).to.be.within(500, 599);
        expect(res.body.status).to.equal(500);
        expect(res.body.message).to.equal("Internal Server Error");
        // Clean up the mock after the test is complete
        nock.cleanAll();
        done();
      });
  });

  //With a  PUT method, update or replace an existing resource on the server
  // PUT Method - Positive
  it("should send a PUT request with a valid main_key and value", async () => {
    console.log("Add new value");
    // Send the first PUT request
    const putAddNewValues1Response = await helpers.putRequestNoHeader(apiEndpoint, "/", testData.addNewValueBody, 200);
    console.log(putAddNewValues1Response.body);
    // Expect the first PUT request to be successful
    expect(putAddNewValues1Response.body).to.deep.equal(testData.addNewValueBody);
  });
  // PUT Method - Negative
  it("Send the SECOND PUT request with a valid main_key and value", async () => {
    console.log("Try to add new value again");

    // Send the second PUT request "you reached your quta" is displayed instead of "you reached your quota" (there is the type in the response)
    const putAddNewValues2Response = await helpers.putRequestNoHeader(apiEndpoint, "/", testData.addNewValueBody, 400);
    console.log(putAddNewValues2Response);

    console.log(await putAddNewValues2Response.body);

    // Expect the second PUT request to return a quota error
    expect(await putAddNewValues2Response.body).to.equal("you reached your quota");
  });

  it("should send a PUT request with XML file file in the body", async () => {
    console.log("Try to send XML file");

    const putXMLResponse = await helpers.putRequest(apiEndpoint, "/", testData.XMLBody, testData.xmlHeader, 400);
    console.log("The PUT response body:", putXMLResponse.text); // Log the raw response body

    expect(putXMLResponse.status).to.equal(400);
    expect(putXMLResponse.text).to.contain("Expecting value: line 1 column 1 (char 0)");
  });
  //DELETE Method - Positive

  it("should send a DELETE request with an existing JSON object", async () => {
    console.log("Try to send DELETE request with JSON object");

    // Send the DELETE request
    const deleteResponse = await helpers.deleteRequestNoHeader(apiEndpoint, "/", testData.deleteValueBody, 200);
    console.log(deleteResponse.body);

    // Expect the DELETE request to be successful
    expect(deleteResponse.status).to.equal(200);
    expect(deleteResponse.body).to.deep.equal({ main_key: "AAATestKey1" });
  });
  //DELETE Method - Negative

  it("should send a DELETE request a Non-Existent Value JSON object", async () => {
    /*API is not properly handling the deletion process. In a well-designed API, deleting a resource that no longer exists should 
    typically result in a different status code to indicate that the resource is 404 not found.*/
    const deleteResponseNonExisting = await helpers.deleteRequestNoHeader(apiEndpoint, "/", testData.nonExistingValueBody, 200);
    console.log(deleteResponseNonExisting.body);

    // Expect the DELETE request to be successful
    expect(deleteResponseNonExisting.status).to.equal(200);
    expect(deleteResponseNonExisting.body).to.have.property("value").that.is.a("string");

    // Expect the response body or message to indicate that the value does not exist or could not be deleted
    //expect(deleteResponseNonExisting.body).to.have.property("message").that.equals("Value does not exist or could not be deleted");
  });

  //With the POST method, create new resources or submit data to the server.
  // POST Method - Positive
  it("should send a POST request with existing JSON object", async () => {
    const postValueExistResponse = await helpers.postRequestNoHeader(apiEndpoint, "/", testData.postValuetExistBody, 200);
    console.log(postValueExistResponse.body);

    expect(postValueExistResponse.status).to.equal(200);
    expect(postValueExistResponse.text).to.contain("value dose not exist");
  });
  // POST Method - Negative
  it("should send a POST request with new not existing JSON object", async () => {
    const postValueNotExistResponse = await helpers.postRequestNoHeader(apiEndpoint, "/", testData.postValueNotExistBody, 400);
    console.log(postValueNotExistResponse.body);

    expect(postValueNotExistResponse.status).to.equal(400);
    expect(postValueNotExistResponse.text).to.contain("value dose not exist");
  });
});
