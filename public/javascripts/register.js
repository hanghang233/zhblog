$(function(){
	var registerBtn = $('#confirmRegister');

	registerBtn.on('click', function(){
		var nameVal = $('#name').val();
		var password = $('#password').val();
		var passwordAgain = $('#passwordAgain').val();
		if(!nameVal){
			showMsg('请填写姓名');
			return;
		}
		if(!password){
			showMsg('请填写密码');
			return;
		}
		if(!passwordAgain){
			showMsg('请填写确认密码');
			return;
		}
		if(passwordAgain != password){
			showMsg('确认密码不一致');
			return;
		}
		var data = {
			'username': nameVal,
			'password': password
		}
		$.ajax({
			url: '/user/signup',
			method: 'POST',
			data: data,
			success: function(res){
				if(res.statuscode == '1'){
					//showMsg('注册成功，正在跳转', true);
				}else{
					//showMsg(res.message);
				}
			},
			error: function(err){
				console.log(err);
			}
		})
	})
})