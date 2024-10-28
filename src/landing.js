export const landing = () => {
    const content = document.querySelector('.content')
    content.classList.add('start');
    content.innerHTML = `
    <h1>ToDoList</h1>
        <h3>Create and follow up your personal tasks.</h3>
        <div class="button-cont">
            <input type="button" id="start-but" value="+">
            <label for="start-but">Create New Project</label>
        </div>
        <form action="" class="new-project-tab addition-form">
            <label for="project-name">Project Name</label>
            <input type="text" id="project-name">
            <input type="submit" value="Create">
        </form>
    `
}