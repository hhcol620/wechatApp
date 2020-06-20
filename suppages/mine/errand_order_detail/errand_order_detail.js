// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getErrandOrder_detail,getErrand_detail,getUserInfo,get_errand_evaluate
} from '../../../request/api/store_api.js'

import {
  post_report
} from '../../../request/api/store_front_api.js'

import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast.js';

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
    order_detail: {},
    // 订单id
    orderId:''
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
    let evaInfo = await get_errand_evaluate(id)
    let evaluateInfo = evaInfo.data.data||'还没有评价'
    const userInfo = await this.get_userInfo(data.data.publisherId)
    const obj = data.data
    obj.detailInfo = res 
    obj.publishInfo = userInfo
    obj.evaluateInfo = evaluateInfo
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
  // 复制订单号
  copy_orderCode (e) {
    const { code } = e.currentTarget.dataset
    wx.setClipboardData({
      data: code,
      success: (result) => {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 根据用户id获得发布者信息
  // 根据用户id获得用户信息
  async get_userInfo (userId) {
    const { data } = await getUserInfo(userId)
    if (data.code !== 200) {
      return
    }
    const Info = data.data
    // console.log(Info);
    return Info
  },
  // 点击了申诉
  appeal_evaluate () {
    const { orderId } = this.data
    Dialog.confirm({
      title: '提示',
      message: '如果您对这个跑腿订单订单有异议,请您点击确定',
    })
      .then(async () => {
        const obj = {
          type:6,
          targetId: orderId
        }
        const { data } = await post_report()
        if (data.code !== 200) {
          return
        }
        Toast.success('申诉提交成功,我们会尽快联系您的')
      })
      .catch(() => {
        // on cancel
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    this.setData({
      orderId:id
    })
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