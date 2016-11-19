var mongoose = require('mongoose');
var config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + config.db);

var db = mongoose.connection;

db.on('error',console.error.bind(console,'connect error'));
db.once('open',function(){
	console.log('connect mongodb success');
});

var wordModel = require('./word');
var wordbankModel = require('./wordbank');


exports.Word = mongoose.model('Word');
exports.Wordbank = mongoose.model('Wordbank');