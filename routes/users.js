var express = require('express');
var router = express.Router();
 var User = require('../model/User.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册
router.post('/signup', function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	var parmas = {
		'username': username,
		'password': password
	};
	User.save(parmas, function(err, data){
		if(err){
			var data1 = {
				'statuscode': '-1',
				'message': '操作失败',
			}
		}else{
			if(data.code == '-1'){
				var data1 = {
					'statuscode': '-1',
					'message': data.message
				}
			}else {
				//req.session.user = data;
				var data1 = {
					'statuscode': '1',
					'message': '注册成功',
					'user': data.user
				}
			}
		}
		res.send(data1);
	})
})

//登录
router.get('/login', function(req, res, next){
	var username = req.query.username;
	var password = req.query.password;
	var data = {
		'username': username,
		'password': password
	}
	User.compare(data, function(err, isMatch, user){
		if(err){
			var data = {
				'statuscode': '-1',
				'message': '操作失败'
			}
		}else{
			if(isMatch){
				req.session.user = user;
				var data = {
					'statuscode': '1',
					'message': '操作成功',
					'data': user
				}
			}else{
				var data = {
					'statuscode': '-1',
					'message': '用户名或者密码不正常'
				}
			}
		}
		res.send(data);
	})
})

module.exports = router;
