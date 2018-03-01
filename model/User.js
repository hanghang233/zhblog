var mongodb = require('./Mongodb');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var Schema = mongodb.mongoose.Schema;
var UserSchema = new Schema({
	username: String,
	password: String,
	sex: 0,
	email: String,
	avatarImage: String
})
var User = mongodb.mongoose.model('User', UserSchema);
var UserDAO = function(){};

UserDAO.prototype.save = function(obj, callback) {
	User.findOne({'username': obj.username}, function(err, user){
		if(err){
			console.log(err);
		}
		if(user){
			var data = {
				'code': -1,
				'message': '用户已经注册',
			}
			callback(err, data);
		}else{
			var instance = new User(obj);
			//生成hash密码
			bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
				if(err){
					console.log(err);
				}
				bcrypt.hash(instance.password, salt, function(err, hash){
					if(err){
						console.log(err);
					}
					instance.password = hash;
					var data = {
						'code': '1',
						'message': '注册成功',
						'user': obj
					}
					instance.save(function(err){
						callback(err, data);
					})
				})
			})
		}
	})
}

UserDAO.prototype.getUser = function(parmas, callback){
	User.findOne(parmas, function(err, user){
		if(err){
			console.log(err);
		}
		callback(err, user);
	})
}

UserDAO.prototype.compare = function(parmas, callback){
	User.findOne({'username': parmas.username}, function(err, user){
		if(err){
			console.log(err);
		}
		if(user){
			bcrypt.compare(parmas.password, user.password, function(err, isMatch){
				if(err){
					console.log(err);
				}
				callback(err, isMatch, user);
			})
		}
	})
}

//更新用户资料
UserDAO.prototype.updateUser = function(parmas, callback){
	User
		.findByIdAndUpdate({'_id': parmas._id}, parmas.info, {'new':true})
		.exec(function(err, user){
			if(err) {
				console.log(err);
			}
			callback(err, user);
		})
}
module.exports = new UserDAO();