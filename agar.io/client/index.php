<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js" integrity="sha256-lSjKY0/srUM9BE3dPm+c4fBo1dky2v27Gdjm2uoZaL0=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-overlaps/1.2.3/jquery.overlaps.min.js" integrity="sha512-bms7L3BzbSibTZ98PW4LoNiukFE9L7E3CF2+G60a+FszqnQ0jE+KUWslPThLp8FFRN2AftH1qw2uJIWhgAAOzw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script rel="javascript" src="clientapp.js"></script>
        <link rel="stylesheet" href="style.css">
        <title>NodeJS</title>
        <script>
            $(document).ready(function(){
                for(var i = 1222;i > 0; i --){
                    $("#grid-container").append("<div id='grid-item'></div>");
                }
                $(document).on('keypress', function(e){
                    switch(e.keyCode){
                        case 13:
                            if (event.key === "Enter"){
                                $("#message-input").focus();
                            }
                        break;
                    }
                });
            });
        </script>
    </head>
    <body>
        <center id="join-game">
            <div>
                <h1>Agar.io &#60;clone&#62;</h1>
                <h3>Join Game</h3>
                <label for="nickname">Nickname</label>
                <input type="text" class="form-control" id="nickname" value="nickname">
                <br>
                <button class="btn btn-primary" id="connect-btn">Verbinden</button>
            </div>
            <br>
        </center>
        <div id="connected">
            <button id="spawnParticles">Spawning</button>
            <button id="clearParticles">Clear</button>
            <div id="game-container">
                <div id="enter-game">
                    <center>
                        <h3>Agar.io clone</h3>
                        <p>klik om te spelen</p>
                        <button id="enter-game-button" class="btn btn-primary">Enter game</button>
                    </center>
                </div>
                <div id="grid-container"></div>
                <div id="game">
                    <div id="particles_div"></div>
                    <div id="players"></div>
                </div>
            </div>
            <div id="score">Score: <span id="showScore"></span></div>
            <div id="scorebord"><h6>Scorebord</h6></div>
            <div id='chat'></div>
            <input type='text' id='message-input' placeholder='Enter message here'>
        </div>
        <script>
            $("#spawnParticles").click(function(){
                ws.send(JSON.stringify({
                    "action": "spawnParticles"
                }));
            });
            $("#clearParticles").click(function(){
                ws.send(JSON.stringify({
                    "action": "clearParticles"
                }));
            });
            $("#connect-btn").click(function(){
                connectWS();
            });
            $("#message-input").on("keydown", function(event) {
                if (event.key === "Enter") {
                    if($("#message-input").val() != ""){
                        ws.send(JSON.stringify({
                            "action": "chat",
                            "data": $("#message-input").val()
                        }));
                        $("#message-input").val("");
                    }
                    $("input").blur();
                }
            });
            $("#enter-game-button").click(function(){
                ws.send(JSON.stringify({
                    "action": "enterGame"
                }));
                $("#enter-game").css("display", "none");
                var movement = {
                    "up": null,
                    "down": null,
                    "left": 1,
                    "right": null
                };
                $(document).on('keydown', function(e){
                    // up
                    if((e.keyCode == 38) || ((e.keyCode == 38 && movement.left == 1) || (e.keyCode == 38 && movement.right == 1))){
                        movement.up = 1;
                        movement.down = null;
                    }
                    // down
                    if((e.keyCode == 40) || ((e.keyCode == 40 && movement.left == 1) || (e.keyCode == 40 && movement.right == 1))){
                        movement.down = 1;
                        movement.up = null;
                    }
                    // left
                    if((e.keyCode == 37) || ((e.keyCode == 37 &&  movement.up == 1) || (e.keyCode == 37 &&  movement.down == 1))){
                        movement.left = 1;
                        movement.right = null;
                    }
                    // right
                    if((e.keyCode == 39) || ((e.keyCode == 39 &&  movement.up == 1) || (e.keyCode == 39 &&  movement.down == 1))){
                        movement.right = 1;
                        movement.left = null;
                    }
                });
                $(document).on('keyup', function(e){
                    // up
                    if(e.keyCode == 38){
                        if(movement.down == null && movement.left == null && movement.right == null){
                        }else{
                            if(movement.down == 1 || movement.left == 1 || movement.right == 1){
                                movement.up = 1;
                                movement.left = null;
                                movement.right = null;
                            }else{
                                movement.up = null;
                            }
                        }
                    }
                    // down
                    if(e.keyCode == 40){
                        if(movement.up == null && movement.left == null && movement.right == null){
                        }else{
                            if(movement.up == 1 || movement.left == 1 || movement.right == 1){
                                movement.down = 1;
                                movement.left = null;
                                movement.right = null;
                            }else{
                                movement.down = null;
                            }
                        }
                    }
                    // left
                    if(e.keyCode == 37){
                        if(movement.up == null && movement.down == null && movement.right == null){
                        }else{
                            if(movement.up == 1 || movement.down == 1 || movement.right == 1){
                                movement.up = null;
                                movement.down = null;
                                movement.left = 1;
                            }else{
                                movement.left = null;
                            }
                        }
                    }
                    // right
                    if(e.keyCode == 39){
                        if(movement.up == null && movement.down == null && movement.left == null){
                        }else{
                            if(movement.up == 1 || movement.down == 1 || movement.left == 1){
                                movement.up = null;
                                movement.down = null;
                                movement.right = 1;
                            }else{
                                movement.right = null;
                            }
                        }
                    }
                });
                setInterval(function() {
                    if(movement.up == 1){
                        ws.send(JSON.stringify({
                            "action": "move",
                            "data": "up"
                        }));
                    }
                    if(movement.down == 1){
                        ws.send(JSON.stringify({
                            "action": "move",
                            "data": "down"
                        }));
                    }
                    if(movement.left == 1){
                        ws.send(JSON.stringify({
                            "action": "move",
                            "data": "left"
                        }));
                    }
                    if(movement.right == 1){
                        ws.send(JSON.stringify({
                            "action": "move",
                            "data": "right"
                        }));
                    }
                }, 50);
            });
        </script>
    </body>
</html>