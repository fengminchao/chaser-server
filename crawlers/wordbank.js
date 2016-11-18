var cheerio = require('cheerio');
var request = require('superagent');
var fs = require('fs');

function getWordbanList(){
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

function parseHtml(text){
	var $ = cheerio.load(text);
	var item = [];
	// var li = $('.cl li').text();
	// console.log(li);
	// $('.cl #mainwordlist li').filter('0').attr('has_child').each(function(id,element){
	// 	// var $element = $('h3',element).text();
	// 	// console.log($element);
	// 	// var $element = $(element).find('h3').text();
	// 	// console.log($element);
	// 	// console.log($(element));
	// 	var $element = $('h4',element).text();
	// 	item.push($element);

	// 	// console.log(item.title);

	// });
	// var str = item.join(',');	
	// console.log(str);
	console.log($('.cl #mainwordlist li').filter(':header').text());
}

function readFile(){
	fs.readFile('index.html',function(err,data){
		if (err) {
			console.log(err);
			return;
		}
		// console.log(data.toString());
		parseHtml(data.toString());
	});
}

// getWordbanList();

readFile();