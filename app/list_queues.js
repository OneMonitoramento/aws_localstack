// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  QUEUE_URL,
  REGION,
} = require("./constants");
// Set the region
AWS.config.update({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// Create an SQS service object
const sqs = new AWS.SQS({
  apiVersion: "latest",
  endpoint: QUEUE_URL,
});

const params = {};

sqs.listQueues(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrls);
  }
});
