let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tab-area div"); // 여러 개를 가져오기 위해 querySelectorAll

let taskList = []; // 할 일을 추가할 리스트
let filteredList = []; 
let mode = "all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function () {taskInput.value = "";});
for (let i = 1; tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event);
    });
}

// + 버튼을 누르면 taskList에 아이템 추가
function addTask() {
    let task = {
        id : generateRandomID(),
        taskContent : taskInput.value,
        isComplete : false
    };

    taskList.push(task);
    render();

    console.log(taskList);
}

// taskList에 있는 아이템들을 화면에 그리기
function render() {
    let resultHTML = "";
    let list = [];

    if (mode == "all") {
        list = taskList;
    } else if (mode == "ongoing" || mode == "done") {
        list = filteredList;
    }

    for (let i = 0; i < list.length; i++) {
        // check 버튼이 눌렸을 경우
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task-area">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask()">Delete</button>
            </div>
        </div>`
        } else {
            resultHTML += `<div class="task-area">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        }    
    };

    document.getElementById("task-board").innerHTML = resultHTML;
}

// check 버튼 클릭 시 이벤트
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (id == taskList[i].id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break; // for문 종료
        }
    }
    
    render();
}

// delete 버튼 클릭 시 이벤트
function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (id == taskList[i].id) {
            taskList.splice(i, 1);
            break;
        }
    }

    render();
}

// tab 이벤트
function filter(event) {
    mode = event.target.id;
    filteredList = [];

    if (mode == "all") {
        render();
    } else if (mode == "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filteredList.push(taskList[i]);
            }
        }
        render();
    } else if (mode == "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filteredList.push(taskList[i]);
            }
        }
        render();
    } 
}

// 랜덤한 아이디값 만들기
function generateRandomID() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

