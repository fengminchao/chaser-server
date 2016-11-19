var mongoose = require('mongoose');
// var Schema = mongoose.Schema();

var WordSchema = mongoose.Schema({
	classId: Number,
	courseId: Number,
	word: String,
	phonetic: String,
	explain: String
});

var wordtest = 'wordtest';
// WordSchema.methods.

// console.log('word model is load');
var Word = mongoose.model('Word',WordSchema);

// module.exports = Word;