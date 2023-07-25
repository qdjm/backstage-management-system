// 校验账号为6-12位数字
function checkUsername(data: string) {
  const reg = /^\d{6,12}$/; 
  return !reg.test(data)
}
// 校验密码为6位数字
function checkPwd(data: string) {
  const reg = /^\d{6}$/;
  return !reg.test(data)
}

export {
  checkUsername,
  checkPwd
}
