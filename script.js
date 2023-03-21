class TD {
    constructor(){
        this.form = document.querySelector('form');
        this.input = document.querySelector('input');
        this.taskdiv = document.querySelector('.task-div');
        this.task = document.querySelector('.task');
        this.taskArr = []
    }

    submitTask(){
        const taskValue = this.input.value;

        const list = JSON.parse(localStorage.getItem("taskList"));
        if (list?.length){
          this.taskId = list[list.length-1].id  + 1 
        } else {
            this.taskId = 1 
        }

        const task = {
            id : this.taskId,
            title : taskValue
        }

        console.log(task);

        const set = localStorage.getItem("taskList");
        if( set ){
          this.taskArr = JSON.parse(set);
          this.addToStorage(task)
        } else {
          this.addToStorage(task)
        }

        this.createTask(task);
        this.input.value = ""
    }

    //add to storage
    addToStorage(obj){
        this.taskArr.push(obj);
        localStorage.setItem("taskList", JSON.stringify(this.taskArr));
      }

     //createRecord
    createTask(obj){
        const div = document.createElement("div");
        div.classList.add("task");
        div.innerHTML =`<p class="detail" data-id="${obj.id}">${obj.title}</p>
        <div class="delete" data-id="${obj.id}"><i class="fa-solid fa-trash-can"></i></div>`
        this.taskdiv.prepend(div);
      } 

      editTask(element){
      let id = parseInt(element.dataset.id);
      //fetch record
      this.taskArr = JSON.parse(localStorage.getItem("taskList"));
      let task = this.taskArr.find((item) => item.id === id);
     // show values
      this.input.value = task.title;
      // remove from DOM
      let parent = element.parentElement;
      this.taskdiv.removeChild(parent);
      //remove from list
      let tempArr = this.taskArr.filter((item) => item.id !== id);
      // remove from local storage
      this.taskArr = tempArr;
      localStorage.setItem("taskList", JSON.stringify(this.taskArr));
      }

      deleteTask(element){
        let id = parseInt(element.dataset.id);
      //remove from dom
      let parent = element.parentElement;
      this.taskdiv.removeChild(parent);
      //remove from list
      this.taskArr = JSON.parse(localStorage.getItem("taskList"));
      let tempArr = this.taskArr.filter((item) => item.id !== id);
      // remove from local storage
      this.taskArr = tempArr;
      localStorage.setItem("taskList", JSON.stringify(this.taskArr));
      }
}

// New instance of TD
const toDo = new TD()

// Variables
const formEl = document.querySelector('form');
const taskList = document.querySelector('.task-div');

// Event listeners
formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    toDo.submitTask();
} )

taskList.addEventListener('click', (event) => {
   if (event.target.classList.contains('detail')){
     toDo.editTask(event.target);
   } else if ((event.target.parentElement.classList.contains('delete'))){
     toDo.deleteTask(event.target.parentElement);  
   }
})

document.addEventListener("DOMContentLoaded", () => {
    let tasks;
    if(!JSON.parse(localStorage.getItem("taskList"))){
      tasks = []
    } else {
      tasks = JSON.parse(localStorage.getItem("taskList"));
    }
  tasks.forEach((task) => toDo.createTask(task))
  })