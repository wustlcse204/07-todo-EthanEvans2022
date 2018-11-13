$(document).ready(function(){
    var apiKey = "2787e24e41fb11b38494abfe44ed1e3915d8482f5f19138119d2cc50ccbb6d12";
    var data_splitter = "51#.2--9!_2+#90!&!17"
    //Load Toodles
    var listToodles = new XMLHttpRequest();
    listToodles.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var toodle_array = JSON.parse(this.responseText);
            for(var i = 0; i < toodle_array.length; i++){
                generateToodle(toodle_array[i],data_splitter);
            }
        }else if (this.readyState == 4){
            console.log(this.responseText);
        }
    }
    listToodles.open("GET","https://api.kraigh.net/todos", true);
    listToodles.setRequestHeader("x-api-key", apiKey)
    listToodles.send();


    $("#task").keypress(function(e){
        if(e.which == 13){
            checkInput();
        }
    });
    $("#desc").keypress(function(e){
        if(e.which == 13){
            checkInput();
        }
    });
    $("#add").on("click", checkInput);
    $('#container').on("mouseenter",".toodle", function(){
        $('.toodle').on('click','.deleteButton', deleteToodle);
        $('.toodle').on('click',':checkbox', toodleFinished);
    });
    function checkInput(){
        var task = $("#task").val();
        var desc = $("#desc").val();
        if(task.length == 0){
            alert("The task is required to add a toodle");
        }else{
            var data = {
                text: task + data_splitter + desc
            }

            var createRequest = new XMLHttpRequest();

            createRequest.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {

                    // parse JSON response
                    generateToodle(JSON.parse(this.responseText),data_splitter);

                } else if (this.readyState == 4) {

                    // this.status !== 200, error from server
                    console.log(this.responseText);

                }
            };
            createRequest.open("POST","https://api.kraigh.net/todos",true);
            createRequest.setRequestHeader("Content-type", "application/json");
            createRequest.setRequestHeader("x-api-key", apiKey);
            createRequest.send(JSON.stringify(data));
        }
    }
    function deleteToodle(){
        var toodle = $(this).parent();
        var toDoID = $(toodle).attr("id");
        var deleteRequest = new XMLHttpRequest();
        deleteRequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                $(toodle).hide(500);
                setTimeout(function(){
                    $(toodle).remove();
                }, 500);
            }else if(this.readyState == 4){
                console.log(this.responseText);
            }
        }

        deleteRequest.open("DELETE","https://api.kraigh.net/todos/" + toDoID, true );
        deleteRequest.setRequestHeader("Content-type", "application/json");
        deleteRequest.setRequestHeader("x-api-key", apiKey);
        deleteRequest.send();



    }
    function randomColor(){
        /*SOURCE: https://stackoverflow.com/questions/14984643/css-pick-a-random-color-from-array*/
        var colors = ['#ffa600', '#ff433a',"#4a55ff","#02cdff","#ff5c48","#ab42fe","#00fff7"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        return random_color;
    }

    function generateToodle(toDo,data_splitter){
        var toDoText = toDo.text.split(data_splitter);
        var task = toDoText[0];
        var desc = toDoText[1];

        //var task = toDo.text;
        //var desc = $("#desc").val();
        var toodle = $("<div class='toodle' id=" + toDo.id + " style='background-color:" + randomColor() + ";'> <p></p> <p></p><label class='control control-checkbox'>Finished<input type='checkbox'><div class='control_indicator'></div></label> <input type='button' class='deleteButton' value='Delete'/>");
        $("#container").append(toodle).hide();
        $("#" + toDo.id + " p:first").text(task);
        $("#" + toDo.id + " p:last").text(desc);
        if(toDo.completed){
            $("#" + toDo.id).addClass("finished");
            toodle.css("background-color", "rgba(0, 125, 0, 0.6)");
            //$("#" + toDo.id + " :checkbox").attr("disabled", true);
            $("#" + toDo.id + " :checkbox").attr("checked", true);
        }
        $("#container:last").fadeIn();
        $("#task").val("");
        $("#desc").val("");
    

    }

    function toodleFinished(){
        var isFinished = this.checked > 0;
        var toodle = $(this).parent().parent();
        var toDoID = toodle.attr("id");
        var data;
        if(isFinished == true){
            data = {
                completed: true
            };
            var finishedRequest = new XMLHttpRequest();
            finishedRequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    toodle.addClass("finished");
                    toodle.css("background-color", "rgba(0, 125, 0, 0.6)");
                }else if(this.readyState == 4){
                    console.log(this.responseText);
                }
            }
        }else{
            data = {
                completed: false
            };
            var finishedRequest = new XMLHttpRequest();
            finishedRequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    toodle.removeClass("finished");
                    toodle.css("background-color", randomColor);
                }else if(this.readyState == 4){
                    console.log(this.responseText);
                }
            }
        }
        finishedRequest.open("PUT","https://api.kraigh.net/todos/" + toDoID, true );
        finishedRequest.setRequestHeader("Content-type", "application/json");
        finishedRequest.setRequestHeader("x-api-key", apiKey);
        finishedRequest.send(JSON.stringify(data));
    }
});