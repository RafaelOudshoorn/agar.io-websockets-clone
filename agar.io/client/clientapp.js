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
            case "spawnParticle":
                $("#particle"+ data.data.top).remove();
                $('#particles_div').append('<div id="particle" class="particle'+ data.data.top + data.data.left +'"></div>');
                $(".particle"+ data.data.top + data.data.left).css({
                    top: data.data.top,
                    left: data.data.left
                });
                $(".particle"+ data.data.top + data.data.left).css("background-color",data.data.color);
            break;
            case "updateParticle":
                var player = $("#ball"+data.id).offset();
                console.log(player);
            break;
            case "enterGame":
                $('#players').append('<div id="ball'+ data.id +'" class="ball"><h6>'+ data.username +'</h6></div>');
                $("#ball"+data.id).css({
                    top: data.data.top,
                    left: data.data.left,
                    width: data.data.size,
                    height: data.data.size
                });
                $("#ball"+data.id).css("background-color",data.data.color);
            break;
            case "updateSize":
                $("#ball"+data.id).css({
                    width: data.data.size,
                    height: data.data.size}
                );
            break;
            case "removeParticle":
                $(".particle"+ data.data.top + data.data.left).remove();
                console.log(data.data);
            break;
            case "clearParticles":
                // $("div#particle").remove();
            break;
            case "clearParticle":
                // $("#particle").remove();
            break;
            case "move":
                $("#ball"+data.id).css({
                    top: data.data.top,
                    left: data.data.left
                });
                $("#showScore").html(data.data.score);
                var player = $("#ball"+data.id);
                var plOffset =  player.position();
                var plWidth = player.outerWidth();
                var plHeight = player.outerHeight();
                // console.log(
                //     player,
                //     plOffset,
                //     plWidth,
                //     plHeight
                // );
                // if($("#particle").hasClass(".particle"+ data.data.top + data.data.left)){
                //     particleOffset(data.data.top, data.data.left);
                // }else{
                var u = data.data.width;
                for(var i = 15;i > 0;i--){
                    var newTop = data.data.top + i;
                    var newLeft = data.data.left + i;
                    console.log(newTop, newLeft);
                    if($("#particle").hasClass(".particle"+ data.data.top + newLeft)){
                        particleOffset(data.data.top, newLeft);
                    }
                    if($("#particle").hasClass(".particle"+ newTop + data.data.left)){
                        particleOffset(newTop, data.data.left);
                    }
                }
                // }
                function particleOffset(top,left){
                    
                    var particle = $(".particle"+ top + left);
                    var parOffset =  particle.position();
                    var parWidth = particle.outerWidth();
                    var parHeight = particle.outerHeight();
                    if (
                        data.data.left + plWidth > parOffset.left &&
                        data.data.left < parOffset.left + parWidth &&
                        data.data.top + plHeight > parOffset.top &&
                        data.data.top < parOffset.top + parHeight
                    ) {
                        console.log('Element1 is on top of Element2');
                        ws.send(JSON.stringify({
                            "action": "eatenParticle",
                            "data": {
                                "top": data.data.top,
                                "left": data.data.left
                            }
                        }));
                    }else{
                        console.log("jokes on you go sleep");
                    }
                }
            break;
        }
    }
}
function debug(data){

}
function chat(data){
    $("#chat").append(data,"</br>");
}