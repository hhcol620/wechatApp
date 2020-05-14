import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// suppages/mine/store_orders/store_orders.js
import {
  getAllErrandList
} from '../../../request/api/store_api.js'

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
    active: 'new',
    // 跑腿信息列表
    errandList: [],
    // 页面大小  
    pageSize: 10,
    // 当前页
    currentPage: 1
  },
  // 获取跑腿信息
  async getErrandList(pageSize, currentPage, typ) {
    const {
      data
    } = await getAllErrandList(pageSize, currentPage, typ)
    // console.log(data);
    if (data.code !== 200) {
      // 失败
      return 
    }
    // 成功
    this.setData({
      errandList: data.data.data
    })
  },
  // tab 切换
  tabChange (e) {
    this.setData({
      errandList: [],
      // 页面大小  
      pageSize: 10,
      // 当前页
      currentPage: 1
    })
    const { pageSize, currentPage } = this.data
    // console.log(e);
    // 获取标识符 如果根据标识符发起不同的请求
    const {
      name
    } = e.detail
    if (name === 'new') {
      // typ 设置为1
    this.getErrandList(pageSize, currentPage,1)

    } else if (name === 'price') {
      // typ设置为2
    this.getErrandList(pageSize, currentPage,2)
    }
  },
  // 跳转发布页
  releaseFunc () {
    wx.navigateTo({
      url: '../../release/errand/errand',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { pageSize, currentPage } = this.data
    // 默认第三个参数设置为1
    this.getErrandList(pageSize, currentPage,1)
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