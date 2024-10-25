export const projects = () => {
    const content = document.querySelector('.content')
    content.classList.add('projects-screen');
    content.classList.remove('start');
    content.innerHTML = `
    <header>
            <h1>My Projects</h1>
            <button id="add-project-but">Add Project</button>
        </header>
        <form action="" class="new-project-tab">
            <label for="project-name">Project Name</label>
            <input type="text" id="project-name">
            <input type="submit" value="Create">
        </form>
        <div class="project-container">
           
        </div>
    `
}

export const UpdateProjectDisplay = (newGivenProject) => {

    const projects = document.querySelector('.project-container')

    if(newGivenProject){
        const newProject = document.createElement("div");
        newProject.classList.add("project");
        const newData = document.createElement("div");
        newData.classList.add("project-data");
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = newGivenProject.name;  
        const projectTasks = document.createElement("p");
        projectTasks.textContent = "Current Tasks: "+ newGivenProject.tasks.length;
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("project-buttons");
        const openButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        openButton.textContent = "Open";
        deleteButton.textContent = "Delete";

        newData.append(projectTitle, projectTasks);
        buttonDiv.append(openButton, deleteButton);
        newProject.append(newData, buttonDiv);
        projects.appendChild(newProject);
    }
}