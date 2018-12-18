import { LitElement, html } from "@polymer/lit-element";
import "./TodoForm.js";
import "./TodoList.js";

function saveTodos(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  return JSON.parse(window.localStorage.getItem("todos"));
}

class TodoApp extends LitElement {
  constructor() {
    super();
    this.todos = getTodos() || [];

    this.createTodo = this.createTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  static get properties() {
    return {
      todos: { type: Array }
    };
  }

  createTodo(event) {
    this.todos = [
      ...this.todos,
      {
        completed: false,
        id: Math.random(),
        text: event.detail
      }
    ];
    // Look for listener...
    this.updateStore();
  }

  completeTodo(event) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== event.detail) return todo;

      return {
        ...todo,
        completed: true
      };
    });
    this.updateStore();
  }

  deleteTodo(event) {
    this.todos = this.todos.filter(todo => todo.id !== event.detail);
    this.updateStore();
  }

  updateStore() {
    saveTodos(this.todos);
  }

  render() {
    return html`
      <style>
        .root {
          margin: 0 auto;
          max-width: 400px;
        }

        .header {
          padding-bottom: 8px;

          color: #0000a0;
          text-align: center;
        }
      </style>

      <div class="root">
        <h1 class="header">To-do's</h1>

        <todo-form @onCreate="${this.createTodo}"></todo-form>

        <todo-list
          .todos="${this.todos}"
          @onComplete="${this.completeTodo}"
          @onDelete="${this.deleteTodo}"
        >
        </todo-list>
      </div>
    `;
  }
}

customElements.define("todo-app", TodoApp);
