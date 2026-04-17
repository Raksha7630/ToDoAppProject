// Load on start
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadTheme();
});

// ===== ADD TASK =====
function addTask() {
    const input = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");

    const taskText = input.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === "") return;

    createTaskElement(taskText, false, dueDate);

    saveTasks();

    // ✅ NOTIFICATION ADDED
    alert("Task added successfully!");

    input.value = "";
    dueDateInput.value = "";
}

// ===== CREATE TASK =====
function createTaskElement(taskText, isCompleted, dueDate = "") {
    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.textContent = taskText;
    span.className = "task-text";

    if (isCompleted) {
        span.classList.add("completed");
    }

    // Due date
    const dateSpan = document.createElement("span");
    dateSpan.className = "due-date";
    dateSpan.textContent = dueDate ? ` (Due: ${dueDate})` : "";

    // Done button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.className = "done-btn";

  doneBtn.onclick = function () {
    span.classList.toggle("completed");
    li.classList.toggle("completed-task");
    saveTasks();
};

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    // Button group
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    btnGroup.appendChild(doneBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(btnGroup);

    document.getElementById("taskList").appendChild(li);
}

// ===== SAVE TASKS =====
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector(".task-text").textContent;
        const completed = li.querySelector(".task-text").classList.contains("completed");

        const dueDateElement = li.querySelector(".due-date");
        let dueDate = dueDateElement
            ? dueDateElement.textContent.replace(" (Due: ", "").replace(")", "")
            : "";

        tasks.push({ text, completed, dueDate });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== LOAD TASKS =====
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed, task.dueDate);
    });
}

// ===== THEME SYSTEM =====
const themeSelect = document.getElementById("themeSelect");

themeSelect.addEventListener("change", () => {
    applyTheme(themeSelect.value);
});

function applyTheme(theme) {
    document.body.className = ""; // reset

    if (theme !== "light") {
        document.body.classList.add(`theme-${theme}`);
    }

    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "ocean";
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
}
