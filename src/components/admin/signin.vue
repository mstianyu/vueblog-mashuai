<template>
  <div id="sign_wrap">
    <h1>后台管理</h1>
    <el-input v-model="name" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
    <el-button @click="signup">注册</el-button>
    <el-button type="primary" @click="signin">登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      return {
        name: '',
        password: '',
        hasName: false, // 用户名被占
      }
    },
    mounted: function () {
    },
    methods: {
      signup: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符')
          return
        }        
        
           this.$axios.get('/api/admin/getUser', {
				    params: {
				      name: this.name
				    }
				  })
           
           .then(res=>{
               var res = res.data;
               if (res==1) {
              _this.$message.error('该用户已存在')
              _this.name = '';
            }else {
              let obj = { 
                name: _this.name,
                password: _this.password
              }

              this.$axios({
				        method:'post',
				        url: '/api/admin/signup',
					      data: {
					          userInfo: obj
					      }
				     })
               .then(
                response => {
                  _this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                },
                response => console.log('注册失败' + response)
              )
            }            
          });
   
      },
      signin: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符')
          return
        }
          this.$axios.get('/api/admin/getUser', {
				    params: {
				      name: this.name
				    }
				  })   
            .then(res=>{
               var res = res.data;
               if (res==0) {
             _this.$message.error('用户名或密码不正确')
              _this.name = '';
            }
             else {
              let obj = {
                name: _this.name,
                password: _this.password
              }    
               this.$axios({
				        method:'post',
				        url: '/api/admin/signin',
					      data: {
					       userInfo: obj
					      }
				     })              
              .then(
                response => {
                  _this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  delete _this.password;
                  _this.$router.go(-1);
                  this.$store.commit("islogin",true)
                },
                response => console.log('登录失败'+response)
              )
            }
          },
          response => {
            _this.$message.error('该用户不存在')
            return
          }
        )
      }
    }
  }
</script>

<style>
  #sign_wrap {
    width: 300px;
    margin: 200px auto;
  }

  #sign_wrap h1 {
    color: #383a42;
    padding: 10px;
  }

  #sign_wrap div {
    padding-bottom: 20px;
  }
</style>