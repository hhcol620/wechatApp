// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  finishErrandOrder
} from '../../../request/api/store_api.js'

import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData




// suppages/mine/store_write_evaluate/store_write_evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    // 跑腿订单id
    id: '',
    // 接单人的id
    holderid: '',
    // 订单编号
    ordercode: '',
    // 评价的内容
    evaluate_content: '',
    // 文本框自动获得焦点
    isfocus:false
  },
  // 切换选择满意或者不满意
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  // 输入框中的数据
  // 获取输入框中的数据
  getInputData (e) {
    // console.log(e.detail.value);
    const inputContent = e.detail.value
    this.setData({
      evaluate_content:inputContent
    })
  },
  // 提交评价页面
  async submit_btn () {
    const { id, holderid, ordercode, evaluate_content, radio } = this.data
    if (radio == 2&&!evaluate_content.trim()) {
      Toast('请输入是什么原因呢')
      this.setData({
        isfocus: true
      })
      return
    }
    let obj = {
      errandOrderId: id,
      holderId: holderid,
      errandOrderCode: ordercode, evaluateContent: evaluate_content,
      evaluate: radio-0
    }
    const { data } = await finishErrandOrder(id,obj)
    if (data.code !== 200) {
      Toast.fail('评价失败')
      return 
    }
    Toast.success('评价成功')
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    },2000)
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { id, holderid, ordercode } = options
    this.setData({
      imgURL,
      id, holderid, ordercode
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