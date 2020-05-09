// 引入  用来发送请求的方法  需要将路径补全
import { getData, postData, deleteData, putData } from '../index.js'

// 暴露接口  将接口集中管理
// 获取分类数据
export const getCategoryTree = () => {
  return getData(`/goods/goods/category/tree`)
}
// 获得用户信息  根据用户的id
export const getUserInfo = (userId) => {
  return getData(`/user/user/${userId}`)
}

export const getUserRecodrByPage = (pageSize, currentPage) => {
  return getData(`/goods/record/${pageSize}/${currentPage}`)
}

// 分页查看自己发布的需求
export const get_demandList = (pageSize,currentPage) => {
  return getData(`/goods/goods/demand/list/${pageSize}/${currentPage}`)
}

//获得自己的收藏列表
export const getMyProductCollectList = (pageSize, currentPage) => {
  //return getData()
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

export const getSystemNews = (pageSize, currentPage) => {
  return getData(`/message/msg/systemNews/${pageSize}/${currentPage}`)
}


// 分页查看自己评价  type 传 1
export const get_evaluate = (pageSize,currentPage) => {
  return getData(`/goods/goods/evaluate/list/${pageSize}/${currentPage}/1`)
}

// 根据评论的id删除自己的评价
export const delete_evaluate = (id) => {
  return deleteData(`/goods/goods/evaluate/${id}`)
}

// 根据订单的id发布评价 入口在我的订单里面
export const post_evaluate = (orderId) => {
  return postData(`/goods/goods/evaluate/${orderId}`)
}

// 搜索 参数 页面大小 当前页
export const get_search_content = (pageSize, currentPage, keyword) => {
  return getData(`goods/list/${pageSize}/${currentPage}?keyword=${keyword}`)
}


