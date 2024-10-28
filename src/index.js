import "./styles.css";
import { landing } from "./landing";
import { projects } from "./projects";
import { tasks } from "./tasks";
import { UpdateProjectDisplay } from "./projects";
import { GenerateProjectTasks } from "./tasks";

let currentProjects = [];
let currentProject;

let currentScreen = "landing";

landing();

// const date = new Date();

// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();

// let currentDate = `${day}-${month}-${year}`;
// console.log(currentDate);

class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
        this.id = currentProjects.length;
    }

    assignNewProjectTask(newTask){
        this.tasks[this.tasks.length] = newTask;
    }

    getProjectCurrentTasks(){
        return this.tasks;
    }
}

class Task{
    constructor(title, description, dueDate, priority, status){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-but");
    const form = document.querySelector(".new-project-tab");

    startButton.addEventListener("click", () => {
        form.classList.toggle("show"); 
    });

    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const projectName = document.getElementById("project-name").value;
        if(projectName){
            const newProject = new Project(projectName);
            currentProjects[currentProjects.length] = newProject;
            projects();
            UpdateProjectDisplay(newProject);
            OnProjectsScreen();
        }
        else{
            alert("Project name is recquired!");
        }
    })
});

function OnProjectsScreen(){

    currentScreen = "projects";

    const addProjectButt = document.querySelector("#add-project-but");
    const form = document.querySelector(".new-project-tab");

    addProjectButt.addEventListener('click', () =>{
        form.classList.toggle("show"); 
    })

    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const projectName = document.getElementById("project-name").value;
        if(projectName){
            const newProject = new Project(projectName);
            currentProjects[currentProjects.length] = newProject;
            UpdateProjectDisplay(newProject);
            document.getElementById("project-name").value = "";
            form.classList.toggle("show"); 
        }
        else{
            alert("Project name is recquired!");
        }
    })

    const projectContainer = document.querySelector(".project-container");

    projectContainer.addEventListener('projectDeleted', (event)=>{
        currentProjects = currentProjects.filter(project => project.id !== event.detail.projectId);
    })

    projectContainer.addEventListener('projectOpened', (event)=>{
        let selectedProject = currentProjects.find(x => x.id === event.detail.projectId)
        tasks(selectedProject);
        OnTaskScreen();
        SetCurrentProject(selectedProject);
    })
}

function SetCurrentProject(project){
    currentProject = project;
}

function OnTaskScreen(){
    currentScreen = "tasks";

    const newTaskButton = document.querySelector("#add-task-but");
    const form = document.querySelector(".new-task-tab");

    newTaskButton.addEventListener('click', () =>{
        form.classList.toggle("show"); 
    })

    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const taskName = document.getElementById("task-title").value;
        const taskDescription = document.getElementById("task-description").value;
        const dueDate = document.getElementById("due-date").value;
        const priority = document.getElementById("priority").value;

        if(taskName && dueDate){
            const newTask = new Task(taskName, taskDescription, dueDate, priority, false);
            form.classList.toggle("show"); 
            document.getElementById("task-title").value = "";
            document.getElementById("task-description").value = "";
            document.getElementById("due-date").value = "";
            currentProject.assignNewProjectTask(newTask);
            GenerateProjectTasks(currentProject);
        }
        else{
            alert("Title and Due Date fields must be filled!");
        }
    })
}