// ================================
// DOM Elements
// ================================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTasksContainer = document.getElementById("pendingTasks");
const completedTasksContainer = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");


// ================================
// Load Tasks From localStorage
// ================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ================================
// Save Tasks
// ================================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ================================
// Generate Unique ID
// ================================

function generateId() {
    return Date.now() + Math.random();
}


// ================================
// Add Task
// ================================

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: generateId(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}


// ================================
// Complete / Uncomplete Task
// ================================

function toggleTask(taskId) {

    tasks = tasks.map(task => {

        if (task.id === taskId) {

            const isCompleted = !task.completed;

            return {
                ...task,
                completed: isCompleted,
                completedAt: isCompleted
                    ? new Date().toLocaleString()
                    : null
            };
        }

        return task;
    });

    saveTasks();

    renderTasks();
}


// ================================
// Delete Task
// ================================

function deleteTask(taskId) {

    tasks = tasks.filter(task => task.id !== taskId);

    saveTasks();

    renderTasks();
}


// ================================
// Edit Task
// ================================

function editTask(taskId) {

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return;
    }

    const taskElement = document.querySelector(
        `[data-id="${taskId}"]`
    );

    const textElement = taskElement.querySelector(".task-text");

    const currentText = task.text;

    textElement.innerHTML = `
        <input
            type="text"
            class="edit-input"
            value="${escapeHTML(currentText)}"
        >
    `;

    const input = textElement.querySelector(".edit-input");

    input.focus();

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            updateTask(taskId, input.value);
        }

        if (event.key === "Escape") {
            renderTasks();
        }

    });

    input.addEventListener("blur", function () {
        updateTask(taskId, input.value);
    });
}


// ================================
// Update Task
// ================================

function updateTask(taskId, newText) {

    const updatedText = newText.trim();

    if (updatedText === "") {
        alert("Task cannot be empty.");
        renderTasks();
        return;
    }

    tasks = tasks.map(task => {

        if (task.id === taskId) {
            return {
                ...task,
                text: updatedText
            };
        }

        return task;
    });

    saveTasks();

    renderTasks();
}


// ================================
// Escape HTML
// ================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ================================
// Render Tasks
// ================================

function renderTasks() {

    const pendingTasks = tasks.filter(task => !task.completed);

    const completedTasks = tasks.filter(task => task.completed);


    // Update Counts

    pendingCount.textContent =
        `${pendingTasks.length} pending`;

    completedCount.textContent =
        `${completedTasks.length} completed`;


    // Clear containers

    pendingTasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";


    // Pending Empty State

    if (pendingTasks.length === 0) {

        pendingTasksContainer.innerHTML = `
            <div class="empty-message">
                No pending tasks. You're all caught up! 🎉
            </div>
        `;
    }


    // Completed Empty State

    if (completedTasks.length === 0) {

        completedTasksContainer.innerHTML = `
            <div class="empty-message">
                No completed tasks yet.
            </div>
        `;
    }


    // Render Pending Tasks

    pendingTasks.forEach(task => {

        pendingTasksContainer.appendChild(
            createTaskElement(task)
        );

    });


    // Render Completed Tasks

    completedTasks.forEach(task => {

        completedTasksContainer.appendChild(
            createTaskElement(task)
        );

    });
}


// ================================
// Create Task Element
// ================================

function createTaskElement(task) {

    const taskElement = document.createElement("div");

    taskElement.className = task.completed
        ? "task completed-task"
        : "task";

    taskElement.dataset.id = task.id;


    const completeButtonText = task.completed
        ? "Undo"
        : "Complete";


    const completedTime = task.completed && task.completedAt
        ? `<div>Completed: ${task.completedAt}</div>`
        : "";


    taskElement.innerHTML = `
        <div class="task-top">

            <div class="task-text">
                ${escapeHTML(task.text)}
            </div>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${task.id})"
                >
                    ${completeButtonText}
                </button>

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>

            </div>

        </div>

        <div class="task-time">
            Added: ${task.createdAt}
            ${completedTime}
        </div>
    `;

    return taskElement;
}


// ================================
// Add Task Button
// ================================

addTaskBtn.addEventListener("click", addTask);


// ================================
// Enter Key To Add Task
// ================================

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// ================================
// Initial Render
// ================================

renderTasks();