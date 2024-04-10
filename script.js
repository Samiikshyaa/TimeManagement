let timer;
let isTimerRunning = false;
let startTime;
let elapsedTime = 0;

function startStopTimer() {
    if (isTimerRunning) {
        clearInterval(timer);
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimerDisplay, 1000);
    }

    isTimerRunning = !isTimerRunning;
    updateStartStopButton();
}

function updateTimerDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    elapsedTime = 0;
    document.getElementById('display').innerText = '00:00:00';
    updateStartStopButton();
}

function updateStartStopButton() {
    const startStopButton = document.getElementById('startStop');
    startStopButton.innerText = isTimerRunning ? 'Stop' : 'Start';
}

function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function() {
        toggleTaskCompletion(this);
    };

    taskItem.appendChild(checkbox);
    taskItem.innerHTML += `<span>${taskText}</span>`;
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteTask(this);
    };

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskInput.value = '';
}

function toggleTaskCompletion(checkbox) {
    const taskText = checkbox.nextElementSibling;
    taskText.classList.toggle('completed');
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}