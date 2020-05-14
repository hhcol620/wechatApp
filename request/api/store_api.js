// 引入  用来发送请求的方法  需要将路径补全
import { getData, postData, deleteData, putData,postDataRealName } from '../index.js'

// 暴露接口  将接口集中管理
// 获取分类数据
export const getCategoryTree = () => {
  return getData(`/goods/goods/category/tree`)
}
// 获得用户信息  根据用户的id
export const getUserInfo = (userId) => {
  return getData(`/user/user/${userId}`)
}

// 获取用户浏览记录
export const getUserRecodrByPage = (pageSize, currentPage) => {
  return getData(`/goods/record/${pageSize}/${currentPage}`)
}

// 分页查看自己发布的需求
export const get_demandList = (pageSize,currentPage) => {
  return getData(`/goods/goods/demand/list/${pageSize}/${currentPage}`)
}

//获得自己的收藏列表
export const getMyProductCollectList = (pageSize, currentPage) => {
  return getData(`/goods/collect/list/${pageSize}/${currentPage}`)
}

// 发布需求
export const put_demand = (params) => {
  return putData('/goods/goods/demand',params)
}

// 删除用户自己发布的需求 根据id
export const delete_demand = (id) => {
  return deleteData(`/goods/goods/demand/${id}`)
}

// 根据用户id编辑需求  根据id
export const get_demandMessage = (id) => {
  return getData(`/goods/goods/demand/${id}`)
}

//获得自己的订单列表
export const getMyOrderList = (pageSize,currentPage, type) => {
  return getData(`/order/order/es/list/${type}/${pageSize}/${currentPage}`)
}
// 根据订单号查询订单的详情 type  1-作为卖家  2-作为买家 
export const getOrderDetail = (type,id) =>{
  //todo  没测
  return getData(`/order/order/es/${type}/${id}`)
}

// 根据订单id查询评价
export const getEvaluateByOrderId = (orderId) =>{
  //todo  没测
  return getData(`/order/evaluate/byOrderId/${orderId}`)
}


// 分页查看自己发布商品
export const get_goodsList = (pageSize,currentPage) => {
  return getData(`/goods/goods/es/list/${pageSize}/${currentPage}`)
}
// 根据id值查看 商品信息
export const get_goodsInfo = (id) => {
  return getData(`/goods/goods/es/${id}`)
}
// 发布商品
export const put_goods = (params) => {
  return putData('/goods/goods/es',params)
}
// 编辑商品
export const put_goods_edit = (params) => {
  return putData(`/goods/goods/es/edit`,params)
}

// 根据商品id查询商品的留言信息 一级留言 parentId,firstClassId 两个都传0 请求一级留言下的留言 请求 id 为2的一级留言下的留言   这个parentId,firstClassId 分别为0 和 2
export const get_leave_message_first = (pageSize,currentPage,goodsId,parentId,firstClassId) => {
  return getData(`/goods/goods/msg/${pageSize}/${currentPage}/${goodsId}/${parentId}/${firstClassId}`)
}

// 获得自己的基本信息
export const getMyInfo = () => {
  return getData("/user/user/detail")
}
//修改用户信息
export const editUserInfo =  (params) =>{
  return request("post", "/user/user/edit", params)
} 

// 获取消息通知
export const getSystemNews = (pageSize, currentPage) => {
  return getData(`/message/msg/systemNews/${pageSize}/${currentPage}`)
}
// 获取@我的消息
export const reply_to_me = (pageSize, currentPage) => {
  return getData(`/message/msg/atMe/${pageSize}/${currentPage}`)
}

//根据索引删除浏览 记录
export const deleteBrowsingByIndex = (index) => {
  return deleteData(`/goods/record/${index}`)
}

//清空自己的浏览记录
export const deleteOwnAllBrowsing = () => {
  return deleteData("/goods/record")
}


// 分页查看自己评价  type 传 1
export const get_evaluate = (pageSize,currentPage) => {
  return getData(`/order/evaluate/list/${pageSize}/${currentPage}/1`)
}

// 根据评论的id删除自己的评价
export const delete_evaluate = (orderId) => {
  return deleteData(`/order/evaluate/${orderId}
  `)
}

