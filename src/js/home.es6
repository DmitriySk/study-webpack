import heplers from './helpers';
import $ from 'jquery';
import '../sass/style.scss';

heplers();
$('#root').height(200).css("background", "#dee");
$('#root2').height(200).css("background", "#edd");

/*$("#root").on('click', () => {
	console.log('click root2');

	require.ensure(["./login"], function(require) {
		let login = require("./login");
		login();
	});
});

$("#root2").on('click', () => {
	console.log('click root2');

	require.ensure(["./logout"], function(require) {
		let logout = require("./logout");
		logout();
	});
});*/

$("#login").on('click', () => {
	$.post("/api/rm/newapp/login", {
		login: 'androidtest',
		pass: "1234"
	}, function(res) {
		console.log(res);
	}, 'json');
});