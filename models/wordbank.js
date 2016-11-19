var mongoose = require('mongoose');

var WordbankSchema = mongoose.Schema({
	category: String,
	bankName: String,
	classId: Number,
	wordCount: Number,
	download: Number,
	uploader: String
});

var Wordbank = mongoose.model('Wordbank',WordbankSchema);

// module.exports = Wordbank;