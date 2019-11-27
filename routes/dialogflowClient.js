const dialogflow = require("dialogflow")
const uuid = require("uuid")

class dialogflowClient {
  constructor(projectId) {
    this.projectId = projectId
  }

  async runSample(text, context) {
    // A unique identifier for the given session
    const sessionId = uuid.v4()

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient()
    const sessionPath = sessionClient.sessionPath(this.projectId, sessionId)

    // The text query request.
    const request = {
      session: sessionPath,
      queryParams: {
        contexts: [
          {
            name:
              "projects/" +
              this.projectId +
              "/agent/sessions/" +
              sessionId +
              "/contexts/" +
              context,
            lifespanCount: 1
          }
        ]
      },
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: "en-US"
        }
      }
    }

    // Send request and log result
    const responses = await sessionClient.detectIntent(request)
    const result = responses[0].queryResult

    return result
  }
}

module.exports = dialogflowClient
