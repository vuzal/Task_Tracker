
let addBtn = document.querySelector(".add-btn");
let inputWrapper = document.querySelector(".input-wrapper");
let taskInput = document.querySelector(".task-input");
let taskList = document.querySelector(".task-list");
let clearBtn = document.querySelector(".clear-btn");
let sortAsc = document.getElementById("sort-asc");
let sortDesc = document.getElementById("sort-desc");
let plusIcon = document.querySelector(".icon-plus");

let tasks = [];

function checkEmptyTasks() {
    if (tasks.length === 0) {
        inputWrapper.classList.remove('hidden');
    } else {
        inputWrapper.classList.add('hidden');
    }
}


function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = createTaskElement(task, index);
        taskList.appendChild(li);
    });
    checkEmptyTasks();
}

function createTaskElement(task, index) {
    let li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <span class="task-text">${index + 1}. ${task}</span>
        <input type="text" class="edit-task-input" value="${task}">

        <div class="task-actions">
            <img class="edit-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAcQAAAHEBHD+AdwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEESURBVDiNldO/LuxRFMXxz5KJRqFSKCU6IUIp0XoGkXgBDUFHoldQ6XQ6iUqlcm8iOh5AoUGp9C83dysQMn4zmVnJKU72/q61T7KPqtLPwRL+4BAjqSpJJjHrWw9VdaZNSVaxginMYznYwRguf/TeVdVpAzyHexTWcQFXPYy9imO0Pu97uMbmAAbaR+2QvFhV/36Uzqtqt284yR5U1Zpu6b3AHQ2SrPQCNxokCTYwhFY32FdDm2bw18eynCS5wf8muNMTFvCECUzjuQlOspVktGmCJ7zgDFtV9dyUjHEM/zKoqv0OQKO67kGvBo9JRvqBkgz6+D+3LWzjKMlwHx5vOKiq13cd46KPLEvGfQAAAABJRU5ErkJggg==" width="20" height="20" alt="Edit">
            
            <img class="save-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFoSURBVEiJvZYxbsJAEEXfWka5AQV9ZFEDNQchouMYHIIzcAOa3CFAnSI1LoKEaCIUmknhv8pqWcdYwhlptNJ45s/4e2bWzsyoE+dcH5gAY2CkE2AH7HVuzeyzFsTMbhTIgSVwBSzQszS0XeWbJ7ES4EPgTcEnYAW8AAXgpIVsK/mYYoZ/JgDmwEUBr8AgVVUUM5CvKXaeTKDKL8AXsGgCTiRaKPYSvknIuaelNXiUxNOVhwmWnpYGgHlMQcLH07X0HdpXJ5yaOAeOwPGOb3ISZj9Tn/eAtZmVtf1cSU9aK8JYy2+S8Ts82wbwNuKxxhnVhHaVYARQUk2ni7iccTvJKb0CsyjWCbPM/6iiBN6Bp8D2rPMjsH3Lt1Y2qqS4o8/PwPkOv0KYm4xqK0LVTY8Sj7XPqFZuVwl20G7QDsChzaC1XRVTYNpqVfzLstPD7tZ1tC27uXCiN+nmygySPOzSdwJMyiN+W34AYJMOjcC5RBcAAAAASUVORK5CYII=" width="20" height="20" alt="Save">
            
            <svg class="delete-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4" />
                <path d="M6 6L14 14" stroke="#C4C4C4" />
                <path d="M6 14L14 6" stroke="#C4C4C4" />
            </svg>
        </div>
    `;

    let taskText = li.querySelector('.task-text');
    let inputField = li.querySelector('.edit-task-input');
    let editIcon = li.querySelector('.edit-icon');
    let saveIcon = li.querySelector('.save-icon');
    let deleteIcon = li.querySelector('.delete-icon');

    editIcon.addEventListener('click', () => editTask(li, inputField));
    saveIcon.addEventListener('click', () => saveTask(li, inputField, index));
    deleteIcon.addEventListener('click', () => deleteTask(index));

    return li;
}

function editTask(taskItem, inputField) {
    document.querySelectorAll('.task-item').forEach(el => el.classList.remove('editing'));
    taskItem.classList.add('editing');
    inputField.focus();
    inputField.select();
}

function saveTask(taskItem, inputField, index) {
    let value = inputField.value.trim();

    if (value) {
        tasks[index] = value;
        taskItem.querySelector('.task-text').textContent = `${index + 1}. ${value}`;
        taskItem.classList.remove('editing');
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

plusIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    inputWrapper.classList.remove('hidden');
    taskInput.focus();
});

addBtn.addEventListener('click', () => {
    let val = taskInput.value.trim();
    if (val) {
        tasks.push(val);
        taskInput.value = "";
        inputWrapper.classList.add('hidden');
        renderTasks();
    }
});

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim()) {
        tasks.push(taskInput.value.trim());
        taskInput.value = "";
        inputWrapper.classList.add('hidden');
        renderTasks();
    }
});

function toggleSort(isAsc) {
    tasks.sort((a, b) => isAsc ? a.localeCompare(b) : b.localeCompare(a));
    sortAsc.classList.toggle('hidden');
    sortDesc.classList.toggle('hidden');
    renderTasks();
}

sortAsc.addEventListener('click', () => toggleSort(true));
sortDesc.addEventListener('click', () => toggleSort(false));
clearBtn.addEventListener('click', () => taskInput.value = "");

checkEmptyTasks();