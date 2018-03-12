var express = require('express')
var router = express.Router()
var db = require('./db')
var fs = require('fs');
//const check = require('./check')
//const checkLogin = check.checkLogin
//const checkNotLogin = check.checkNotLogin


// 储存用户名密码
router.post('/api/admin/signup', function (req, res) {
		console.log("储存用户名密码")
		console.log(req.body.userInfo)
  new db.User(req.body.userInfo).save(function (err) {
    if (err) {
      res.status(500).send() 
      return
    }
    res.cookie('name',req.body.userInfo);
    res.send()
  })
})

// 登录
router.post('/api/admin/signin', function (req, res) {
	console.log("登录")
  // req.session.user = req.body.userInfo
  res.cookie('name',req.body.userInfo);
  res.send()
})

// 根据用户名获取用户
router.get('/api/admin/getUser', function (req, res) {
	console.log("根据用户名获取用户")
	console.log(req.query.name)
  db.User.find({"name": req.query.name}, function (err, data) {
       if (data.length){
            res.send('1');
        }else {
            res.send('0');
        }
  })
})

//验证是否登陆
router.get('/api/admin/checklogin',function (req, res) {  
	var name = req.cookies.name
    if(name) {
        res.send('1');
    }else{
        res.send('0');
    }  
 
});

// 获取所有文章
router.get('/api/articleList', function (req, res) {
		console.log("获取所有文章")
  db.Article.find({}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.json(docs)
  })
})

// 文章详情页
router.get('/api/articleDetail', function (req, res) {
	console.log("文章详情页")
	console.log(req.query.id)
  db.Article.findOne({ _id: req.query.id }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)  
    console.error(docs)
  })
})

// 文章保存
router.post('/api/admin/saveArticle', function (req, res) {
	console.log('文章保存')
  new db.Article(req.body.articleInformation).save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

// 文章更新
router.post('/api/admin/updateArticle', function (req, res) {
	console.log('文章更新')
  let info = req.body.articleInformation
  db.Article.find({_id: info._id}, function (err, docs) {
    if (err) {
      return
    }
    docs[0].title = info.title
    docs[0].date = info.date
    docs[0].content = info.content
    docs[0].gist = info.gist
    docs[0].labels = info.labels
    db.Article(docs[0]).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })
  })
})

// 文章删除
router.post('/api/admin/deleteArticle', function (req, res) {
console.log('文章删除')
  db.Article.remove({_id: req.body._id}, function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

module.exports = router