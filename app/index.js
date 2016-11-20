var express = require('express');
var app = express();
var config = require('../config');
var WordModel = require('../models').Word;
var WordbankModel = require('../models').Wordbank;

app.get('/api/wordbank',function(req,res){
	WordbankModel.find({},function(err,wordbanks){
		if (err) {
			res.statusCode = 500;
			return res.send();
		}
		res.statusCode = 200;
		res.send(wordbanks);
	});

});

app.get('/api/wordbank/:id',function(req,res){
	Wordbank.find({classId: req.params.id},function(err,words){
		if (err) {
			res.statusCode = 500;
			return res.send();
		}
		var data = {};
		WordbankModel.find({classId: req.params.id},function(err,wordbanks){
			if (err) {
				res.statusCode = 500;
				return res.send();
			}
			data.name = wordbanks[0].name;
			data.count = words.length;
			data.data = words;
			res.statusCode = 200;
			res.send(data);
		})
	})
});

app.listen(8900,function(){
	console.log('app is running on 8900');
})