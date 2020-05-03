// 引入  用来发送请求的方法  需要将路径补全
import { getData, postData, deleteData, putData } from '../index.js'

// 暴露接口  将接口集中管理

// 获取轮播图接口
export const get_swipers = (params) => {
  return getData('/home/swiperdata',params)
}
// 测试接口
export const get_tagCate = (params) => {
  return getData('/forum/category',params)
}

//根据商品id获得商品的简略信息
export const getProductBriefById = (productId) => {
  //goods/goods/es/brief/1
  return getData(`/goods/goods/es/brief/${productId}`)
}
