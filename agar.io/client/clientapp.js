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
var debugtime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

let ws = null;
function connectWS() {
    ws = new WebSocket('ws://localhost:8082/ws');
    
    ws.onopen = function(){
        console.log('%c['+debugtime+']  Connected to server' ,'background: #222; color: #bada55');
        ws.send(JSON.stringify({
            "action": "setusername",
            "data": $("#nickname").val(),
            "room": $("#room").val()
        }));
        $("#join-game").css("display","none");
    }
    ws.addEventListener('message', (event) => {
        console.log(event.data);
    });
    ws.onmessage = function(websocketData) {
        const data = JSON.parse(websocketData.data);
        if(data.action == "updateChat"){
            $("#chat").append("<span style='color:white'>["+data.username+"]:</span> "+data.data+"<br>");
            console.log(data.data);
        }
    }
}

function debug(data){

}
function chat(data){
    $("#chat").append(data,"</br>");
}