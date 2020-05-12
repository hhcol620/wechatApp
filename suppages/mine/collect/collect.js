// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getMyProductCollectList,
  getUserInfo
} from '../../../request/api/store_api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData

// suppages/store/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  是否已经收藏了
    isCollect: false,
    collectList: [],
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    imgURL: ''
  },
  // 点击收藏按钮
  collectFunc() {
    const collect = !this.data.isCollect
    this.setData({
      isCollect: collect
    })
  },
  // 获取收藏列表
  async getCollectList() {
    const {
      pageSize,
      currentPage,
      collectList
    } = this.data
    const {
      data
    } = await getMyProductCollectList(pageSize, currentPage)
    if (data.code !== 200) {
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }
    const arrList = data.data.data
    arrList.forEach(async (item) => {
      // item.consumerId
      const res = await this.get_user_info(item.consumerId)
      item.consumerInfo = res
      console.log(item);
      collectList.push(item)
      this.setData({
        collectList
      })
    })


  },
  // 根据用户id  consumerId  获取用户信息
  async get_user_info(consumerId) {
    const {
      data
    } = await getUserInfo(consumerId)
    // console.log(data.data);
    const result = data.data
    return result
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollectList()
    this.setData({
      imgURL
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})