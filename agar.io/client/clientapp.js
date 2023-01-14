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
            "data": $("#nickname").val()
        }));
        $("#join-game").remove();
        $("#connected").css("display", "block");
    }
    ws.onmessage = function(websocketData) {
        const data = JSON.parse(websocketData.data);
        switch(data.action){
            case "initializeparticles":
                for(var i = 0; i < data.data.length; i ++) {
                    spawnParticle(data.data[i]);
                }
            break;
            case "updateChat":
                $("#chat").append("<span style='color:"+ data.color +"'>["+data.username+"]:</span> "+data.data+"<br>");
                var objDiv = document.getElementById("chat");
                objDiv.scrollTop = objDiv.scrollHeight;
                break;
            case "playerJoinShowChat":
                $("#chat").append("<span style='color:yellow'>"+data.data+" joined</span><br>");
            break;
            case "playerDisconnectShowChat":
                $("#chat").append("<span style='color:yellow'>"+data.data+" disconnected</span><br>");
            break;
            case "spawnParticle":
                spawnParticle(data.data);
            break;
            case "updateParticle":
                var player1 = $("#ball"+data.id).offset();
                console.log(player1);
                // console.clear();
            break;
            case "enterGame":
                $('#players').append('<div id="ball'+ data.id +'" class="ball"><h6>'+ data.username +'</h6></div>');
                $("#ball"+data.id).css({
                    "width": data.data.size,
                    "height": data.data.size,
                    "top": data.data.top,
                    "left": data.data.left
                });
                $("#ball"+data.id).css("background-color",data.data.color);
            break;
            case "updateSize":
                $("#ball"+data.id).css({
                    width: data.data.size,
                    height: data.data.size}
                );
            break;
            case "eatparticle":
                $("#" + data.data).remove();

                console.log("EAT");
            break;
            case "clearParticle":
                if($("#" + data.data).length == 0) {
                    console.log("NOT FOUND");
                }else{
                    $("#" + data.data).remove();
                }              
            break;
            case "move":
                $("#ball"+data.id).css({
                    width: data.data.size,
                    height: data.data.size,
                    top: data.data.top,
                    left: data.data.left
                });
                $("#showScore").html(data.data.score);
            break;
        }
    }
}
function spawnParticle(aParticle) {
    var particle = $("<div id='"+ aParticle.id +"' class='particle'></div>");
    particle.css({
        top: aParticle.top,
        left: aParticle.left,
        "background-color": aParticle.color
    });
                
    $('#particles_div').append(particle);
}
function chat(data){
    $("#chat").append(data,"</br>");
}