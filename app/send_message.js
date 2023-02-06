// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const { randomUUID } = require("crypto");
const { REGION, QUEUE_URL, QUEUE_TESTE_NAME } = require("./constants");
// Set the region
AWS.config.update({ region: REGION });

// Create an SQS service object
const sqs = new AWS.SQS({
  apiVersion: "latest",
  endpoint: QUEUE_URL,
});

const queueURL = QUEUE_URL + "/" + QUEUE_TESTE_NAME;

const params = {
  // Remove DelaySeconds parameter and value for FIFO queues
  DelaySeconds: 5,
  MessageBody: JSON.stringify({ data: "teste data 3", id: randomUUID() }),

  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: queueURL,
};

sqs.sendMessage(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