// 根据订单的id发布评价 入口在我的订单里面
export const post_evaluate = (orderId,params) => {
  return postData(`/order/evaluate/${orderId}`,params)
}

// 收藏
export const get_collect = (type,id) => {
  return getData(`/goods/collect/${type}/${id}`)
}
//  取消收藏
export const delete_collect = (id) => {
  return deleteData(`/goods/collect/${id}`)
}
// 取消收藏全部
export const delete_collect_all = () => {
  return deleteData(`/goods/collect/all`)
}
// 查看是否收藏  data的1标识收藏了，0标识没有收藏
export const  isCollect = (type,id) => {
  return getData(`/goods/collect/state/${type}/${id}`)
}
// 搜索 参数 页面大小 当前页
export const get_search_content = (pageSize, currentPage, keyword) => {
  return getData(`search/goods/list/${pageSize}/${currentPage}?keyword=${keyword}`)
}


//根据类型查看所有的跑腿列表   typ取值:1-时间降序  2-金额降序
export const getAllErrandList = (pageSize, currentPage, typ) => {
  return getData(`/goods/errand/${typ}/${pageSize}/${currentPage}`)
}
//根据跑腿id查详细信息
export const getErrand_detail = (id) => {
  return getData(`/goods/errand/detail/${id}`)
}
//发布跑腿
export const releaseErrand = (params) => {
  return postData("/goods/errand", params)
}

//接跑腿订单 接单成功之后会返回一个订单编号
export const receiveErrand = (id, version) => {
  return getData(`/order/order/errand/${id}/${version}`)
}

//根据上面这个接口返回的订单id过几秒钟访问该接口查看是否接单成功
export const getOrderState = (code)=> {
  return getData(`/order/order/errand/state/${code}`)
}

//删除跑腿订单  typ取值 5-删除发布的(作为卖家) 6-删除接单(作为买家)
export const deleteErrandOrder = (typ, id) => {
  return deleteData(`/order/order/errand/${typ}/${id}`)
}

//查看跑腿订单信息 我发布的 list state 2 没有被接单的 3已经被接单 4 已完成
export const getMyErrandOrder = (pageSize,currentPage, state)=> {
  return getData(`/goods/errand/list/${pageSize}/${currentPage}/${state}`)
}
// 查看订单列表 跑腿    type 1 自己发布的  2自己接的  state 3未完成 4 已完成  
export const getErrandOrder = (pageSize, currentPage, type, state) => {
  return getData(`/order/order/errand/list/${pageSize}/${currentPage}/${type}/${state}`)
}

//获得已经转账的公益基金申请
export const getFinishDonation = (pageSize, currentPage)=> {
  return getData(`/order/donation/finish/${pageSize}/${currentPage}`)
}

//获得没有转账正在审核的公益基金申请
export const getUnfinishDonation = (pageSize, currentPage)=> {
  return getData(`/order/donation/unfinish/${pageSize}/${currentPage}`)
}

//typ取值5-标识查看的申请已经完成，返回的信息中需要包含使用了哪些人的订单   2-标识查看正在审核的或者审核通过但是未转账的
export const getDonationDetailById = (id, typ) => {
  return getData(`/order/donation/detail/${typ}/${id}`)
}

//获得用户的兴趣标签
export const getUserTag = () => {
  return getData("/user/interest")
}

//关注和取关兴趣标签  type:1-取关  2-关注
export const followInterestTag = (type ,id) => {
  return getData(`/user/interest/follow/${type}/${id}`)
}


//身份证认证   该请求必须是表单提交   并且图片参数名为file，填写的姓名参数为realName
export const userIdCardAuthen = (params) => {
  return postDataRealName("/security/identityCard", params)
}

//一卡通认证 要求同上
export const oneCardAuthen = (params) => {
  return postDataRealName("/security/oneCard", params)
}

// 判断用户的用户名和手机号是否唯一   params {type:"email",validValue:'1111@qq.com' }  还可以phoneNum,nickname,alipayNum 
export const checkData = (params) => {
  return postData("/user/user/check", params)
}






