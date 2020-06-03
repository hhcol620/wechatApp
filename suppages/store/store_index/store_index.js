// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// 引入  用来发送请求的方法  需要将路径补全
import {
  getUserInfo
} from '../../../request/api/store_api.js'

import {
  get_goods_recommend_offline,get_demand_recommendOffline,get_swipers,get_add_swipers_history
} from '../../../request/api/store_front_api.js'

//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData


Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图跳转基地址
    to_base_url:'/pages/search_store/search_store?keyword=',
    swiperImgs: [],
    // 加载图片基地址
    imgURL: '',
    // 推荐的列表
    recommend_offline: [],
    // 请求推荐的分页 
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    // tab默认激活项
    active: 0
  },
  // 首页的推荐 商品的推荐
  async get_recommend_offline () {
    showLoading(this)
    const { pageSize,currentPage,recommend_offline } = this.data
    const { data } = await get_goods_recommend_offline(pageSize,currentPage)
    console.log(data);
    if (data.code !== 200) {
      hideLoading(this)
      // 获取推荐列表失败
      return 
    }
    let c_page = currentPage + 1
    let total = data.data.totalCount
    this.setData({
      currentPage: c_page,
      totalCount:total
    })
    let list = data.data.data
    list.forEach(async item => {
      const consumerInfo = await this.getUserInfoById(item.consumerId)
      item.consumerInfo = consumerInfo
      recommend_offline.push(item)
      this.setData({
        recommend_offline
      })
    })
    hideLoading(this)
  },
  // 首页的推荐  需求的推荐
  async get_demand_recommend_offline () {
    showLoading(this)
    const { pageSize,currentPage,totalCount,recommend_offline } = this.data
    const { data } = await get_demand_recommendOffline(pageSize,currentPage)
    console.log(data);
    if (data.code !== 200) {
      hideLoading(this)
      // 获取推荐列表失败
      return 
    }
    let c_page = currentPage+1
    this.setData({
      currentPage:c_page
    })
    let list = data.data.data
    list.forEach(async item => {
      const consumerInfo = await this.getUserInfoById(item.consumerId)
      item.consumerInfo = consumerInfo
      item.mainPicUrl = item.mainPic
      recommend_offline.push(item)
      this.setData({
        recommend_offline
      })
    })
    hideLoading(this)
  },
  // 根据用户id获得用户信息
  async getUserInfoById(consumerId) {
    const {
      data
    } = await getUserInfo(consumerId)
    // console.log(data.data);
    return data.data
  },
  // 用户点击tab
  async tabChange (e) {
    // console.log(e);
    const { index } = e.detail
    console.log(index);
    // 将index 赋值给active 保存一下
    this.setData({
      active: index,
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      recommend_offline: [],
    })
    if (index == 0) {
      await this.get_recommend_offline()
    } else if (index == 1) {
      await this.get_demand_recommend_offline()
    }
  },
  // 获取轮播图
  async getSwipers () {
    let pageSize = 6, currentPage = 1
    
    const { data } = await get_swipers(pageSize,currentPage)
    // console.log(data);

    if (data.code !== 200) {
      return 
    }
    let list = data.data.data
    console.log(list);
    let arr = list.map((v, i) => {
      let id = v.id
      let image_src = v.imgUrl
      let keywords = v.param
      return {id,image_src,keywords}
    })
    // console.log(arr);
    this.setData({
      swiperImgs:arr
    })
  },
  // 记录轮播图点击
  async swiper_record_click (e) {
    // console.log('e',e);

    const id = e.detail
    const { data } = await get_add_swipers_history(id)
    console.log('data',data);
  },
  // 触底加载下一页
  async reachBottom () {
    const index = this.data.active
    const { pageSize, currentPage, totalCount } = this.data
    if (currentPage > Math.ceil(totalCount / pageSize)) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }
    if (index == 0) {
      await this.get_recommend_offline()
    } else if (index == 1) {
      await this.get_demand_recommend_offline()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgURL
    })
    this.get_recommend_offline()
    this.getSwipers()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.reachBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})