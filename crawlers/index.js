var mongoose = require('mongoose');
var config = require('../config');

var WordModel;
// mongoose.connect('mongodb://localhost/' + config.db);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + config.db);
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connect error'));
db.once('open',function(){
	console.log('connect mongodb success');
	
});

// WordModel = require('../models/word');
var WordSchema = mongoose.Schema({
	classId: Number,
	courseId: Number,
	order: Number,
	word: String,
	phonetic: String,
	explain: String
});

var WordModel = mongoose.model('Word',WordSchema);




console.log('start insert word');
insertWords();
var word;

function insertWords(){
	 word = new WordModel({
		classId: 1,
		courseId: 2,
		order: 1,
		word: 'cat',
		phonetic: 'xx',
		explain: '猫'
	});

	console.log('insert word');
	word.save(function(err,word){
		console.log(' fasdf');
		if (err) {
			console.log(err);
			return;
		}
		console.log(word);
	});

	WordModel.find(function(err,words){
		if (err) return err;
		console.log(words);
	})
}