// const express = require('express')
// const app = express()
// const server = require('http').createServer(app);
// const WebSocket = require("ws");
// const port = 8082

// const wss = new WebSocket.Server({ server:server });

// wss.on('connection', function connection(ws){
//   console.log("new client connected!");
//   ws.send("new client");
//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
// });
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// server.listen(port, () => {
//   console.log("Listening on port "+port)
// })