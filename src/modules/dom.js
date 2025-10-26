export function renderProjects(projects, activeIndex, onSelect) {
  const list = document.getElementById('project-list');
  list.innerHTML = '';
  projects.forEach((p,i) => {
    const li = document.createElement('li');
    li.textContent = p.name;
    if (i === activeIndex) li.classList.add('active');
    li.addEventListener('click', () => onSelect(i));
    list.appendChild(li);
  });
}

export function renderTodos(project) {
  const list = document.getElementById('todo-list');
  const title = document.getElementById('current-project');
  list.innerHTML = '';
  if (!project) {
    title.textContent = 'Select a Project';
    return;
  }
  title.textContent = project.name;
  project.todos.forEach((t, idx) => {
    const li = document.createElement('li');
    li.textContent = `${t.title} (${t.dueDate || 'no date'})`;
    if (t.completed) li.classList.add('done');
    // Toggle complete on click
    li.addEventListener('click', () => {
      t.toggleComplete();
      renderTodos(project);
      // save is handled in caller
    });
    // delete button
    const del = document.createElement('button');
    del.textContent = '✖';
    del.style.marginLeft = '10px';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      project.removeTodo(idx);
      renderTodos(project);
    });
    li.appendChild(del);
    list.appendChild(li);
  });
}
