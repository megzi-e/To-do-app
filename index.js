let tasks = [
   { text: "", done: false },
];
const taskBtn = document.getElementById("task-btn");
const inputEL = document.getElementById("task-input");
const todoList = document.querySelector(".todolist");
let myTasks = JSON.parse(localStorage.getItem("mytasks"));

if (myTasks) {
  tasks = myTasks;
  render(tasks);
}

inputEL.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    tasks.unshift({ text: inputEL.value, done: false });
    localStorage.setItem("mytasks", JSON.stringify(tasks));
    render(tasks);
    inputEL.value = "";
  }
  if (value === "") return;
});

taskBtn.addEventListener("click", function () {
  const value = inputEL.value.trim();
  if (value === "") return;

  tasks.unshift({ text: inputEL.value, done: false });
  inputEL.value = "";
  localStorage.setItem("mytasks", JSON.stringify(tasks));
  render(tasks);
});

function render(task) {
  let taskList = "";

  for (let i = 0; i < task.length; i++) {

    const checked = tasks[i].done ? "checked" : "";
    const textStyle = tasks[i].done ? 'style="text-decoration: line-through;"' : "";

    taskList += `<div class="listitem">
            <div class="listname">
              <input type="checkbox" id="checkbox" data-index="${i}" ${checked}>
              <p class="task-name" ${textStyle} >${task[i].text} </p>  
            </div>
          <button id="delete-btn" data-index="${i}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2.5 3.25L3 10.5H9L9.5 3.25"
                stroke="#FF3B30"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 5.5V8"
                stroke="#FF3B30"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 5.5V8"
                stroke="#FF3B30"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.75 3H10.25"
                stroke="#FF3B30"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.03516 2.87311C4.21144 1.94873 5.02395 1.25 5.9997 1.25C6.97545 1.25 7.78795 1.94873 7.96425 2.87311"
                stroke="#FF3B30"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        `;
  }

  if (task.length > 0) {
    taskList += `<button id="delete-all">Delete all</button>`;
  }

  todoList.innerHTML = taskList;

  const deleteButtons = document.querySelectorAll("#delete-btn");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      tasks.splice(index, 1);
      localStorage.setItem("mytasks", JSON.stringify(tasks));
      render(tasks);
    });
  }

  const checkTask = document.querySelectorAll("#checkbox");

  for (let i = 0; i < checkTask.length; i++) {
    checkTask[i].addEventListener("change", function () {

      const index = this.dataset.index;
      tasks[index].done = this.checked; // update status
      localStorage.setItem("mytasks", JSON.stringify(tasks));
      render(tasks); // re-render to apply new style

    });
  }

  const deleteAll = document.getElementById("delete-all");

  if (deleteAll) {
    deleteAll.addEventListener("click", function () {
      tasks = [];
      localStorage.clear();
      render(tasks);
    });
  }

  const editabletext = document.querySelectorAll(".task-name");

  for (let i = 0; i < editabletext.length; i++) {
    const taskEl = editabletext[i];

    taskEl.addEventListener("click", function () {
      const currentText = taskEl.textContent;
      const input = document.createElement("input");

      input.type = "text";
      input.value = currentText.trim();
      input.className = "edit-input";
      input.value.trim()

      taskEl.replaceWith(input);
      input.focus();

      input.addEventListener("blur", saveEdit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          saveEdit();
        }
      });

      function saveEdit() {
        const newText = input.value.trim();
        if (newText !== "") {
          tasks[i].text = newText;
          localStorage.setItem("mytasks", JSON.stringify(tasks));
          render(tasks);
        } else {
          render(tasks);
        }
      }
    });
  }
}
