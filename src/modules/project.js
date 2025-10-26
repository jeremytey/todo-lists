import Todo from './todo.js';

export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(title, dueDate, description = '', priority = 'normal') {
    const todo = new Todo(title, dueDate, description, priority);
    this.todos.push(todo);
  }

  removeTodo(index) {
    this.todos.splice(index,1);
  }

  // Used when reconstructing from plain objects (like after loading JSON)
  static fromJSON(obj) {
    const p = new Project(obj.name);
    if (Array.isArray(obj.todos)) {
      p.todos = obj.todos.map(t => {
        const td = new Todo(t.title, t.dueDate, t.description, t.priority);
        td.completed = !!t.completed;
        return td;
      });
    }
    return p;
  }
}
