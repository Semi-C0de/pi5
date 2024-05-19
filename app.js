const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
const bodyParser = require('body-parser');

// Azure Storage configuration
const accountName = "rspbdisplaystorage";
const accountKey = "KJqjzliypxe3LYzXyCUanTqfzz3gCly6+bmyzIQJHEM/wH2kTx5tQRGbOqX05CmCofeAVyzLkUat+AStRJUiFw==";
const queueName = "msgs";
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const queueServiceClient = new QueueServiceClient(`https://${accountName}.queue.core.windows.net`, sharedKeyCredential);
const queueClient = queueServiceClient.getQueueClient(queueName);

app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-message', async (req, res) => {
    try {
        // Send message to the queue
        await queueClient.sendMessage(req.body.message);
        res.send("Message sent to the queue successfully.");
    } catch (error) {
        // If an error occurs during sending the message, respond with an error code
        console.error('Error sending message to queue:', error);
        res.status(500).send("Failed to send message to the queue.");
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen (port, () => {
    console.log('Server is running on port ' + port);
});