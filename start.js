var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/src', { maxAge: 31536000000 }));

app.listen(process.env.PORT || 3000);

console.log("Server running ...");