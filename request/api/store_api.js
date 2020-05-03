// 引入  用来发送请求的方法  需要将路径补全
import { getData, postData, deleteData, putData } from '../index.js'

// 暴露接口  将接口集中管理

// 测试接口
export const get_tagCate = (params) => {
  return getData('/forum/category',params)
}

// 发布需求
export const put_demand = (params) => {
  return putData('/goods/demand',params)
}
