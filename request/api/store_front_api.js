// 引入  用来发送请求的方法  需要将路径补全
import { getData, postData, deleteData, putData } from '../index.js'
// 暴露接口  将接口集中管理

// 账号注册

// 账号密码登陆  // email password
export const post_login = (params) => {
  return postData(`/security/login`,params)
}
// 登陆验证  验证码 登陆位置
export const get_login_code = (email) => {
  return getData(`/security/sendCode/${email}`)
}
// 验证码登陆 loginName     emailVerifyCode 
export const post_emailCodeLogin = (params) => {
  return postFormData(`/security/emailCodeLogin`,params)
}

// 找回密码

// 注册  
// 发送邮箱验证码   type  1注册 2登陆
export const post_ToEmailCode = (type,email) => {
  return getData(`/security/sendCode/${type}/${email}`)
}

// 获取猜你喜欢的 根据商品id
export const get_recommend_byProductId = (pageSize,currentPage,productId) => {
  return getData(`/goods/recommend/content/${pageSize}/${currentPage}/${productId}
  `)
}
// 首页的推荐
export const get_recommend_offline = (pageSize,currentPage,productId) => {
  return getData(`/goods/recommend/offline/${pageSize}/${currentPage}
  `)
}