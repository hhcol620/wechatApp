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
  return getData(`/security/wx`,params)
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
// 首页的推荐  商品
export const get_recommend_offline = (pageSize,currentPage) => {
  return getData(`/goods/recommend/offline/${pageSize}/${currentPage}
  `)
}

// /goods/recommend/demand/{pageSize}/{currentPage}
// 首页的推荐 需求
export const get_demand_recommendOffline = (pageSize,currentPage) => {
  return getData(`/goods/recommend/demand/${pageSize}/${currentPage}
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
// 查看是否收藏  只要不是0就是收藏了
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
// 支付的最后一步
export const getOrderPayWx = (orderCode) => {
  return getData(`/order/pay/wx/${orderCode}`)
}

// 回复留言    productId       content    回复商品的时候   firstClassId parentId 这两个设置为-1
export const write_msg = (params) => {
  return postData(`/goods/goods/msg/write`,params)
}

// 搜索 参数 页面大小 当前页  priceorder 2升序 1降序 timeOrder 2升序 1降序
export const get_search_content = (pageSize, currentPage, keyword, priceMin, priceMax,tradeType,priceOrder,timeOrder) => {
  return getData(`/message/search/goods/list/${pageSize}/${currentPage}?keyword=${keyword}&priceMin=${priceMin}&priceMax=${priceMax}&tradeType=${tradeType}&priceOrder=${priceOrder}&timeOrder=${timeOrder}`)
}
// 商城首页的推荐 离线推荐
export const get_goods_recommend_offline = (pageSize, currentPage) => {
  return getData(`/goods/recommend/offline/${pageSize}/${currentPage}`)
}
// 举报  
// 获取举报的列表
export const get_report_list = () => {
  return getData(`/user/report`)
}
// 提交举报  type   targetId   customerId   reason   reportTypeIds  pics  这些都放到params
// type  1商品举报 2留言举报 3评价举报 4帖子举报 5需求举报
export const post_report = (params) => {
  return postData(`/user/report`,params)
}

// 根据用户id获取用户中心的信息
export const get_userCenter_ByUserId = (userId) => {
  return getData(`/goods/goods/es/center/${userId}`)
}
// 根据用户id获取用户发布的需求
export const get_user_release_demand = (pageSize,currentPage,userId) => {
  return getData(`/goods/goods/demand/user/${pageSize}/${currentPage}/${userId}  `)
}
// 根据用户id获取用户发布的商品
export const get_user_release_comm = (pageSize,currentPage,userId) => {
  return getData(`/goods/goods/es/user/${pageSize}/${currentPage}/${userId}`)
}
// 根据用户id获取用户的被评价记录
export const get_user_evaluate = (pageSize,currentPage,userId) => {
  return getData(`/order/evaluate/${pageSize}/${currentPage}/${userId}`)
}

// 获取广告 和学校通知  type 取1广告  2学校通知
export const get_propagate = (pageSize,currentPage,type) => {
  return getData(`/user/propagate/${pageSize}/${currentPage}/${type}`)
}
// 根据广告和学校通知的id获取详情
export const get_propagate_detail = (id) => {
  return getData(`/user/propagate/detail/${id}`)
}

// 获得 最新五个已经发放资金的申请
export const get_donation_finsh = (id) => {
  return getData(`/order/donation`)
}
// 根据id获得已经发放资金的申请详情   5-标识查看的申请已经完成，返回的信息中需要包含使用了哪些人的订单   2-标识查看正在审核的或者审核通过但是未转账的
export const get_donation_finsh_detail = (type,id) => {
  return getData(`/order/donation/detail/${type}/${id}`)
}

// 记录历史
export const get_add_history = (targetId) => {
  return getData(`/goods/record/browse/${targetId}`)
}
