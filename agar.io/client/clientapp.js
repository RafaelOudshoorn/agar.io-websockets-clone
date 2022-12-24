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
    ws.onmessage = function(websocketData) {
        const data = JSON.parse(websocketData.data);
        switch(data.action){
            case "updateChat":
                $("#chat").append("<span style='color:"+ data.color +"'>["+data.username+"]:</span> "+data.data+"<br>");
            break;
            case "playerJoinShowChat":
                $("#chat").append("<span style='color:yellow'>"+data.data+" joined</span><br>");
            break;
            case "playerDisconnectShowChat":
                $("#chat").append("<span style='color:yellow'>"+data.data+" disconnected</span><br>");
            break;
            case "sendParticle":
                const particle_top = Math.round(data.data.top);
                const particle_left = Math.round(data.data.left);
                const particle_color = data.data.color;
                $('#particles_div').append('<div id="particle" class="particle'+ particle_top +'"></div>');
                $(".particle"+ particle_top).css({
                    top: particle_top,
                    left: particle_left
                });
                $(".particle"+ particle_top).css("background-color",particle_color);
            break;
            case "enterGame":
                $('#players').append('<div id="ball" class="ball'+ data.id +'"><h6>'+ data.username +'</h6></div>');
                $(".ball"+data.id).css({
                    top: data.data.top,
                    left: data.data.left,
                    width: data.data.size,
                    height: data.data.size
                });
                $(".ball"+data.id).css("background-color",data.data.color);
                updateParticle(data);
            break;
            case "clearParticles":
                $("div#particle").remove();
            break;
            case "clearParticle":
                $("#particle").remove();
            break;
            case "moveUp":
            case "moveDown":
                $(".ball"+data.id).css({
                    top: data.data
                });
            break;
            case "moveRight":
            case "moveLeft":
                $(".ball"+data.id).css({
                    left: data.data
                });
            break;
        }
    }
}
function updateParticle(data){
    var player = $(".ball"+data.id);
    const u = 875;
    for(var i = 0;i > u;i++){
        var particle = $(".particle"+i);
    };
}
function debug(data){

}
function chat(data){
    $("#chat").append(data,"</br>");
}