var express = require('express');
var app = express();

var wordbank = [
{
	id:0,
	name:'主词库',
	uploader:'ybao',
	summary:'主要的词库',
	category:'main',
	download:10
},
{
	id:1,
	name:'四级词汇',
	uploader:'ybao',
	summary:'四级考试词汇',
	category:'考试必备',
	download:100
}
];

var main_word = [{
	order:0,
	word:'cat',
	phonetic:'xxx',
	explain:'猫'
}];

var level_word = [
{
	order:0,
	word:'dog',
	phonetic:'xxl',
	explain:'狗'
}];

console.log('app start')

app.get('/api/wordbank',function(req,res){
	console.log('wordback');
	res.statusCode = 200;
	res.send(wordbank);
});

app.get('/api/wordbank/:id',function(req,res){
	console.log('word');
	res.statusCode = 200;
	if (req.params.id == 0) {
		return res.send(main_word);
	}
	if (req.params.id == 1) {
		return res.send(level_word);
	}

});

app.get('/',function(req,res){
	console.log('hello');
	res.send();
})

app.listen(7000,function(){
	console.log('app is run on 7000');
});