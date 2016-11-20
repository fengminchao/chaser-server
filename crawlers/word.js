var cheerio = require('cheerio');
var request = require('superagent');
var mongoose = require('mongoose');
var WordModel = require('../models').Word;


//直接爬去一个 class的所有单词
exports.getCourseByClassId = function(classId){
	request.get('http://word.iciba.com/?action=courses&classid=' + classId)
	.send()
	.end(function(err,res){
		if (err) return console.log(err);
		var courseLength = getCourseLength(res.text);
		console.log('courseLength: ' + courseLength);
		for(var i = 0;i < courseLength;i ++){
			exports.getCourse(classId,i);
		}
	})
}

//根据 text 解析出 courselength
function getCourseLength(text){
	var $ = cheerio.load(text);
	return $('.study-speed-m').find('li').length;
}
// classId 为一个词库 id，courseId 为课程内每个章节的id
exports.getCourse = function(classId,courseId){
	request.get('http://word.iciba.com/?action=words&class=' + classId + '&course=' + courseId)
	.send()
	.end(function(err,res){
		if (err) {
			console.log(err);
			return;
		}
		parseWordSchema(res.text,classId,courseId);
	})
}

function parseWordSchema(text,classId,courseId){
	var $ = cheerio.load(text);
	// var item = [];
	$('.word_main_list li').each(function(id,element){
		var word = $('.word_main_list_w span',element).text();
		var phonetic = $('.word_main_list_y strong',element).text();
		var explain = $('.word_main_list_s span',element).text();
		//剔除字段中的转义符
		word = word.replace(/\t+/g,'').replace(/\n+/g,'').replace(/\r+/g,'');
		phonetic = phonetic.replace(/\t+/g,'').replace(/\n+/g,'').replace(/\r+/g,'');
		explain = explain.replace(/\t+/g,'').replace(/\n+/g,'').replace(/\r+/g,'');
		// item.push({
		// 	word: word,
		// 	phonetic: phonetic,
		// 	explain: explain
		// });

		var wordModel = new WordModel({
			classId: classId,
			courseId: courseId,
			word: word,
			phonetic: phonetic,
			explain: explain
		});

		wordModel.save(function(err,word){
			if (err) {
				return console.log(err);
			}
			console.log(word);
		})
			
		// console.log(word + '\n' + phonetic + '\n' + explain);
	});
}

function saveWord(word){
	word.save(function(err,word){
		if (err) {
			return console.log(err);
		}
		console.log(word);
	});
}



exports.getCourseByClassId(11);
// getCourse
