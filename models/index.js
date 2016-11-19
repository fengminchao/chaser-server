var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect('mongodb://localhost/' + config.db);

var db = mongoose.connect();

db.on('error',console.error.bind(console,'connect error'));
db.once('open',function(){
	console.log('connect mongodb success');
});

require('./word');

exports.Word = mongoose.model('Word');