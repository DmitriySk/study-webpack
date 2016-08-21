///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>
import '../../../node_modules/zone.js';
import 'reflect-metadata';
import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {TodoInput} from "../todo-input";
import {TodoList} from "../todo-list";
import {TodoService} from "../todo-service";


@Component({
	selector: 'app',
	directives: [TodoInput, TodoList],
	template: `<div>
		<todo-input></todo-input>
		<todo-list></todo-list>
	</div>`
})

class App {}

bootstrap(App, [TodoService]);