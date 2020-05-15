// 引入  用来发送请求的方法  需要将路径补全
import { getData, postData, deleteData, putData } from '../index.js'
// 暴露接口  将接口集中管理
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