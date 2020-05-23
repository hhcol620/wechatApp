// 引入  用来发送请求的方法  需要将路径补全
import { getData, postData, deleteData, putData, postFormData} from '../index.js'
// 暴露接口  将接口集中管理

// 账号注册
export const post_register = (code,params) => {
  return postData(`/user/user/register/${code}`,params)
}
// 判断用户的用户名和邮箱是否唯一   params {type:"email",validValue:'1111@qq.com' }  还可以phoneNum,nickname,alipayNum 
export const checkData = (params) => {
  return postData("/user/user/check", params)
}

// 账号密码登陆  // email password
export const post_login = (params) => {
  return postFormData(`/security/password`,params)
}
// 登陆验证  验证码 登陆位置
export const get_login_code = (email) => {
  return getData(`/security/sendCode/${email}`)
}
// 验证码登陆 loginName     emailVerifyCode 
export const post_emailCodeLogin = (params) => {
  return postFormData(`/security/emailCodeLogin`,params)
}

// 找回密码 params中 code   password  email
export const post_resetPwd = (params) => {
  return postData(`/user/user/resetPwd`,params)
}
// 注册  
// 发送邮箱验证码   type  1注册 2登陆 3找回密码
export const post_ToEmailCode = (type,email) => {
  return getData(`/security/sendCode/${type}/${email}`)
}
// 微信绑定 
// 微信绑定里面获取验证码
export const get_Tobinding_WX_emailCode = (params) => {
  return getData(`/user/wx`,params)
}
// 绑定微信  提交两个参数  params  一个是微信的临时登陆凭证code 还有就是一个邮箱验证码bindEmailCode
export const post_Tobinding_WX = (params) => {
  return postData(`/user/wx/binding`,params)
}
// 微信登陆  code  临时登录凭证code
export const post_login_WX = (params) => {
  return postFormData(`/security/wxAppLogin`,params)
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

// 收藏商品 
export const get_collect = (type,id) => {
  return getData(`/goods/collect/${type}/${id}`)
}
// 取消收藏商品
export const delete_collect = (type,id) => {
  return deleteData(`/goods/collect/${type}/${id}`)
}
// 查看是否收藏   type 1 宝贝  2需求
// 查看是否收藏  data的1标识收藏了，0标识没有收藏
export const  isCollect = (type,id) => {
  return getData(`/goods/collect/state/${type}/${id}`)
}

// 支付 
// 获取orderCode 码
export const  getOrderCode = (params) => {
  return getData(`/order/order/es/code`)
}
// 根据商品id生成预订单
export const  postCreateOrder = (id,params) => {
  return putData(`/order/order/es/create/${id}`,params)
}

// 回复留言    productId       content    回复商品的时候   firstClassId parentId 这两个设置为-1
export const write_msg = (params) => {
  return postData(`/goods/goods/msg/write`,params)
}

// 搜索 参数 页面大小 当前页
export const get_search_content = (pageSize, currentPage, keyword) => {
  return getData(`/message/search/goods/list/${pageSize}/${currentPage}?keyword=${keyword}`)
}
