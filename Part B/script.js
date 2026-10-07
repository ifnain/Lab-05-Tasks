// ============================================
// SELECT ELEMENTS
// ============================================

const todoForm = document.getElementById("todoForm");

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

const errorMessage = document.getElementById("errorMessage");

const totalTasks = document.getElementById("totalTasks");

const remainingTasks = document.getElementById("remainingTasks");

const clearCompleted =
    document.getElementById("clearCompleted");

const filterButtons =
    document.querySelectorAll(".filter");


// ============================================
// TASK ARRAY
// ============================================

let tasks = [];

let currentFilter = "all";


// ============================================
// ADD TASK
// ============================================

todoForm.addEventListener("submit", function (event) {

    // Stop form from refreshing page
    event.preventDefault();


    // Get task text
    const taskText = taskInput.value.trim();


    // Empty task validation
    if (taskText === "") {

        errorMessage.textContent =
            "Please enter a task.";

        return;
    }


    // Duplicate task validation
    const duplicate = tasks.some(function (task) {

        return task.text.toLowerCase() ===
               taskText.toLowerCase();

    });


    if (duplicate) {

        errorMessage.textContent =
            "This task already exists.";

        return;
    }


    // Create new task object
    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array
    tasks.push(newTask);


    // Clear input
    taskInput.value = "";


    // Clear error
    errorMessage.textContent = "";


    // Display tasks
    renderTasks();

});


// ============================================
// RENDER TASKS
// ============================================

function renderTasks() {

    // Clear current list
    taskList.innerHTML = "";


    // Filter tasks
    let filteredTasks = tasks.filter(function (task) {

        if (currentFilter === "active") {

            return task.completed === false;

        }

        if (currentFilter === "completed") {

            return task.completed === true;

        }

        return true;

    });


    // Create each task
    filteredTasks.forEach(function (task) {


        // Create li
        const li = document.createElement("li");

        li.classList.add("task");


        // Add completed class
        if (task.completed) {

            li.classList.add("completed");

        }


        // Store task ID
        li.dataset.id = task.id;


        // Create task content
        const taskContent =
            document.createElement("div");

        taskContent.classList.add("task-content");


        // Create checkbox
        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("complete-checkbox");

        checkbox.checked = task.completed;


        // Create task text
        const span =
            document.createElement("span");

        span.textContent = task.text;

        span.classList.add("task-text");


        // Create delete button
        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");


        // Put checkbox and text together
        taskContent.appendChild(checkbox);

        taskContent.appendChild(span);


        // Put everything inside li
        li.appendChild(taskContent);

        li.appendChild(deleteButton);


        // Add li to list
        taskList.appendChild(li);

    });


    // Update counter
    updateCounter();

}


// ============================================
// EVENT DELEGATION
// ============================================

taskList.addEventListener("click", function (event) {


    // Find task li
    const taskItem =
        event.target.closest(".task");


    if (!taskItem) {
        return;
    }


    // Get task ID
    const taskId =
        Number(taskItem.dataset.id);


    // ========================================
    // CHECKBOX
    // ========================================

    if (
        event.target.classList.contains(
            "complete-checkbox"
        )
    ) {

        const task = tasks.find(function (task) {

            return task.id === taskId;

        });


        task.completed =
            event.target.checked;


        renderTasks();

    }


    // ========================================
    // DELETE
    // ========================================

    if (
        event.target.classList.contains(
            "delete-btn"
        )
    ) {

        tasks = tasks.filter(function (task) {

            return task.id !== taskId;

        });


        renderTasks();

    }

});


// ============================================
// UPDATE COUNTER
// ============================================

function updateCounter() {

    // Total tasks
    totalTasks.textContent = tasks.length;


    // Remaining tasks
    const remaining =
        tasks.filter(function (task) {

            return task.completed === false;

        }).length;


    remainingTasks.textContent = remaining;

}


// ============================================
// FILTER BUTTONS
// ============================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        // Get selected filter
        currentFilter =
            button.dataset.filter;


        // Remove active class
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active class
        button.classList.add("active");


        // Display filtered tasks
        renderTasks();

    });

});


// ============================================
// CLEAR COMPLETED
// ============================================

clearCompleted.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return task.completed === false;

    });


    renderTasks();

});