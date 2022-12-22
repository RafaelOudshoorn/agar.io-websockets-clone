//https://ably.com/blog/web-app-websockets-nodejs
const WebSocket = require('ws');

class SocketServer {
  initialize(onConnect, onDisconnect, onMessage) {
    this.wss = new WebSocket.Server({ port: 8082 });

    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.onMessage = onMessage;
    this.clients = new Map();

    // a client is connecting
    this.wss.on('connection', (ws) => {
      const id = this.uuidv4();
      this.clients.set(ws, id);

      // on a client message event, we handle some data and fire onMessage event
      ws.on('message', (dataString) => {
        const dataObject = JSON.parse(dataString);
        const id = this.clients.get(ws);

        if (typeof this.onMessage === 'function') {
          this.onMessage(id, dataObject);
        }
      });

      // client disconnects
      ws.on("close", () => {
        const id = this.clients.get(ws);
        this.clients.delete(ws);
        if (typeof this.onDisconnect === 'function') {
          this.onDisconnect(id);
        }
      });

      // after initialization fire connected event
      if(typeof this.onConnect == "function") {
        this.onConnect(id);
      }
    });

    console.log("Socket Server Started");
  }

  broadcast(dataObject, excludeId = -1) {
    for (let [ws, id] of this.clients) {
      if(id != excludeId) {
        // console.log("Broadcast message send: " + id);
        ws.send(JSON.stringify(dataObject));  
      }
    }
  }

  sendMessage(toId, dataObject) {
    for (let [ws, id] of this.clients) {
      if(id == toId) {
        ws.send(JSON.stringify(dataObject));  
        return;
      }
    }
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

module.exports = SocketServer;