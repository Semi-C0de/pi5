const express = require('express');
const app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname+ "/public"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen (port, () => {
    console.log('Server is running on port' + port);
});