import "./styles.css";
import { landing } from "./landing";
import { projects } from "./projects";
import { tasks } from "./tasks";
import { UpdateProjectDisplay } from "./projects";
import { GenerateProjectTasks } from "./tasks";

let currentProjects = [];
let currentProject;
let currentScreen;


class Project{
    constructor(name, id){
        this.name = name;
        this.tasks = [];
        this.id = id;
    }

    assignNewProjectTask(newTask){
        this.tasks[this.tasks.length] = newTask;
    }

    getProjectCurrentTasks(){
        return this.tasks;
    }

    getProjectId(){
        return this.id;
    }
}

function GenerateProjectId(){
    if(currentProjects.length == 0){
        return 0;
    }
    return currentProjects[currentProjects.length - 1].getProjectId() +1;
}

class Task{
    constructor(title, description, dueDate, priority, status){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    changeTaskStatus(newStatus){
        this.status = newStatus;
    }
}

const projectAmount = parseInt(localStorage.getItem("projectAmount"), 10) || 0;
console.log(projectAmount);
if(projectAmount === 0){
    currentScreen = "landing";
    landing();
}
else{
    currentProjects = loadProjectsFromLocalStorage();
    OnProjectsScreen();
}

function saveProjectsToLocalStorage(projects) {
    const projectsData = projects.map(project => ({
        name: project.name,
        id: project.id,
        tasks: project.tasks.map(task => ({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            status: task.status
        }))
    }));
    localStorage.setItem("projects", JSON.stringify(projectsData));
    localStorage.setItem("projectAmount", JSON.stringify(projectsData.length));
}

function loadProjectsFromLocalStorage() {
    const projectsData = localStorage.getItem("projects");
    if (!projectsData) return []; // Return an empty array if no data

    const parsedData = JSON.parse(projectsData);
    return parsedData.map(data => {
        const project = new Project(data.name, data.id);
        project.tasks = data.tasks.map(taskData => new Task(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.status
        ));
        return project;
    });
}





document.addEventListener("DOMContentLoaded", () => {

    if(currentScreen !== "landing") return;

    const startButton = document.getElementById("start-but");
    const form = document.querySelector(".new-project-tab");

    startButton.addEventListener("click", () => {
        form.classList.toggle("show"); 
    });

    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const projectName = document.getElementById("project-name").value;
        if(projectName){
            const newProject = new Project(projectName, GenerateProjectId());
            currentProjects.push(newProject);
            saveProjectsToLocalStorage(currentProjects);
            OnProjectsScreen();
        }
        else{
            alert("Project name is recquired!");
        }
    })
});

function OnProjectsScreen(){

    currentScreen = "projects";
    projects();
    UpdateProjectDisplay(currentProjects);

    const addProjectButt = document.querySelector("#add-project-but");
    const form = document.querySelector(".new-project-tab");

    addProjectButt.addEventListener('click', () =>{
        form.classList.toggle("show"); 
    })

    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const projectName = document.getElementById("project-name").value;
        if(projectName){
            const newProject = new Project(projectName, GenerateProjectId());
            currentProjects.push(newProject);
            saveProjectsToLocalStorage(currentProjects);
            UpdateProjectDisplay(currentProjects);
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
        saveProjectsToLocalStorage(currentProjects);
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
    const backButton = document.querySelector("#back-but");
    const form = document.querySelector(".new-task-tab");

    newTaskButton.addEventListener('click', () =>{
        form.classList.toggle("show"); 
    })

    backButton.addEventListener('click', ()=>{
        projects();
        UpdateProjectDisplay(currentProjects);
        OnProjectsScreen();
    })

    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const taskName = document.getElementById("task-title").value;
        const taskDescription = document.getElementById("task-description").value;
        const dueDate = document.getElementById("due-date").value;
        const priority = document.getElementById("priority").value;

        if(taskName && dueDate){
            const newTask = new Task(taskName, taskDescription, dueDate, priority, "unactive");
            form.classList.toggle("show"); 
            document.getElementById("task-title").value = "";
            document.getElementById("task-description").value = "";
            document.getElementById("due-date").value = "";
            currentProject.assignNewProjectTask(newTask);
            saveProjectsToLocalStorage(currentProjects);
            GenerateProjectTasks(currentProject);
        }
        else{
            alert("Title and Due Date fields must be filled!");
        }
    })

    const taskContainer = document.querySelector(".task-container");

    taskContainer.addEventListener('statusChanged', (event)=>{

        const task = event.detail.task;
        const value = event.detail.value;

        task.changeTaskStatus(value);
        saveProjectsToLocalStorage(currentProjects);
    })

    taskContainer.addEventListener('taskDeleted', (event)=>{
        currentProject.tasks = currentProject.tasks.filter(task => task !== event.detail.task);
        saveProjectsToLocalStorage(currentProjects);
    })
}