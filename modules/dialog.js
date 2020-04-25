// Imports the dialogflow wrapper.
const dialogflow = require('dialogflow');
// Creates uuid, this makes sessionIds.
const uuid = require('uuid');
// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');
// Creates a client.
const storage = new Storage();

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param msg - Message class of Discord.js
 * @param {string} projectId - The project to be used.
 * @param {string} argument - The argument the user uses.
*/

exports.runSample = async function runSample(msg,projectId,argument) {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: argument,
        // The language used by the client (en)
        languageCode: 'en',
      },
    },
  };

  // Send request and log result for debug.
  const responses = await sessionClient.detectIntent(request);
  //console.log('Detected intent');
  const result = responses[0].queryResult;
  //console.log(`  Query: ${result.queryText}`);
  //console.log(`  Response: ${result.fulfillmentText}`);
  const response = result.fulfillmentText
  msg.reply(response)
  if (result.intent) {
    //console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    //console.log(`  No intent matched.`);
  }
}
