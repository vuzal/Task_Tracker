
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
        taskList.classList.add('hidden');

    } else {
        inputWrapper.classList.add('hidden');
        taskList.classList.remove('hidden');
    }
}


function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = createTaskElement(task, index);
        taskList.append(li);
    });
    checkEmptyTasks();
}

checkEmptyTasks();

function createTaskElement(task, index) {
    let li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <span class="task-text">${index + 1}. ${task}</span>
        <input type="text" class="edit-task-input" value="${task}">

        <div class="task-actions">
            <svg class="edit-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="20" height="20" fill="url(#pattern0_edit_${index})"/>
                <defs>
                <pattern id="pattern0_edit_${index}" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_edit_${index}" transform="scale(0.0625)"/>
                </pattern>
                <image id="image0_edit_${index}" width="16" height="16" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAcQAAAHEBHD+AdwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEESURBVDiNldO/LuxRFMXxz5KJRqFSKCU6IUIp0XoGkXgBDUFHoldQ6XQ6iUqlcm8iOh5AoUGp9C83dysQMn4zmVnJKU72/q61T7KPqtLPwRL+4BAjqSpJJjHrWw9VdaZNSVaxginMYznYwRguf/TeVdVpAzyHexTWcQFXPYy9imO0Pu97uMbmAAbaR+2QvFhV/36Uzqtqt284yR5U1Zpu6b3AHQ2SrPQCNxokCTYwhFY32FdDm2bw18eynCS5wf8muNMTFvCECUzjuQlOspVktGmCJ7zgDFtV9dyUjHEM/zKoqv0OQKO67kGvBo9JRvqBkgz6+D+3LWzjKMlwHx5vOKiq13cd46KPLEvGfQAAAABJRU5ErkJggg=="/>
                </defs>
            </svg>
            <svg class="save-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="20" height="20" fill="url(#pattern_save_${index})"/>
                <defs>
                <pattern id="pattern_save_${index}" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image_save_${index}" transform="scale(0.0416667)"/>
                </pattern>
                <image id="image_save_${index}" width="24" height="24" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFoSURBVEiJvZYxbsJAEEXfWka5AQV9ZFEDNQchouMYHIIzcAOa3CFAnSI1LoKEaCIUmknhv8pqWcdYwhlptNJ45s/4e2bWzsyoE+dcH5gAY2CkE2AH7HVuzeyzFsTMbhTIgSVwBSzQszS0XeWbJ7ES4EPgTcEnYAW8AAXgpIVsK/mYYoZ/JgDmwEUBr8AgVVUUM5CvKXaeTKDKL8AXsGgCTiRaKPYSvknIuaelNXiUxNOVhwmWnpYGgHlMQcLH07X0HdpXJ5yaOAeOwPGOb3ISZj9Tn/eAtZmVtf1cSU9aK8JYy2+S8Ts82wbwNuKxxhnVhHaVYARQUk2ni7iccTvJKb0CsyjWCbPM/6iiBN6Bp8D2rPMjsH3Lt1Y2qqS4o8/PwPkOv0KYm4xqK0LVTY8Sj7XPqFZuVwl20G7QDsChzaC1XRVTYNpqVfzLstPD7tZ1tC27uXCiN+nmygySPOzSdwJMyiN+W34AYJMOjcC5RBcAAAAASUVORK5CYII="/>
                </defs>
            </svg>

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
    
    let allItems = taskList.querySelectorAll('.task-item');
    allItems[index].remove();
    
    taskList.querySelectorAll('.task-text').forEach((el, i) => {
        el.textContent = `${i + 1}. ${tasks[i]}`;
    });
    
    checkEmptyTasks();
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
        
        let newIndex = tasks.length - 1;
        let li = createTaskElement(val, newIndex);
        taskList.append(li);
        
        checkEmptyTasks(); 
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
    tasks.sort((a, b) => isAsc ? b.localeCompare(a) : a.localeCompare(b));
    sortAsc.classList.toggle('hidden');
    sortDesc.classList.toggle('hidden');
    renderTasks();
}

sortAsc.addEventListener('click', () => toggleSort(true));
sortDesc.addEventListener('click', () => toggleSort(false));
clearBtn.addEventListener('click', () => taskInput.value = "");

