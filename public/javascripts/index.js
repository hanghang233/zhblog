$(function(){
	var loginBtn = $('#login');
	var registerBtn = $('#register');

	/*切换登录注册*/
	$('.login-flag').on('click', function(){
		var $this = $(this);
		$this.siblings().removeClass('choosed').end().addClass('choosed');
		var index = $('.login-flag').index($this);

		$(".region:eq(" + index + ")").siblings().removeClass('dis-show').end().addClass('dis-show');
	})

	/*注册*/
	registerBtn.on('click', function(){
		var reg_name = $('#register_name').val();
		var reg_pass = $('#register_password').val();
		var reg_pass_again = $('#register_passagain').val();

		if(!reg_name){
			showMessage('请填写注册用户名');
			return;
		}
		if(reg_name.length > 6){
			showMessage('用户名不能超过6个字符');
			return;
		}
		if(reg_pass != reg_pass_again){
			showMessage('两次密码输入不一致');
			return;
		}
		var data = {
			'username': reg_name,
			'password': reg_pass
		}
		$.ajax({
			method: 'POST',
			url: '/users/signup',
			data: data,
			success: function(res){
				if(res.statuscode == '1'){
					showMessage('注册成功', 'home');
				}
			},
			error: function(err){
				console.log(err);
			}
		})
	})

	/*登录*/
	loginBtn.on('click', function(){
		var login_name = $('#login_name').val();
		var login_pass = $('#login_password').val();
		var data = {
			'username': login_name,
			'password': login_pass
		}
		$.ajax({
			method: 'GET',
			url: '/users/login',
			data: data,
			success: function(res){
				if(res.statuscode == '1'){
					showMessage('登录成功', 'home');
				}
			},
			error: function(err){
				console.log(err);
			}
		})
	})

	function showMessage(msg, flag) {
		$('#messageModal').modal('show');
		$('#message').text(msg);
		setTimeout(function(){
			$('#messageModal').modal('hide');
			if(flag == 'logout'){
				window.location.href = '/';
				return;
			}else if(flag == 'reload'){
				window.location.reload();
				return;
			}else if(flag == 'home'){
				window.location.href = '/home';
			}
		}, 1000)
	}
})