/*API KEY:
2787e24e41fb11b38494abfe44ed1e3915d8482f5f19138119d2cc50ccbb6d12
*/
var delete_button_num = 0;

var toodle={

}

document.getElementById("add").onclick = function(){
    var task = document.getElementById("form").elements.namedItem("task").value;
    var desc = document.getElementById("form").elements.namedItem("desc").value;
    generateToodle(task, desc);
}
document.getElementsByClassName("delete_button").onclick = deleteToodle;

function deleteToodle(){
    document.button.parentElement.removeChild;

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
    button.setAttribute("value","Delete");

    var button_id = "delete_button_" + delete_button_num; 
    button.setAttribute("id", button_id);
    delete_button_num++;


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