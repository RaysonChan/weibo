<template>
    <div class="page-reg">
        <div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>用户名</label>
					<input id='account' type="text" v-model="name" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>邮箱</label>
					<input id='email' type="email" v-model="email" class="mui-input-clear mui-input" placeholder="请输入邮箱">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" v-model="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
				<div class="mui-input-row">
					<label>确认密码</label>
					<input id='password_confirm' type="password" v-model="confirmPwd" class="mui-input-clear mui-input" placeholder="请确认密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='reg' class="mui-btn mui-btn-block mui-btn-warning" @click="register(name,email,password,confirmPwd)">注册</button>
			</div>
		</div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                name:'',
                email:'',
                password:'',
                confirmPwd:''
            }
        },
        methods:{
            register(name,email,password,confirmPwd){
                if(!(this.name && this.email)){
                    alert('用户名或密码不能为空！');
                    return;
                }
                if(password == confirmPwd){
                    this.axios.post('/api/me/register',{
                        name:this.name,
                        email:this.email,
                        password:this.password
                    }).then((res)=>{
                        alert(res.data);
                        sessionStorage.setItem('name',this.name);
                        this.$store.commit('setLogin',{isLogin:true});
                        this.$router.push('/');
                    })
                }else{
                    alert('俩次输入的密码不一样，请重新输入！');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
            .area {
				margin: 20px auto 0px auto;
			}
			.mui-input-group:first-child {
				margin-top: 20px;
			}
			.mui-input-group label {
				width: 28%;
			}
			.mui-input-row label~input,
			.mui-input-row label~select,
			.mui-input-row label~textarea {
				width: 72%;
			}
			.mui-checkbox input[type=checkbox],
			.mui-radio input[type=radio] {
				top: 6px;
			}
			.mui-content-padded {
				margin-top: 25px;
			}
			.mui-btn {
				padding: 10px;
			}
</style>
