<template>
  <div class="index">
    <div v-if="loginStatus" class="window">
      <div>
        <div class="title">
          <span>登录</span>
        </div>
        <div class="input">
          <span class="little-title">账号</span>
          <el-input style="width: 250px;" v-model="user_id" placeholder="请输入账号"></el-input>
        </div>
        <div class="input">
          <span class="little-title">密码</span>
          <el-input style="width: 250px;" v-model="password" placeholder="请输入密码" type="password"></el-input>
        </div>
        <div class="buttons">
          <div style="margin: 0 20px 0 0;" class="button" @click="login">
            <span>点击登录</span>
          </div>
          <div class="button" @click="loginStatus = !loginStatus; user_id = ''; password = ''">
            <span>点击注册</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="window">
      <div>
        <div class="title">
          <span>注册</span>
        </div>
        <div class="input">
          <span class="little-title">账号</span>
          <el-input style="width: 250px;" v-model="register_user_id" placeholder="请输入注册的账号"></el-input>
        </div>
        <div class="input">
          <span class="little-title">密码</span>
          <el-input style="width: 250px;" v-model="register_password" placeholder="请输入注册的密码" type="password"></el-input>
        </div>
        <div class="buttons">
          <div style="margin: 0 20px 0 0;" class="button"
            @click="loginStatus = !loginStatus; register_user_id = ''; register_password = ''">
            <span>返回</span>
          </div>
          <div class="button" @click="register">
            <span>点击注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userLoginAPI, userRegisterAPI } from '../../api/user'
import router from '../../router';
import { ElNotification } from 'element-plus'

// 定义变量
let loginStatus = ref<boolean>(true)
let user_id = ref<string>('')
let password = ref<string>('')
let register_user_id = ref<string>('')
let register_password = ref<string>('')

// 定义函数

// 登录函数
const login = () => {
  console.log(user_id.value, password.value)
  if (user_id.value === '' || password.value === '') {
    ElNotification({
      title: '登录失败！',
      message: '账号/密码尚未填写完成！',
      type: 'error'
    })
  } else {
    userLoginAPI({ user_id: user_id.value, password: password.value }).then((res: any) => {
      if (res.data.result_code === 1) {
        ElNotification({
          title: '登录失败！',
          message: res.data.result_msg,
          type: 'error'
        })
      } else {
        ElNotification({
          title: '登录成功！',
          type: 'success'
        });
        sessionStorage.setItem('user_info', JSON.stringify(res.data.data))
        user_id.value = '';
        password.value = '';
        router.push({
          path: '/student'
        });
      }
    })
  }
}
// 注册函数
const register = () => {
  console.log(register_user_id.value, register_password.value)
  if (register_user_id.value === '' || register_password.value === '') {
    ElNotification({
      title: '注册失败！',
      message: '账号/密码尚未填写完成！',
      type: 'error'
    })
  } else {
    userRegisterAPI({ user_id: register_user_id.value, password: register_password.value }).then((res: any) => {
      console.log(res.data)
      if (res.data.result_code === 1) {
        ElNotification({
          title: '注册失败！',
          message: res.data.result_msg,
          type: 'error'
        })
      } else {
        ElNotification({
          title: '注册成功！',
          message: '赶紧去登录吧！',
          type: 'success'
        })
        register_user_id.value = '';
        register_password.value = '';
        loginStatus.value = !loginStatus.value
      }
    })
  }
}
</script>

<style scoped lang="less">
.index {
  position: relative;
  width: 100%;
  height: 1000px;
}

.window {
  position: relative;
  margin: 200px auto 0;
  padding: 20px;
  width: 360px;
  height: 360px;
  background-color: #fff;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  div {
    width: 100%;

    .title {
      width: 100%;
      display: flex;
      justify-content: center;

      span {
        position: relative;
        font-size: 30px;
        font-weight: bold;
      }
    }

    .input {
      position: relative;
      width: 90%;
      margin: 30px auto 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 18px;
      }
    }

    .buttons {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 60px auto 0;

      .button {
        position: relative;
        width: max-content;
        padding: 10px 20px;
        background-color: aqua;
        border-radius: 100px;
        cursor: pointer;
      }
    }
  }
}

.window:hover {
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.32);
}
</style>