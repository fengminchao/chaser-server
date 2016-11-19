// var Test = {}; 

// Test.printHello = function(){
// 	console.log('hello');
// }

// var str = '单词书 341';
// str = str.match(/[0-9]+/);
// console.log(str[0]);
// var str = 'For more information, see Chapter 3.4.5.1';
// var re = [0-9]*;
// var found = str.match(re);

// console.log(found);
// module.exports = Test;


// var WordModel = require('./').Word;

// var word = new WordModel({
// 	classId: 3,
// 	courseId: 3,
// 	word: 'cat',
// 	phonetic: 'cat',
// 	explain: '猫'
// });

// word.save(function(err,word){
// 	if (err) {
// 		return console.log(err);
// 	}
// 	console.log(word);
// });

// WordModel.find({classId: 3},function(err,words){
// 	if (err) {
// 		return console.log(err);	
// 	}

// 	console.log(words);
// })

var async = require('async');

var q = async.queue(function(task, callback) {
    console.log('worker is processing task: ', task.name);
    task.run(callback);
}, 2);

/**
 * 监听：如果某次push操作后，任务数将达到或超过worker数量时，将调用该函数
 */
q.saturated = function() {
    console.log('all workers to be used');
}

/**
 * 监听：当最后一个任务交给worker时，将调用该函数
 */
q.empty = function() {
    console.log('no more tasks waiting');
}

/**
 * 监听：当所有任务都执行完以后，将调用该函数
 */
q.drain = function() {
    console.log('all tasks have been processed');
}

function log(s){
	console.log(s);
}

q.push([
    {
        name:'t3', run: function(cb){
            console.log('t3 is running, waiting tasks: ', q.length());
            t.fire('t3', cb, 300); // 300ms后执行
        }
    },{
        name:'t4', run: function(cb){
            console.log('t4 is running, waiting tasks: ', q.length());
            t.fire('t4', cb, 500); // 500ms后执行
        }
    },{
        name:'t5', run: function(cb){
            log('t5 is running, waiting tasks: ', q.length());
            t.fire('t5', cb, 100); // 100ms后执行
        }
    },{
        name:'t6', run: function(cb){
            log('t6 is running, waiting tasks: ', q.length());
            t.fire('t6', cb, 400); // 400ms后执行
        }
    }
], function(err) {
    log('err: ',err);
});
