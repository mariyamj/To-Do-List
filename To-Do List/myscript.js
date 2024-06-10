let now = new Date();

window.onload = function() {
    date();
    showSaved();
}

function date() {
    let d = document.getElementById("date");
    d.innerHTML = new Date().toLocaleDateString('default', {
        weekday: "long",
        day: "numeric",
        month: 'long',
        year: "numeric"
    });

    let t = document.getElementById("time");
    t.innerHTML = new Date().toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit',
        second: "2-digit",
        hour12: true
    });

    let day = new Date().toLocaleDateString('default', { weekday: 'long' });
    let today = document.getElementById(day);

    if (today) {
        today.style.color = "rgb(153, 146, 146)";
    }
}

function addTask() {
    let val = document.getElementById("newTask").value;
    let tasks = document.getElementById("tasks");

    if (val == "") {
        alert("Please enter a value");
    } else {
        let div = document.createElement("div");
        div.classList.add("task");
        tasks.appendChild(div);

        let div2 = document.createElement("div");
        div.appendChild(div2);
        
        let p = document.createElement("p");
        p.innerHTML = val;
        div2.appendChild(p);

        let time = document.createElement("p");
        time.innerHTML = new Date().toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        time.style.width = "70px";
        div2.appendChild(time);

        let div3 = document.createElement("div");
        div3.classList.add("task");
        div3.setAttribute("id", "icon");
        div.appendChild(div3);

        let i = document.createElement("i");
        i.classList.add("fa-regular", "fa-circle-check");
        div3.appendChild(i);

        let i2 = document.createElement("i");
        i2.classList.add("fa-regular", "fa-circle-xmark");
        div3.appendChild(i2);

        i.addEventListener("click", function() {
            markDone(p);
        });

        i2.addEventListener("click", function() {
            deleteTask(div);
        });

        saveData();

        // Clear the input field after adding a task
        document.getElementById("newTask").value = "";
    }
}

function markDone(p) {
    let s = document.createElement("s");

    while (p.firstChild) {
        s.appendChild(p.firstChild);
    }

    p.appendChild(s);
    saveData();
}

function deleteTask(div) {
    div.remove();
    saveData();
}

function showSaved() {
   let tasks = document.getElementById("tasks");
   tasks.innerHTML = localStorage.getItem("data");
   
   let taskDivs = tasks.getElementsByClassName("task");
   for (let taskDiv of taskDivs) {
       let icons = taskDiv.querySelectorAll("#icon i");
       let p = taskDiv.querySelector("p");

       icons[0].addEventListener("click", function() {
           markDone(p);
       });

       icons[1].addEventListener("click", function() {
           deleteTask(taskDiv);
       });
   }
}


function saveData() {
    let tasks = document.getElementById("tasks");
    localStorage.setItem("data", tasks.innerHTML);
}



