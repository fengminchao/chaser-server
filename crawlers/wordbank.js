var cheerio = require('cheerio');
var request = require('superagent');
var WordbankModel = require('')
// var fs = require('fs');

var wordbankList = [];

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
				var wordbank = {
					category: category,
					bankName: $(':header',element).text(),
					classId: $(element).attr('class_id'),
					count: countStr[0]
				};
				console.log(wordbank);



			}
				// console.log(length);
		});
	});

}

function readFile(){
	fs.readFile('wordbank.html',function(err,data){
		if (err) {
			console.log(err);
			return err;
		}
		// return data.toString();
		// console.log(data.toString());
		parseHtml(data.toString());
	});
}

// var content = readFile();
// console.log(content);

// getWordbanList();

// readFile();
getWordbankList();

