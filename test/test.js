// import filter from 'async/filter';
// var async = require('async');
// import detect from 'async/detect';
// var fs = require('fs');

// async.filter(['./file1.md','./file2.md','./file3.md'],function(filePath,callback){
// 	fs.access(filePath,function(err){
// 		callback(null,!err);
// 		console.console.log('access ok');
// 	});
// },function(err,results){
// 	if(err){
// 		console.console.log(err);
// 	}
// })


// async.detect(['file1.md','file2.md','file3.md'], function(filePath, callback) {
//     fs.access(filePath, function(err) {
//     	console.console.log('err');
//         callback(null, !err)

//     });
// }, function(err, result) {
//     // result now equals the first file in the list that exists
//     if (err) return console.console.log(err);

//     console.console.log('result is received');
// });


var async = require('async');



/**
 * 如果想对同一个集合中的所有元素都执行同一个异步操作，可以利用each函数。
 *
 * async提供了三种方式：
 * 1. 集合中所有元素并行执行
 * 2. 一个一个顺序执行
 * 3. 分批执行，同一批内并行，批与批之间按顺序
 *
 * 如果中途出错，则错误将上传给最终的callback处理。其它已经启动的任务继续执行，未启动的忽略。
 */
// each(arr, iterator(item, callback), callback(err))


var arr = [{name:'Jack', delay: 200},
           {name:'Mike', delay: 100},
           {name:'Freewind', delay: 300}];



/**
 * 分批执行，第二个参数是每一批的个数。每一批内并行执行，但批与批之间按顺序执行。
 */
async.eachLimit(arr, 2, function(item, callback) {
    console.log('1.5 enter: ' + item.name);
    setTimeout(function(){
        console.log('1.5 handle: ' + item.name);
        callback(null, item.name);
    }, item.delay);
}, function(err) {
    console.log('1.5 err: ' + err);
});
// 42.247> 1.5 enter: Jack
// 42.248> 1.5 enter: Mike
// 42.351> 1.5 handle: Mike
// 42.352> 1.5 enter: Freewind
// 42.461> 1.5 handle: Jack
// 42.664> 1.5 handle: Freewind
// 42.664> 1.5 err: undefined

/**
 * 如果中途出错，错误将马上传给最终的callback。同一批中的未执行完的任务还将继续执行，但下一批及以后的不再执行。
 */

// 42.248> 1.6 enter: Jack
// 42.248> 1.6 enter: Mike
// 42.352> 1.6 handle: Mike
// 42.462> 1.6 handle: Jack
// 42.462> 1.6 err: myerr