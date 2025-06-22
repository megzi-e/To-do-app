let tasks = [];
const taskBtn = document.getElementById("task-btn");
const inputEL = document.getElementById("task-input");
const todoList = document.querySelector(".todolist");
let myTasks = JSON.parse(localStorage.getItem("mytasks"));

if (myTasks) {
  tasks = myTasks;
  render(tasks);
}

taskBtn.addEventListener("click", function () {
  const value = inputEL.value.trim();
  if (value === "") return;

  tasks.push(inputEL.value);
  inputEL.value = "";
  localStorage.setItem("mytasks", JSON.stringify(tasks));
  render(tasks);
  deletBtn();
});

function render(task) {
  let taskList = "";

  for (let i = 0; i < task.length; i++) {
    taskList += `<div class="listitem">
            <div class="listname">
              <input type="checkbox" id="checkbox">
              <p id="task-name">${task[i]} </p>  
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

  const deleteAll = document.getElementById("delete-all");

  if (deleteAll) {
    deleteAll.addEventListener("click", function () {
      tasks = [];
      localStorage.clear();
      render(tasks);
    });
  }

  
}
