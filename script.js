/*API KEY:
2787e24e41fb11b38494abfe44ed1e3915d8482f5f19138119d2cc50ccbb6d12
*/
$(document).ready(function(){
    var xhttp = new XMLHttpRequest();

    var delete_button_num = 0;


    $("#add").on("click", function(){
        console.log("TEST");
        var task = document.getElementById("form").elements.namedItem("task").value;
        var desc = document.getElementById("form").elements.namedItem("desc").value;
        generateToodle2(task, desc);
    });
    $('#test').on("click",".toodle", function(){

        $('.toodle').on('click','.deleteButton', deleteToodle);
    })
    /*TO DO: Generated buttons not targeted by this function for some reason*/


    function deleteToodle(){
        var object = this;
        console.log("IT WORKED");
        $(object).parent().hide(500);
        setTimeout(function(){
            $(object).parent().remove();
        }, 500);
    }

    function generateToodle(task, desc){
        var toodle_div = document.createElement("div")
        toodle_div.setAttribute("class","toodle") 
        var p_task = document.createElement("p")
        var p_desc = document.createElement("p");

        var label = document.createElement("label");
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type","checkbox");

        var button = document.createElement("INPUT");
        button.setAttribute("type","button");
        button.setAttribute("class","deleteButton");
        button.setAttribute("value","Delete");

        /*
        var button_id = "delete_button_" + delete_button_num; 
        button.setAttribute("id", button_id);
        delete_button_num++;
        */

        var node_task = document.createTextNode(task);
        var node_desc = document.createTextNode(desc);
        var node_label = document.createTextNode("Finished: ");

        p_task.appendChild(node_task);
        p_desc.appendChild(node_desc);
        label.appendChild(node_label);

        toodle_div.appendChild(p_task);
        toodle_div.appendChild(p_desc);
        toodle_div.appendChild(label);
        toodle_div.appendChild(checkbox);
        toodle_div.appendChild(button);


        var element = document.getElementById("test");
        element.appendChild(toodle_div);
    }
    function generateToodle2(task, desc){
        var toodle = $("<div class='toodle'> <p>" + task + "</p> <p>" + desc + "</p><label>Finished:</label><input type='checkbox'> <input type='button' class='deleteButton' value='Delete'/>");
        $("#test").append(toodle);
    }

















});