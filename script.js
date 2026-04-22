let addBtn = document.querySelector(".add-btn");
let inputWrapper = document.querySelector(".input-wrapper");
let taskInput = document.querySelector(".task-input");
let taskList = document.querySelector(".task-list");
let clearBtn = document.querySelector(".clear-btn");
let sortAsc = document.getElementById("sort-asc");
let sortDesc = document.getElementById("sort-desc");
let plusIcon = document.querySelector(".icon-plus"); // Plus ikonunu seçdik

let tasks = [];

// 1. Başlanğıc vəziyyət (İstəyə görə siyahı boşdursa inputu göstərir)
function checkInitialState() {
    if (tasks.length === 0) {
        // Əgər siyahı boşdursa inputu göstər
        inputWrapper.classList.remove('hidden');
    } else {
        // Siyahıda task varsa inputu gizlət
        inputWrapper.classList.add('hidden');
    }
}

// 2. PLUS İKONU: Yalnız bu klikləndikdə input açılır
plusIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Hadisənin addBtn-ə keçməsinə mane ol
    inputWrapper.classList.remove('hidden');
    taskInput.focus();
});

// 3. ADD DÜYMƏSİ: Yalnız task əlavə edir, inputu açmır
addBtn.addEventListener('click', () => {
    // Əgər input gizlidirsə, heç nə etmə (addBtn işləməsin)
    if (inputWrapper.classList.contains('hidden')) {
        return;
    }

    let val = taskInput.value.trim();
    if (val) {
        tasks.push(val);
        taskInput.value = "";
        inputWrapper.classList.add('hidden'); // Əlavə edəndən sonra gizlət
        renderTasks();
    }
});

// 4. Enter düyməsi
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim()) {
        tasks.push(taskInput.value.trim());
        taskInput.value = "";
        inputWrapper.classList.add('hidden'); // Gizlət
        renderTasks();
    }
});

// 5. Render funksiyası
function renderTasks() {
    taskList.innerHTML = "";
    const template = document.getElementById('task-row');

    tasks.forEach((task, index) => {
        const clone = template.content.cloneNode(true);
        
        const taskText = clone.querySelector('.task-text');
        const inputField = clone.querySelector('.edit-task-input');
        const editIcon = clone.querySelector('.edit-icon');
        const saveIcon = clone.querySelector('.save-icon');
        const deleteIcon = clone.querySelector('.delete-icon');

        taskText.textContent = `${index + 1}. ${task}`;
        inputField.value = task;

        // EDIT klikləndikdə
        editIcon.addEventListener('click', () => {
            // 1. ƏVVƏLCƏ DİGƏRLƏRİNİ BAĞLA:
            // Bütün açıq edit inputlarını tap və gizlət
            document.querySelectorAll('.edit-task-input').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.task-text').forEach(el => el.classList.remove('hidden'));
            document.querySelectorAll('.save-icon').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.edit-icon').forEach(el => el.classList.remove('hidden'));

            // 2. İNDİ BU TASKI AÇ:
            taskText.classList.add('hidden');
            editIcon.classList.add('hidden');
            
            inputField.classList.remove('hidden');
            saveIcon.classList.remove('hidden');
            saveIcon.style.display = "block"; 
            inputField.focus();
        });

        // SAVE klikləndikdə
        saveIcon.addEventListener('click', () => {
            const newValue = inputField.value.trim();
            if (newValue) {
                tasks[index] = newValue;
                renderTasks(); // renderTasks çağrılanda DOM yenilənir və hər şey bağlanır
            }
        });

        // DELETE klikləndikdə
        deleteIcon.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        taskList.appendChild(clone);
    });

    checkInitialState();
}

// 6. Sort funksiyası
function toggleSort(isAsc) {
    tasks.sort((a, b) => isAsc ? a.localeCompare(b) : b.localeCompare(a));
    sortAsc.classList.toggle('hidden');
    sortDesc.classList.toggle('hidden');
    renderTasks();
}

sortAsc.addEventListener('click', () => toggleSort(true));
sortDesc.addEventListener('click', () => toggleSort(false));

clearBtn.addEventListener('click', () => taskInput.value = "");

// Başlanğıcda yoxla
checkInitialState();