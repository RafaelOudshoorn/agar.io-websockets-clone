<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script rel="javascript" src="clientapp.js"></script>
        <title>NodeJS</title>
        <script>
            $(document).ready(function(){

            });
        </script>
        <style>
            body{
                height: 100vh;
                width: 100%;
                background: #868686;
                overflow: hidden;
                padding-top: 50px;
            }
            #join-game div{
                width: 400px;
            }
            #list-lobbys{
                background: darkgray;
                height: auto;
                width: 400px;
            }
            #chat{
                color: black;
                position: absolute;
                left: 8px;
                bottom: 40px;
                min-width: 300px;
                max-width: 500px;
                max-height: 500px;
                overflow: hidden;
            }
            #chat p{
                /* background-color: #FFF; */
                min-width: 300px;
                max-width: 500px;
            }
            #message-form{
                position: absolute;
                left: 5px;
                bottom: 5px;
            }
            #message-form input{
                width: 448px;
            }
        </style>
    </head>
    <body>
        <script>
            load("inlog.php");
        </script>
        <div id="message-form"> 
            <input type="text" id="message-input" placeholder="Enter message here">
        </div>
        <div id="chat"></div>
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
            const display = $('#join-game').css('display');
            $("#goto-create-game").click(function(){
                if (display === 'block') {
                    $('#join-game').css('display','none');
                    $('#create-game').css('display','block');
                }
            });
        </script>
    </body>
</html>