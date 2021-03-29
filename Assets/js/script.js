//console.dir(window.document);
//var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//buttonEl.addEventListener("click", function() {
//var createTaskHandler = function(event){
var taskFormHandler = function(event) {
    event.preventDefault();
    //when we use square brackets [] in a selector, we're trying to select an HTML element by one of its attributes
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //console.log(taskTypeInput);
    //console.dir(taskNameInput);
    //console.log(taskNameInput);

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

    // create list item
    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //create div to hold task info and add to list item
    //var taskInfoEl = document.createElement("div");
    //give it a class name
    //taskInfoEl.className = "task-info";
    //add HTML content to div
    //taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>"; 
    //listItemEl.appendChild(taskInfoEl);
    //listItemEl.textContent = taskNameInput;
    //add entire list item to list
    //tasksToDoEl.appendChild(listItemEl);

};

var createTaskEl = function(taskDataObj) {
   // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
 
}

//buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", taskFormHandler);//createTaskHandler);