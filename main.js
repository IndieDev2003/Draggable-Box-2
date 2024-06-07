document.addEventListener("DOMContentLoaded", function() {
    const btn = document.querySelector("#btn");
    const textBoxContent = document.querySelector("#text-box");
    const pendingBox = document.querySelector("#left");
    const doneBox = document.querySelector("#right");
    const main = document.querySelector(".main");
    const errorToast = document.getElementById('error-toast');
    const successToast = document.getElementById('success-toast');

    btn.addEventListener("click", AddTask);
    textBoxContent.addEventListener("focus", handlePlaceholder);
    textBoxContent.addEventListener("blur", handlePlaceholder);

    function handlePlaceholder() {
        if (textBoxContent.innerHTML === "" || textBoxContent.innerHTML === "<br>") {
            textBoxContent.innerHTML = "";
            textBoxContent.setAttribute("data-placeholder", "type here");
        } else {
            textBoxContent.removeAttribute("data-placeholder");
        }
    }

    function AddTask() {
        if (textBoxContent.innerHTML.trim() === '') {
            showToast(errorToast);
        } else {
            let newTask = document.createElement('div');
            let Task = document.createElement('p');
            let span = document.createElement('span');
            newTask.setAttribute("draggable", "true");
            newTask.className = 'task';
            span.innerHTML = `<i class="ri-delete-bin-2-fill"></i>`;
            span.className = 'dlt';
            Task.innerHTML = textBoxContent.innerHTML;
            pendingBox.append(newTask);
            newTask.append(Task);
            newTask.append(span);
            addDragAndDropHandlers(newTask);
            addDeleteHandler(span);
            textBoxContent.innerHTML = '';
            showToast(successToast);
            saveData();
        }
    }

    function addDragAndDropHandlers(task) {
        task.addEventListener("dragstart", function(e) {
            let selected = e.target;
            doneBox.addEventListener("dragover", function(e) {
                e.preventDefault();
            });
            doneBox.addEventListener("drop", function() {
                doneBox.appendChild(selected);
                selected = null;
                saveData();
            });
            pendingBox.addEventListener("dragover", function(e) {
                e.preventDefault();
            });
            pendingBox.addEventListener("drop", function() {
                pendingBox.appendChild(selected);
                selected = null;
                saveData();
            });
        });
    }

    function addDeleteHandler(deleteIcon) {
        deleteIcon.addEventListener("click", function() {
            deleteIcon.parentElement.remove();
            saveData();
        });
    }

    function saveData() {
        localStorage.setItem("todo", main.innerHTML);
    }

    function showData() {
        main.innerHTML = localStorage.getItem("todo") || '';
        let lists = document.getElementsByClassName("task");
        for (let list of lists) {
            addDragAndDropHandlers(list);
            let deleteIcon = list.querySelector('.dlt');
            if (deleteIcon) {
                addDeleteHandler(deleteIcon);
            }
        }
    }

    function showToast(toast) {
        toast.style.display = 'flex';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 4000);
    }

    // Load data on page load
    // showData();
    handlePlaceholder();
});
