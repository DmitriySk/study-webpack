import {Component} from "angular2/core";
import {TodoService} from "./todo-service";

@Component({
	selector: "todo-list",
	template: `<div><br>
		{{todoService | json}}
		
		<ul>
			<li *ngFor="let todo of todoService.todos">
				{{todo}}
			</li>
		</ul>
	</div>`
})
export class TodoList {
	constructor(public todoService: TodoService) {}
}