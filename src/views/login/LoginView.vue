<template>
  <div class="loginForm">
    <!-- 顶部标题 -->
    <div class="topTitle">伙管会后台管理系统</div>
    <!-- elementPlus登录表单部分-开始 -->
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="ruleForm">
      <!-- 账号输入框 -->
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" minlength="6" maxlength="12"  placeholder="学号/工号" :clearable="true" />
      </el-form-item>
      <!-- 密码输入框 -->
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" maxlength="6" placeholder="密码" show-password :clearable="true" />
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button :disabled="btnBool" type="primary" class="loginBtn"
          @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- elementPlus表单部分-结束 -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { checkUsername, checkPwd } from '../../utils/verification'
import _axios from '../../utils/_axios'
import apiUrl from '../../api/apiUrl'
import useMd5 from '../../hooks/useMd5'
import { useRouter } from 'vue-router'

const router = useRouter()

// elementPlus表单部分-开始 
const ruleFormRef = ref<FormInstance>()
// 验证账号格式
const checkUserName = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('账号不能为空！！！'))
  } else if (checkUsername(value)) {
    callback(new Error('账号格式错误应为6-12位数字！！！'))
  } else {
    callback()
  }
}
// 验证密码格式
const checkPassword = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空！！！'))
  } else if (checkPwd(value)) {
    callback(new Error('密码格式错误应为6位数字！！！'))
  } else {
    callback()
  }
}
// 定义变量用于登录表单输入框 v-model 双向绑定
const ruleForm = reactive({
  username: '',
  password: ''
})
// 验证登录表单是否为空，表单为空登录按钮不能点击
let btnBool = ref(true)
watch(ruleForm, (newval) => {
  if (newval.username !== '' && newval.password !== '') {
    btnBool.value = false
  } else {
    btnBool.value = true
  }
})
// elementPlus代码
const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: checkPassword, trigger: 'blur' }],
  username: [{ validator: checkUserName, trigger: 'blur' }],
})
// 登录提交处理方法
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 发送登录请求
      _axios.get(`${apiUrl.userList}?username=${ruleForm.username}&pwd=${useMd5(ruleForm.password).value}`).then((res: any) => {
        // 判断请求返回结果的长度是否不等于 0
        if (res.data.length !== 0) {
          localStorage.setItem('token', useMd5(ruleForm.password).value)
          localStorage.setItem('id', res.data[0].id)
          router.push('/home')
          // ElMessage({
          //   message: '登录成功',
          //   type: 'success',
          // })
        } else {
          ElMessage.error('登录失败！')
        }
      })
    } else {
      ElMessage.error('提交失败！')
      return false
    }
  })
}
// elementPlus表单部分-结束
</script>

<style lang="scss">
.loginForm {
  $radius: 4px;
  border: 1px solid skyblue;
  border-radius: $radius;
  width: 30%;
  margin: 10% auto;
  text-align: center;

  .topTitle {
    $height: 60px;
    border-radius: $radius $radius 0px 0px;
    height: $height;
    line-height: $height;
    font-size: 20px;
    background-color: skyblue;
    color: #fff;
  }
  .ruleForm {
    width: 75%;
    margin: 3% auto;

    .loginBtn {
      width: 100%;
      display: block;
      margin-top: 5px;
    }
  }
}
</style>