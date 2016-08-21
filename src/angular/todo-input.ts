import {Component} from "angular2/core";
import {TodoService} from "./todo-service";

@Component({
	selector: "todo-input",
	template: `<div>
	<input type="text" #myInput/>
	<button (click)="onClick($event, myInput)">Click me</button>
	</div>`
})

export class TodoInput{
	constructor(public todoService: TodoService) {}

	onClick(event, el) {
		this.todoService.todos.push(el.value);
		el.value = "";
		el.focus();
		console.log(this.todoService.todos);
	}
}