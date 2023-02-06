const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");
const { SQSClient } = require("@aws-sdk/client-sqs");
const {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  QUEUE_URL,
  QUEUE_TESTE_NAME,
} = require("./constants");

AWS.config.update({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const sqs = new AWS.SQS({
  apiVersion: "latest",
  endpoint: QUEUE_URL,
});

const sqs2 = new SQSClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  endpoint: QUEUE_URL,
});

const queueURL = QUEUE_URL + "/" + QUEUE_TESTE_NAME;

const app = Consumer.create({
  queueUrl: queueURL,
  handleMessage: async (message) => {
    console.log("msg", message);
  },
  sqs: sqs2,
  
  messageAttributeNames: ["Title"],
});

app.on("error", (err) => {
  console.error(err.message);
});

app.on("processing_error", (err) => {
  console.error(err.message);
});

app.on("timeout_error", (err) => {
  console.error(err.message);
});

app.start();
