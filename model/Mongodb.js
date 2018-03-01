var config = require('config-lite')(__dirname);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect(config.mongodb, function(err){
	if(err) {
		console.log(err);
	}
	console.log('数据库链接成功');
});
exports.mongoose = mongoose;