import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// suppages/mine/store_orders/store_orders.js
import { getMyOrderList } from '../../../request/api/store_api.js'

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
    // tab 标签默认激活项 active
    active: 0,
    
    // 加载图片基地址
    imgURL:''
  },
  // 跳转订单详情页
  toOrdersDetail () {
    //
    console.log('触发了');
    wx.navigateTo({
      url: '../../../suppages/mine/store_orders_detail/store_orders_detail',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgURL
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})