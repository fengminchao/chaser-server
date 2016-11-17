# chaser api
搜索单词
http://www.iciba.com/index.php?a=getWordMean&c=search&list=1%2C3%2C4%2C8%2C9%2C12%2C13%2C15&word=cat&_=1479276597365&callback=jsonp7
搜索句子
http://www.iciba.com/index.php?a=getWordMean&c=search&list=1%2C3%2C4%2C8%2C9%2C12%2C13%2C15&word=i+have+a+pan&_=1479276739823&callback=jsonp16

## mock

## 获取在线词库
- url:/api/wordbank
- method: GET

- return:

```
[
  {
    "id":int,
    "name":str,
    "uploader":str,
    "summary":str,
    "category":str,
    "download":int
  }
]
```

## 获取词库内容
- url:/api/wordbank/:id
- method: GET

- return:

```
[
  {
	"order":int,
	"word":str,
	"phonetic":str,
	"explain":str	
  }
]
```