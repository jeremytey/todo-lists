import './style.css';
import Project from './modules/project.js';
import { renderProjects, renderTodos } from './modules/dom.js';
import { saveProjects, loadProjects } from './modules/storage.js';

// App state
let projects = loadProjects();
let activeIndex = 0;
if (projects.length === 0) {
  projects = [new Project('Default')];
}

// DOM refs
const projectName = document.getElementById('project-name');
const addProjectBtn = document.getElementById('add-project');
const todoTitle = document.getElementById('todo-title');
const todoDate = document.getElementById('todo-date');
const addTodoBtn = document.getElementById('add-todo');

function selectProject(i) {
  activeIndex = i;
  renderProjects(projects, activeIndex, selectProject);
  renderTodos(projects[activeIndex]);
  saveProjects(projects);
}

// initial render
renderProjects(projects, activeIndex, selectProject);
renderTodos(projects[activeIndex]);

addProjectBtn.addEventListener('click', () => {
  const name = projectName.value.trim();
  if (!name) return;
  projects.push(new Project(name));
  projectName.value = '';
  saveProjects(projects);
  renderProjects(projects, activeIndex, selectProject);
});

addTodoBtn.addEventListener('click', () => {
  const title = todoTitle.value.trim();
  if (!title) return;
  const date = todoDate.value || '';
  projects[activeIndex].addTodo(title, date);
  todoTitle.value = '';
  todoDate.value = '';
  saveProjects(projects);
  renderTodos(projects[activeIndex]);
});
