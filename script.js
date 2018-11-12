/*API KEY:
2787e24e41fb11b38494abfe44ed1e3915d8482f5f19138119d2cc50ccbb6d12
*/
$(document).ready(function(){
    var xhttp = new XMLHttpRequest();

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
        //if(task.length == 0){
        //alert("The task is required to add a toodle");
        // }else{
        generateToodle(task);
        //}
    }
    function deleteToodle(){
        var object = this;
        $(object).parent().hide(500);
        setTimeout(function(){
            $(object).parent().remove();
        }, 500);
    }
    function randomColor(){
        /*SOURCE: https://stackoverflow.com/questions/14984643/css-pick-a-random-color-from-array*/
        var colors = ['#ffa600', '#ff433a',"#4a55ff","#02cdff","#ff5c48","#ab42fe","#00fff7"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        return random_color;
    }

    function generateToodle(task){
        var desc = $("#desc").val();
        var toodle = $("<div class='toodle' style='background-color:" + randomColor() + ";'> <p>" + task + "</p> <p>" + desc + "</p><label class='control control-checkbox'>Finished<input type='checkbox'><div class='control_indicator'></div></label> <input type='button' class='deleteButton' value='Delete'/>");
        $("#container").append(toodle).hide();
        $("#container:last").fadeIn();
        $("#task").val("");
        $("#desc").val("");
    }

    function toodleFinished(){
        var isFinished = this.checked > 0;
        if(isFinished == true){
            var toodle = $(this).parent().parent();
            toodle.css("background-color", "rgba(0, 125, 0, 0.6)");
            toodle.css("text-decoration","line-through");
            toodle.css("color","black");
        }
        else{
            var toodle = $(this).parent().parent();
            var toodle = $(this).parent().parent();
            toodle.css("background-color", randomColor);
            toodle.css("text-decoration","none");
        }
    }
});