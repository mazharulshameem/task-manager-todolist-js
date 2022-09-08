// define ui variables

const Form = document.getElementById("task-form");
const taskInput = document.getElementById("task");
const filter = document.getElementById("filter");
const taskList = document.getElementById("collection");
const clearTaskBtn = document.getElementById("clear-task");

// Load all event 
LoadEventListener();
// custom function LoadEventListener ()
function LoadEventListener(){
  // storage to load 
 document.addEventListener("DOMContentLoaded", getTasks);
  // add task form 
Form.addEventListener('submit', addTask)
    // remove task 
taskList.addEventListener('click', removeTask)
    // clear task
 clearTaskBtn.addEventListener('click', clearTask);
//  filter 
 filter.addEventListener('keyup', filterTask);
}
function addTask (e){
   if(taskInput.value ===""){
     alert('Please, Add a Task ..?')
   }else{
     // create li element
     const li = document.createElement("li");
     li.className = "collection-item";
     li.appendChild(document.createTextNode(taskInput.value));
     // create link icon X element remove
     const linkIcon = document.createElement("a");
     linkIcon.className = "delete-item secondary-content";
     linkIcon.innerHTML = '<i class="fa fa-remove"></i>';
     // append link icon to li
     li.appendChild(linkIcon);
     // append li to ul
     taskList.appendChild(li);

     // add task local storage
     addTaskInLocalStorage(taskInput.value);
   }
   taskInput.value = '';
    
  e.preventDefault();
}
// function local storage ()
function addTaskInLocalStorage(newTask){
  let tasks;
  if (localStorage.getItem('tasks')=== null){
    tasks=[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

tasks.push(newTask);
localStorage.setItem('tasks',JSON.stringify(tasks));
}
// storage to loaded function 
function getTasks(){
   let tasks;
   if (localStorage.getItem("tasks") === null) {
     tasks = [];
   } else {
     tasks = JSON.parse(localStorage.getItem("tasks"));
   }
   tasks.forEach(function(task){
     // create li element
     const li = document.createElement("li");
     li.className = "collection-item";
     li.appendChild(document.createTextNode(task));
     // create link icon X element remove
     const linkIcon = document.createElement("a");
     linkIcon.className = "delete-item secondary-content";
     linkIcon.innerHTML = '<i class="fa fa-remove"></i>';
     // append link icon to li
     li.appendChild(linkIcon);
     // append li to ul
     taskList.appendChild(li);
   })
}

// function remove task 
function removeTask(e){
if(e.target.parentElement.classList.contains('delete-item')){
  if(confirm('Are You Sure to Delete .?')){
   e.target.parentElement.parentElement.remove();
   
  //  remove local storage 
  removeFromLocalStorage(e.target.parentElement.parentElement);
  }

}
  e.preventDefault();
}
//  remove from local storage function 
function removeFromLocalStorage(taskItem){
   let tasks;
   if (localStorage.getItem("tasks") === null) {
     tasks = [];
   } else {
     tasks = JSON.parse(localStorage.getItem("tasks"));
     tasks.forEach(function (task, index){
       if(taskItem.textContent === task){
        tasks.splice(index, 1);
       
      }

     });
     localStorage.setItem('tasks',JSON.stringify(tasks));
   
    }
}

  // clear task function 
  function clearTask(e){
    // easy way 
    // taskList.innerHTML ='';
    // faster way 
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
   clearFromLocalStorage();
  }

  // filter function 
  function filterTask(e){
   const text =e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(function(task){
   const item = task.firstChild.textContent;
   if(item.toLowerCase().indexOf(text) != -1){
    task.style.display ='block';
   }else{
    task.style.display = 'none';
     }
   
    });
    e.preventDefault();
  }
  // function local storage 
   function clearFromLocalStorage(){
    localStorage.clear();
  };
