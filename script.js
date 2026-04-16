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


// FONT SYSTEM FEATURE

const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");
const resetFont = document.getElementById("resetFont");

// Load saved font settings
document.addEventListener("DOMContentLoaded", () => {
    const savedFont = localStorage.getItem("fontFamily");
    const savedSize = localStorage.getItem("fontSize");

    if (savedFont) {
        document.body.style.fontFamily = savedFont;
        if (fontFamily) fontFamily.value = savedFont;
    }

    if (savedSize) {
        document.body.style.fontSize = savedSize + "px";
        if (fontSize) fontSize.value = savedSize;
    }
});

// Change font family
if (fontFamily) {
    fontFamily.addEventListener("change", (e) => {
        document.body.style.fontFamily = e.target.value;
        localStorage.setItem("fontFamily", e.target.value);
    });
}

// Change font size
if (fontSize) {
    fontSize.addEventListener("input", (e) => {
        document.body.style.fontSize = e.target.value + "px";
        localStorage.setItem("fontSize", e.target.value);
    });
}

// Reset fonts
if (resetFont) {
    resetFont.addEventListener("click", () => {
        document.body.style.fontFamily = "Arial";
        document.body.style.fontSize = "16px";

        localStorage.removeItem("fontFamily");
        localStorage.removeItem("fontSize");

        if (fontFamily) fontFamily.value = "Arial";
        if (fontSize) fontSize.value = 16;
    });
}