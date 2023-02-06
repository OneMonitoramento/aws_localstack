// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const { REGION, QUEUE_URL, QUEUE_TESTE_NAME } = require("./constants");
// Set the region
AWS.config.update({ region: REGION });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const queueURL = QUEUE_URL + "/" + QUEUE_TESTE_NAME;

const params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  /* MessageAttributeNames: ["All"], */
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

async function reciveMessage(params) {
  return new Promise((resolve, reject) => {
    sqs.receiveMessage(params, function (err, data) {
      if (err) {
        return reject(err);
      } else if (data.Messages) {
        return resolve(data);
      }
    });
  });
}

async function deleteMessage(queueURL, message) {
  return new Promise((resolve, reject) => {
    sqs.deleteMessage(
      {
        QueueUrl: queueURL,
        ReceiptHandle: message.ReceiptHandle,
      },
      function (err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      }
    );
  });
}

(async () => {
  try {
    const { Messages } = await reciveMessage(params);
    console.log("Messages", Messages.length);
    for (msg of Messages) {
      console.log(JSON.parse(msg.Body));
      const deleted = await deleteMessage(queueURL, msg);
      console.log("deleted", deleted);
    }
  } catch (error) {
    console.log("recive error", error);
  }
})();
