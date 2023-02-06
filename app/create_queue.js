// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const { REGION, QUEUE_URL, QUEUE_TESTE_NAME } = require("./constants");
// Set the region
AWS.config.update({ region: REGION });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: "latest", endpoint: QUEUE_URL });

const params = {
  QueueName: QUEUE_TESTE_NAME,
  Attributes: {
    DelaySeconds: "60",
    MessageRetentionPeriod: "86400",
  },
};

sqs.createQueue(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});
