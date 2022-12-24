let SocketServerClass = require("./SocketServer");

let ss = new SocketServerClass();

let userInfo = new Map();

const colors = [
    "blue",
    "lightblue",
    "yellow",
    "red",
    "green",
    "purple",
    "orange"
];

ss.initialize(
    // on connect
    function (id) {
        userInfo.set(id, {
            "id": id,
            "username": null,
            "room": null,
            "color": null,
            "ball": {
                "top": null,
                "left": null,
                "size": null,
                "points": null
            }
        });
        ss.broadcast("client connected: " + id);
        console.log(id + " connected!");
    },
    // on disconnect
    function (id) {
        let info = userInfo.get(id);
        console.log("client disconnected: "+ info.username + " " + id);
        ss.broadcast({
            "action": "playerDisconnectShowChat",
            "data": info.username
        });
        userInfo.delete(id);
    },
    // on message
    function (id, data) {
        let info = userInfo.get(id);
        switch(data.action){
            case "setusername":
                info.username = data.data;
                info.room = data.room;
                ss.broadcast({
                    "action": "playerJoinShowChat",
                    "data": info.username
                });
                ss.broadcast({
                    "action": "sendUpdatePlayers",
                    "data": sendUpdatePlayers()
                });
                ss.broadcast("["+ info.username + " joined the game]");
            break;
            case "chat":
                var chatColor = "black";
                if(info.color != null){
                    var chatColor = info.color;
                }
                ss.broadcast({
                    "action": "updateChat",
                    "username": info.username,
                    "color": chatColor,
                    "data": data.data
                });
            break;
            case "spawnParticles":
                spawnParticle();
            break;
            case "clearParticles":
                clearParticles();
            break;
            case "enterGame":
                info.ball.top = Math.floor(Math.random() * 875);
                info.ball.left = Math.floor(Math.random() * 1590);
                info.ball.size = 15;
                info.ball.points = 0;
                const color = Math.floor(Math.random() * colors.length);
                info.color = colors[color];

                ss.broadcast({
                    "action": "enterGame",
                    "id": id,
                    "username": info.username,
                    "data": {
                        "top": info.ball.top,
                        "left": info.ball.left,
                        "size": info.ball.size,
                        "points": info.ball.points,
                        "color": info.color
                    }
                });
            break;
            case "moveUp":
                info.ball.top = info.ball.top ++;
                ss.broadcast({
                    "action": "moveUp",
                    "id": id,
                    "data": {
                        "top": info.ball.top,
                        "left": info.bal.left
                    }
                });
            break;
        }
    }
);
function sendUpdatePlayers() {
    ss.broadcast({
        "action": "updatePlayers",
        "data": getPlayers()
    });
}
function getPlayers() {
    let result = [];
    userInfo.forEach((value, key) => {
        result.push(value);
    });
    return result;
}
function spawnParticle(){
    var u = Math.floor(Math.random() * 50);
    for(var i = u; i > 0; i --){
        var randomTop = Math.random() * 875;
        var randomLeft = Math.random() * 1590;
        const color = Math.floor(Math.random() * colors.length);
        ss.broadcast({
            "action": "sendParticle",
            "data": {
                "top": randomTop,
                "left": randomLeft,
                "color": colors[color]
            }
        });
    }
}
function clearParticle(){
    ss.broadcast({
        "action": "clearParticle"
    });
}
function clearParticles(){
    ss.broadcast({
        "action": "clearParticles"
    });
}
setInterval(function() {
    spawnParticle();
}, 500);
setInterval(function() {
    var u = Math.floor(Math.random() * 30);
    for(var i = u; i > 0; i --){
        clearParticle();
    }
}, 720);