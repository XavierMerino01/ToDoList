export const tasks = (project) => {
    const content = document.querySelector('.content')
    content.classList.add('projects-screen');
    content.classList.remove('start');
    content.innerHTML = `
    <header>
            <h1 id="project-title">Project Name</h1>
            <div>
                <button id="back-but">Back</button>
                <button id="add-task-but">New Task</button>
            </div>
            
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

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("task-title");

        const taskName = document.createElement("h2");
        taskName.textContent = projectTasks[i].title;
        const deleteButton = document.createElement("button");    
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-task-but");

        const taskDesc = document.createElement("p");
        taskDesc.textContent = projectTasks[i].description;
        const taskDate = document.createElement("p");
        taskDate.textContent = "Due Date: ";
        const dueDate = document.createElement("span");
        dueDate.style.fontWeight = 700;
        dueDate.textContent = projectTasks[i].dueDate;
        const priority = document.createElement("p");
        priority.textContent = "Priority: ";
        const taskPrio = document.createElement("span");
        taskPrio.style.fontWeight = 700;
        taskPrio.textContent = projectTasks[i].priority[0].toUpperCase() + projectTasks[i].priority.slice(1);

        const statusCheck = document.createElement("select");
        statusCheck.id = "task-status";
        const statusLabel = document.createElement("label");
        statusLabel.for = "task-status";
        statusLabel.textContent = "Task State";
        
        const status1 = document.createElement("option");
        status1.value = "Unactive";
        status1.textContent = "Unactive";
        const status2 = document.createElement("option");
        status2.value = "Doing";
        status2.textContent = "Doing";
        const status3 = document.createElement("option");
        status3.value = "Done";
        status3.textContent = "Done";
        statusCheck.value = projectTasks[i].status;
        
        statusCheck.append(status1, status2, status3);
        statusCheck.value = projectTasks[i].status;

        priority.appendChild(taskPrio);
        taskDate.appendChild(dueDate);
        titleDiv.append(taskName, deleteButton);
        taskDiv.append(titleDiv, taskDesc, taskDate, priority, statusLabel, statusCheck);
        tasks.append(taskDiv);


        deleteButton.addEventListener("click", () => {
            const taskToDelete = taskDiv;
            if (taskToDelete) {
                taskToDelete.remove();
            }

            tasks.dispatchEvent(new CustomEvent('taskDeleted', {
                detail: { task: projectTasks[i]}
            }));
        });


        statusCheck.addEventListener('change', ()=>{
            tasks.dispatchEvent(new CustomEvent('statusChanged', {
                detail: {task: projectTasks[i], value: statusCheck.value}
            }));
        })
    }
}