// Create WebSocket connection.
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

let ws = null;
function connectWS() {
    ws = new WebSocket('ws://localhost:8082/ws');
    
    ws.onopen = function(){
        console.log('%c['+time+']  Connected to server' ,'background: #222; color: #bada55');
        ws.send(JSON.stringify({
            "action": "setusername",
            "data": $("#nickname").val(),
            "room": $("#room").val()
        }));
        $("#join-game").remove();
        $("#connected").css("display", "block");
    }
    ws.addEventListener('message', (event) => {
        // console.log(event.data);
    });
    ws.onmessage = function(websocketData) {
        const data = JSON.parse(websocketData.data);
        switch(data.action){
            case "updateChat":
                $("#chat").append("<span style='color:blue'>["+data.username+"]:</span> "+data.data+"<br>");
            break;
            case "playerJoinShowChat":
                $("#chat").append("<span style='color:yellow'>"+data.data+" joined</span><br>");
            break;
            case "playerDisconnectShowChat":
                $("#chat").append("<span style='color:yellow'>"+data.data+" disconnected</span><br>");
                
            break;
        }
        // console.log('['+time+'] '+data.data);
    }
}

function debug(data){

}
function chat(data){
    $("#chat").append(data,"</br>");
}