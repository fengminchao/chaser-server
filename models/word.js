var mongoose = require('mongoose');
// var Schema = mongoose.Schema();

var WordSchema = mongoose.Schema({
	classId: Number,
	courseId: Number,
	order: Number,
	word: String,
	phonetic: String,
	explain: String
});

var Word = mongoose.model('Word',WordSchema);

module.exports = Word;