import {Component} from "angular2/core";
import {TodoService} from "./todo-service";
import {TodoModel} from "./todo-model";

@Component({
	selector: "todo-input",
	template: `<div>
	<input type="text" [(ngModel)]="secondInput.title"/>
	<p>{{secondInput | json}}</p>
	<input type="text" #myInput/>
	<button (click)="onClick($event, myInput)">Click me</button>
	</div>`
})

export class TodoInput{
	secondInput:TodoModel = new TodoModel();

	constructor(public todoService: TodoService) {}

	onClick(event, el) {
		this.todoService.todos.push(this.secondInput);
		el.value = "";
		el.focus();
		console.log(this.todoService.todos);
		this.secondInput = new TodoModel();
	}
}