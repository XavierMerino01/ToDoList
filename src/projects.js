export const projects = () => {
    const content = document.querySelector('.content')
    content.classList.add('projects-screen');
    content.classList.remove('start');
    content.innerHTML = `
    <header>
            <h1>My Projects</h1>
            <button id="add-project-but">Add Project</button>
        </header>
        <form action="" class="new-project-tab addition-form">
            <label for="project-name">Project Name</label>
            <input type="text" id="project-name">
            <input type="submit" value="Create">
        </form>
        <div class="project-container">
           
        </div>
    `
}

export const UpdateProjectDisplay = (givenProjects) => {

    const projects = document.querySelector('.project-container');
    projects.innerHTML ='';

    for(let i = 0; i < givenProjects.length; i++){
        const newProject = document.createElement("div");
        newProject.classList.add("project");
        newProject.id = `project-${givenProjects[i].id}`;
        const newData = document.createElement("div");
        newData.classList.add("project-data");
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = givenProjects[i].name;  
        const projectTasks = document.createElement("p");
        projectTasks.textContent = "Current Tasks: "+ givenProjects[i].tasks.length;
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("project-buttons");
        const openButton = document.createElement("button");
        openButton.classList.add("openButton");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        openButton.textContent = "Open";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            const projectToDelete = document.getElementById(`project-${givenProjects[i].id}`);
            if (projectToDelete) {
                projectToDelete.remove();
            }

            projects.dispatchEvent(new CustomEvent('projectDeleted', {
                detail: { projectId: givenProjects[i].id }
            }));
        });

        openButton.addEventListener('click', () =>{
            const openedProject = document.getElementById(`project-${givenProjects[i].id}`);

            projects.dispatchEvent(new CustomEvent('projectOpened', {
                detail: {projectId: givenProjects[i].id}
            }));
        });

        newData.append(projectTitle, projectTasks);
        buttonDiv.append(openButton, deleteButton);
        newProject.append(newData, buttonDiv);
        projects.appendChild(newProject);
        
    }
}
