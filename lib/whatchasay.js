/*jslint node: true */
'use strict';

var _ = require('underscore');

var resDB = [];
var queue = [];
var _process_queue = [];

function parse(text) {
	// Process recursive responses
	_process_queue = [];

	var queueFilter = _.filter(queue, function(item) {
		return processListener(item, text);
	});

	queue = queueFilter.concat(_process_queue);
	
	// Process first level of responses
	_process_queue = [];

	_.each(resDB, function(item) {
		processListener(item, text);
	});
	
	queue = queue.concat(_process_queue);
}

function processListener(item, text) {
	var res = item.regex.exec(text);

	if (res) {
		var callback = item.callback;
		if (callback) {
		
		var fres = callback.func.apply(null, callback.args);
		
			if (!fres) {
				return true;
			}
		}

		if (item.listen) {
		
			_process_queue = _process_queue.concat(item.listen);
			
		}

		return false; 
	}

	return true;
}

exports.register = function(db) {
	resDB = db;
};

exports.parse = parse;	