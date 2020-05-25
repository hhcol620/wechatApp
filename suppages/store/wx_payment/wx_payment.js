// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  
} from '../../../request/api/store_api.js'

import {
  getOrderPayWx
} from '../../../request/api/store_front_api.js'

import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

import {
  getTime
} from '../../../utils/getTime.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData


// suppages/store/wx_payment/wx_payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单号
    ordercode: '',
    // 支付金额
    paymentmoney: ''
  },
  async submit_pay () {
    const { ordercode } = this.data
    const { data } = await getOrderPayWx(ordercode)
    console.log(data);
    if (data.code !== 200) {
      Dialog.alert({
        message: `${data.text}`,
      }).then(() => {
        // on close
      });
      return 
    }
    Dialog.alert({
      message: '付款成功,可以在我的->商城订单中查看(仅供测试环境)',
    }).then(() => {
      // on close
    });
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { ordercode,paymentmoney } = options
    this.setData({
      ordercode,
      paymentmoney
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