import { LitElement, html } from "@polymer/lit-element";

class TodoList extends LitElement {
  constructor() {
    super();

    this.complete = this.complete.bind(this);
    this.delete = this.delete.bind(this);

    this.todos = [];
  }

  static get properties() {
    return {
      todos: Array
    };
  }

  complete(id) {
    this.dispatchEvent(new CustomEvent("onComplete", { detail: id }));
  }

  delete(event, id) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent("onDelete", { detail: id }));
  }

  render() {
    return html`
      <style>
        .root {
          padding: 0;
          margin: 0;

          list-style: none;
        }

        .item {
          display: flex;
          align-items: center;
          border: none;
          outline: none;
          margin: 0;
          padding: 0;
          height: 48px;
          min-height: 48px;

          background-color: #fff;
          color: rgba(0, 0, 0, 0.87);
          cursor: pointer;
          font-weight: 500;
          box-sizing: border-box;
          box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
        }

        .item:nth-child(2n) {
          background-color: #f3f3f3;
        }

        .completed {
          color: rgba(0, 0, 0, 0.5);
          text-decoration: line-through;
        }

        .delete-button {
          border: none;
          outline: none;
          padding: 0 24px;
          height: 48px;
          min-height: 48px;

          background-color: transparent;
          color: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          font-size: 0.8em;
          font-weight: 600;
          text-decoration: none;

          box-sizing: border-box;

          transition: background-color 0.125s ease-in-out;
        }

        .delete-button:hover {
          background-color: #e7e7e7;
        }

        .delete-button:active {
          background-color: #dedede;
        }

        .text {
          flex: 1;
          padding: 0 24px;
          box-sizing: border-box;
        }
      </style>

      <ul class="root">
        ${
          this.todos.map(
            todo => html`
              <li
                @click="${() => this.complete(todo.id)}"
                class="item ${todo.completed ? "completed" : ""}"
              >
                <span class="text">${todo.text}</span>
                <button
                  @click="${event => this.delete(event, todo.id)}"
                  class="delete-button"
                >
                  X
                </button>
              </li>
            `
          )
        }
      </ul>
    `;
  }
}

customElements.define("todo-list", TodoList);
