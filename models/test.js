var Test = {}; 

Test.printHello = function(){
	console.log('hello');
}

var str = '单词书 341';
str = str.match(/[0-9]+/);
console.log(str[0]);
// var str = 'For more information, see Chapter 3.4.5.1';
// var re = [0-9]*;
// var found = str.match(re);

// console.log(found);
// module.exports = Test;