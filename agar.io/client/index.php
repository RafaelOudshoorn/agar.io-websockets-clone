<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script rel="javascript" src="clientapp.js"></script>
        <link rel="stylesheet" href="style.css">
        <title>NodeJS</title>
        <script>
            $(document).ready(function(){
                for(var i = 1222;i > 0; i --){
                    $("#grid-container").append("<div id='grid-item'></div>");
                }
                for(var u = 1000;u > 0; u --){
                    $('#game').append('<div id="particle" class="particle'+u+'"></div>');
                    var randomTop = Math.random() * 875;
                    var randomLeft = Math.random() * 1590;
                    $('.particle'+u).css({
                        top: randomTop,
                        left: randomLeft
                    });
                }
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
                <label for="room">Room code</label>
                <input type="text" class="form-control" id="room" value="1234">
                <br>
                <button class="btn btn-primary" id="connect-btn">Verbinden</button>
            </div>
            <br>
            <div id="list-lobbys"><h3>Room Codes</h3></div>
        </center>
        <div id="connected">
            <div id="game-container">
                <div id="grid-container"></div>
                <div id="game"></div>
            </div>
            <div id="points">Points: 00000</div>
            <div id="scorebord"><h6>Scorebord</h6></div>
            <div id='chat'></div>
            <input type='text' id='message-input' placeholder='Enter message here'>
        </div>
        <script>
            $("#connect-btn").click(function(){
                connectWS();
            });
            $("html").keypress(function(event) {
                if (event.key === "Enter"){
                    $("#message-input").focus();
                }
            });
            $("#message-input").on("keydown", function(event) {
                if (event.key === "Enter") {
                    if($("#message-input").val() == ""){

                    }else{
                        ws.send(JSON.stringify({
                            "action": "chat",
                            "data": $("#message-input").val()
                        }));
                        $("#message-input").val("");
                    }
                }
            });
        </script>
    </body>
</html>