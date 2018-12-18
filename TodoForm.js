import { LitElement, html } from "@polymer/lit-element";

class TodoForm extends LitElement {
  constructor() {
    super();

    this.create = this.create.bind(this);
    this.keyDown = this.keyDown.bind(this);

    this.inputElement = undefined;
  }

  updated() {
    this.inputElement = this.shadowRoot.querySelector(".input");
    this.focusInput();
  }

  create() {
    const todo = this.inputElement.value;
    if (!todo) return;

    this.dispatchEvent(new CustomEvent("onCreate", { detail: todo }));
    this.reset();
    this.focusInput();
  }

  focusInput() {
    this.inputElement.focus();
  }

  keyDown(event) {
    switch (event.key) {
      case "Enter":
        if (!this.inputElement.value) return;
        this.create();
    }
  }

  reset() {
    this.inputElement.value = "";
  }

  render() {
    return html`
      <style>
        .root {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          height: 48px;

          background-color: #fff;
          box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
          z-index: 1;
        }

        .input {
          border: none;
          outline: none;
          flex: 1;
          margin: 0;
          padding: 0 24px;
          height: 48px;
          min-height: 48px;

          background-color: inherit;
          color: #000040;
          box-sizing: border-box;
        }

        .submit-button {
          border: none;
          outline: none;
          margin-left: 0;
          padding: 0 24px;
          height: 48px;
          min-height: 48px;

          background-color: rgba(0, 0, 0, 0.06);
          color: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          font-size: 0.75em;
          font-weight: 600;
          text-transform: uppercase;
          box-sizing: border-box;

          transition: background-color 0.125s ease-in-out;
        }

        .submit-button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .submit-button:active {
          background-color: rgba(0, 0, 0, 0.13);
        }
      </style>

      <div class="root">
        <input
          @keydown="${this.keyDown}"
          class="input"
          placeholder="Write a todo..."
        />
        <button @click="${this.create}" class="submit-button">Create</button>
      </div>
    `;
  }
}

customElements.define("todo-form", TodoForm);
