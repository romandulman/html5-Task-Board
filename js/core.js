var tasks = [], task ;
  const loadTasks = () => {
    document.getElementById('notesBoard').innerHTML = "";
    let loadJSON = localStorage.getItem("tasksJSON");
    if (loadJSON == null){
        tasks = []
    }else{
        tasks = JSON.parse(loadJSON);

    }
    if (tasks != null) {
    printHTML();
    }
};
 const printHTML = () => {
    document.getElementById('notesBoard').innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('notesBoard').innerHTML += `<div class='col-xs-3 showX' id='${i}'><div class='stickynote'><span onclick='removeTask(this.id)' id='${i}' class='glyphicon glyphicon-remove glyp'></span><br><div class='outText'>${tasks[i].Text}</div><br><span>${tasks[i].Date}</span><br><span>${tasks[i].Time}</span></div></div>`;
        if (i <= 0) {
            document.getElementById(i).style.animation = 'fadein 2s';
        } else {
            document.getElementById(i - 1).style.animation = '';
            document.getElementById(i).style.animation = 'fadein 2s';
        }
    }
};
const publishTask = () => {
    let taskText = document.getElementById('taskText').value;
    let taskDate = document.getElementById('taskDate').value;
    let taskTime = document.getElementById('taskTime').value;
    task = {
        Text: taskText,
        Date: taskDate,
        Time: taskTime
    };
    tasks.push(task);
    localSave(tasks);
    printHTML();
};
let removeTask = (id) => {
    let answer = confirm('Are you sure you want to remove this task?');
    if (answer) {
        document.getElementById(id).innerHTML = "";
        tasks.splice(id, 1);
        localStorage.removeItem("tasksJSON");
        localSave(tasks);
        loadTasks();
    }
};
let localSave = (objArr) => {
    let taskJSON = JSON.stringify(objArr);
    localStorage.setItem("tasksJSON", taskJSON);
};
const beforeLoad = () => {
    if (typeof(Storage) !== "undefined") {
        loadTasks();
    } else {
        alert('Your web browser has no web storage support, the tasks will not be saved ! ');
    }
};
const resetForm = () => {
    document.getElementById('taskForm').reset();
    return false;
};
