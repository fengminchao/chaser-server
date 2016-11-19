var cheerio = require('cheerio');
var request = require('superagent');
var mongoose = require('mongoose');
var WordModel = require('../models/word');
var fs = require('fs');

//直接爬去一个 class的所有单词
exports.getCourseByClassId = function(classId){
	fs.readFile('./word.html',function(err,data){
		if (err) {
			return console.log(err);
		}
		getCourseLength(data.toString());
		// var courseLength = getCourseLength(res.text);
		// console.log('courseLength: ' + courseLength);


		// for(var i = 0;i < courseLength;i ++){
		// 	getCourse(classId,i);
		// }
	// exports.getCourseByClassId(11);
});
	// request.get('http://word.iciba.com/?action=courses&classid=' + classId)
	// .send()
	// .end(function(err,res){
	// 	if (err) return console.log(err);
	// 	var courseLength = getCourseLength(res.text);
	// 	console.log('courseLength: ' + courseLength);
	// 	for(var i = 0;i < courseLength;i ++){
	// 		getCourse(classId,i);
	// 	}
}

// fs.read('word.html',function(err,data){
// 	if (err) {
// 		return console.log(err);
// 	}
// 	return data.toString();	
// 	// exports.getCourseByClassId(11);
// })
function log(s){
	console.log(s);
}

function getCourseLength(text){
	log('begin get course');
	var $ = cheerio.load(text);
	var text = $('.study_speed_m').text();
	log(text);
}

exports.getCourseByClassId(11);