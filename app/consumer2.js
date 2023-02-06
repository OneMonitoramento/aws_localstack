const { Consumer } = require("sqs-consumer");
const { SQSClient } = require("@aws-sdk/client-sqs");
const {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  QUEUE_URL,
  QUEUE_TESTE_NAME,
} = require("./constants");

const app = Consumer.create({
  queueUrl: QUEUE_URL + "/" + QUEUE_TESTE_NAME,
  handleMessage: async (message) => {
    console.log("message", message);
    app.stop();
    // ...
  },

  sqs: new SQSClient({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
    endpoint: QUEUE_URL,
  }),
});

app.on("error", (err) => {
  console.error("@error", err.message);
});

app.on("processing_error", (err) => {
  console.error(err.message);
});

app.on("timeout_error", (err) => {
  console.error(err.message);
});

app.start();
