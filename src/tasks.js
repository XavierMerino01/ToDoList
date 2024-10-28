export const tasks = (project) => {
    const content = document.querySelector('.content')
    content.classList.add('projects-screen');
    content.classList.remove('start');
    content.innerHTML = `
    <header>
            <h1 id="project-title">Project Name</h1>
            <button id="add-task-but">New Task</button>
        </header>
        <form action="" class="addition-form new-task-tab" id="taskform">
            <label for="task-title">Task Name</label>
            <input type="text" id="task-title">
            <label for="task-description">Description</label>
            <input type="text" id="task-description">
            <label for="due-date">Due Date</label>
            <input type="date" id="due-date">
            <label for="priority">Task Priority</label>
            <select id="priority" form="taskform">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
            </select>
            <input type="submit" value="Create">

        </form>
        <div class="task-container">
        </div>
    `

    const title = document.getElementById("project-title");
    title.textContent = project.name;
    GenerateProjectTasks(project);
}

export const GenerateProjectTasks = (givenProject) => {

    const tasks = document.querySelector(".task-container");
    tasks.innerHTML ='';
    const projectTasks = givenProject.getProjectCurrentTasks();
    if(projectTasks.length <= 0) return;
    for(let i = 0; i < projectTasks.length; i++){

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.classList.add(projectTasks[i].priority);
        const taskName = document.createElement("h2");
        taskName.textContent = projectTasks[i].title;
        const taskDesc = document.createElement("p");
        taskDesc.textContent = projectTasks[i].description;
        const taskDate = document.createElement("p");
        taskDate.textContent = "Due Date: ";
        const dueDate = document.createElement("span");
        dueDate.style.fontWeight = 700;
        dueDate.textContent = projectTasks[i].dueDate;
        const priority = document.createElement("p");
        priority.textContent = projectTasks[i].priority.toUpperCase() + String(s).slice(1);;
        

        taskDate.appendChild(dueDate);
        taskDiv.append(taskName, taskDesc, taskDate);
        tasks.append(taskDiv);
    }
}