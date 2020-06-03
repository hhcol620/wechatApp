// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getErrandOrder_detail,getErrand_detail
} from '../../../request/api/store_api.js'


import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData




// suppages/mine/errand_order_detail/errand_order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单详情
    order_detail:{}
  },
  // 根据订单id  获取其详细信息
  async get_errand_order_detail (id) {
    showLoading(this)
    const { data } = await getErrandOrder_detail(id)
    hideLoading(this)
    // console.log(data);
    if (data.code !== 200) {
      return
    }
    const res = await this.getOrderDetail(id)
    const obj = data.data
    obj.detailInfo = res 
    // 获取数据成功
    this.setData({
      order_detail:obj
    })
  },
  // 根据跑腿的id获取详细信息
  async getOrderDetail (id) {
    const { data } = await getErrand_detail(id)
    console.log(data);
    if (data.code !== 200) {
      return
    }
    return data.data
  },
  // 赋值订单号
  copy_orderCode (e) {
    const { code } = e.currentTarget.dataset
    wx.setClipboardData({
      data: code,
      success: (result) => {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 1500,
          mask: true
        })
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    this.get_errand_order_detail(id)
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