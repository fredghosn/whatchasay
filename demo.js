/*jslint node: true */
'use strict';

var whatchasay = require('./lib/whatchasay');

whatchasay.register([
	{
		"regex": /hey computer, talk to me!/, 
		"callback": {
			"func": TheComputer,
			"args": ["red or blue pill?"]
		},
		"listen": [
			{
				"regex": /red/,
				"callback": {
					"func": TheComputer,
					"args": ["you live"]
				}
			},
			{
				"regex": /blue/,
				"callback": {
					"func": TheComputer,
					"args": ["you die"]
				},
				"listen": [
					{
						"regex": /please no!/,
						"callback": {
							"func": TheComputer,
							"args": ["sorry :("]
						},
						"listen": [
							{
								"regex": /i will do your homework/,
								"callback": {
									"func": TheComputer,
									"args": ["i dont have homework i am a computer"]
								}
							}
						]
					}
				]
			}
		]
	}
]);

function TheHuman(msg) {
	console.log('TheHuman: ' + msg);
	whatchasay.parse(msg);
}

function TheComputer(result) {
	console.log('TheComputer: ' + result);
	return true;
}

TheHuman('hey computer, talk to me!');
TheHuman('blue');
TheHuman('please no!');
TheHuman('i will do your homework');