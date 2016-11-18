var cheerio = require('cheerio');
var request = require('superagent');
// classId 为一个词库 id，courseId 为课程内每个章节的id
exports.getCourse = function(classId,courseId){
	request.get('http://word.iciba.com/?action=words&class=' + classId + '&course=' + courseId)
	.send()
	.end(function(err,res){
		if (err) {
			console.log(err);
			return;
		}
		parseWordSchema(res.text);
	})
}

function parseWordSchema(text){
	var $ = cheerio.load(text);
	var item = [];
	$('.word_main_list li').each(function(id,element){
		var word = $('.word_main_list_w span',element).text();
		var phonetic = $('.word_main_list_y strong',element).text();
		var explain = $('.word_main_list_s span',element).text();
		//剔除字段中的转义符
		word = word.replace(/\t+/g,'').replace(/\n+/g,'').replace(/\r+/g,'');
		phonetic = phonetic.replace(/\t+/g,'').replace(/\n+/g,'')replace(/\r+/g,'');
		explain = explain.replace(/\t+/g,'').replace(/\n+/g,'')replace(/\r+/g,'');
		item.push({
			word: word,
			phonetic: phonetic,
			explain: explain
		});

		// console.log(word + '\n' + phonetic + '\n' + explain);
	});
}

for (var i = 1; i < 30; i ++) {
	exports.getCourse(11,i);
}