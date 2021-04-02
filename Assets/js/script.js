var taskIdCounter = 0;
//console.dir(window.document);

//var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var taskCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var tasks = [];

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

    //check if input values are empty strings
    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
    }

    //reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;
    //reset method is designed specifically for the form element and wont work on any other element
    //formEl.reset();

    //check if task is new or one being edited by seeing if it has a data-task-id attribute
    var isEdit = formEl.hasAttribute("data-task-id");
    //console.log(isEdit);

    //has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data atribute, so create object as normal and pass to createTaskEl function
    else {
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    }
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
    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);
    //console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    //array method push adds any content between the parentheses to the end of the specified array
    tasks.push(taskDataObj);

    //increase task counter for next unique id
    taskIdCounter++;

    saveTasks();
    //console.log(taskDataObj);
    //console.log(taskDataObj.status);
 
};

var createTaskActions = function(taskId) {
    //create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //create change status dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    //create status options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    //var i = 0 defines an initial counter, or iterator, variable
    //i < statusChoices.length keeps the for loop running by checking the iterator against the number of items in the array (length being the property that returns the number of items)
    //i++ increments the counter by one after each loop iteration
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        //statusChoices[i] returns the value of the array at the given index (for example, when i = 0, or statusChoices [0], we get the first item)
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);
    //find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    alert("Task Updated!");

    //remove data atribute from form
    formEl.removeAttribute("data-task-id");
    //update formEl button to go back to saying "Add Task" instead of "Edit Task"
    //document.querySelector("#save-task").textContent = "Add Task";
    formEl.querySelector("#save-task").textContent = "Add Task";

    saveTasks();
};

var taskButtonHandler = function(event) {
    //console.log(event.target);
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        //console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    //if (event.target.matches(.delete-btn)) {}
    else if (targetEl.matches(".delete-btn")) {
        //console.log("delete", targetEl);
        //get the element's task id
        //var taskId = event.target.getAttribute("data-task-id");
        var taskId = targetEl.getAttribute("data-task-id");
        //console.log(taskId);
        //console.log("You clicked a delete button!");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) {
    //console.log(event.target);
    //console.log(evetn.target.getAttribute("data-task-id"))
    console.log(event.target.value);

    //find task list item based on event.target's data-task-id attribute
    var taskId = event.target.getAttribute("data-task-id");

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        taskCompletedEl.appendChild(taskSelected);
    }

    //update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    //console.log(tasks);
    saveTasks();
};

var editTask = function(taskId) {
    //console.log("editing task#" + taskId);
    //console.log(taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //console.log(taskType);

    //write values of taskName and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    
    //set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    //update form's button to reflect editing a task rather than creating a new one
    //document.querySelector("#save-task").testContent = "Save Task";
    formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
    console.log(taskId);
   //find task list element with taskId value and remove it

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //console.log(taskSelected);
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();
};

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
//create a new task
//buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", taskFormHandler);//createTaskHandler);

//for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

//for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

