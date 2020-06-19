// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  releaseErrand_pay
} from '../../../request/api/store_api.js'

import {
  
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
    id: '',
    money:''
  },
  // 支付
  async wx_pay () {
    const { id } = this.data
    const { data } = await releaseErrand_pay(id)
    if (data.code !== 200) {
      wx.showToast({
        title: '未知错误',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
        
      return 
    }
    // 成功
    // Dialog
    Dialog.alert({
      title: '提示',
      message: '您已成功支付,请保持手机畅通,很快会有接单人联系你呢!!!',
      asyncClose: true
    })
    .then(() => {
      clearTimeout(time)
      const time = setTimeout(() => {
        // this.navigateBackFunc()
        wx.redirectTo({
          url: '/suppages/mine/errand_mine_issue/errand_mine_issue'
        });
          
        Dialog.close();
      }, 1000);
    })
  },
  // // 跳转到上一个页面
  // navigateBackFunc() {
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id,money } = options
    this.setData({
      id,money
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