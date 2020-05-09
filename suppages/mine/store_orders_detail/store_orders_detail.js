// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_evaluate_by_orderId
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


// suppages/mine/store_orders_detail/store_orders_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 3.5
  },
  // 评价星
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },

  // 根据订单id获取评价信息
  async getEvaluateByOrderId (orderId) {
    const res = await get_evaluate_by_orderId(orderId)
    console.log(res);
  },

  // 如果需要快速复制单号 在单号后面设置一个按钮 调用这个api wx.setClipboardData(Object object) 

  copy_orderCode(){
    wx.setClipboardData({
      data: '11111',
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
    // console.log(options.orderid);
    // 这个就是订单id
    const { orderid } = options
    this.getEvaluateByOrderId(orderid)
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