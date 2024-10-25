import "./styles.css";
import { landing } from "./landing";
import { projects } from "./projects";
import { UpdateProjectDisplay } from "./projects";

let currentProjects = [];

let currentScreen = "landing";

landing();

class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    assignNewProjectTask(newTask){
        this.tasks[this.tasks.length] = newTask;
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
}