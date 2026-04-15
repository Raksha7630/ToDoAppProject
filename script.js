// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");

    const taskText = input.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === "") return;

    createTaskElement(taskText, false, dueDate);

    saveTasks();

    input.value = "";
    dueDateInput.value = "";
}

function createTaskElement(taskText, isCompleted, dueDate = "") {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.className = "task-text";

    if (isCompleted) {
        span.classList.add("completed");
    }

    // ✅ Due date display
    const dateSpan = document.createElement("small");
    dateSpan.className = "due-date";
    if (dueDate) {
        dateSpan.textContent = ` (Due: ${dueDate})`;
    }

    // Highlight overdue tasks (optional but good)
    const today = new Date().toISOString().split("T")[0];
    if (dueDate && dueDate < today) {
        dateSpan.style.color = "red";
    }

    // Done button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.className = "done-btn";

    doneBtn.onclick = function () {
        span.classList.toggle("completed");
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

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    btnGroup.appendChild(doneBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(btnGroup);

    document.getElementById("taskList").appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector(".task-text").textContent;
        const completed = li.querySelector(".task-text").classList.contains("completed");

        const dueDateElement = li.querySelector(".due-date");
        let dueDate = "";

        if (dueDateElement && dueDateElement.textContent) {
            dueDate = dueDateElement.textContent
                .replace(" (Due: ", "")
                .replace(")", "");
        }

        tasks.push({ text, completed, dueDate });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed, task.dueDate);
    });
}