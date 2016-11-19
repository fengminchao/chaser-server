var cheerio = require('cheerio');
var request = require('superagent');
var WordbankModel = require('../models').Wordbank;
var config = require('../config');
var wordCrawler = require('./word');
// var fs = require('fs');



function getWordbankList(){
	request.get('http://word.iciba.com/')
	.send()
	.end(function(err,res){
		if (err) {
			console.log(err);
			return;
		}
		parseHtml(res.text);
	})
}
var i = 0;
var j = 0;
function parseHtml(text){
	var $ = cheerio.load(text);
	var item = [];
	$('.main_l').each(function(id,element){
		console.log('the element');
		var category = $('h2',element).text();
		
		$('li',element).each(function(id,element){

			var length = $('li',element).length;
				if (length == 0) {
				var countStr = $('p',element).text();
				countStr = countStr.match(/[0-9]+/);
				var wordbank = new WordbankModel({
					category: category,
					bankName: $(':header',element).text(),
					classId: $(element).attr('class_id'),
					count: countStr[0],
					uploader: config.uploader,
					download: 0
				});

				if (wordbank.category != '考试词表') {
					return;
				}
				wordbank.save(function(err,word){
					if (err) {
						return console.log(err);
					}
					console.log(word);
				});
				loadWordById(classId);
				// wordbankList.push(wordbank);
				// console.log(wordbank);
			}
				// console.log(length);
		});
	});

}

function loadWordById(classId){
	wordCrawler.getCourseByClassId(classId);
}

// function readFile(){
// 	fs.readFile('wordbank.html',function(err,data){
// 		if (err) {
// 			console.log(err);
// 			return err;
// 		}
// 		parseHtml(data.toString());
// 	});
// }


getWordbankList();

