import regeneratorRuntime from '../../lib/runtime/runtime.js'

import { post_ToEmailCode } from '../../request/api/store_front_api.js'

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
    // 倒计时 3 * 60 * 1000
    time: '',
    email: '',
    password: '',
    secPassword: '',
    // 邮箱验证码
    code: '',
    // 本地判断是否显示密码输入框  默认不显示   确认验证码无误再显示密码框输入
    
    isPasswordInput:false
  },
  // 获取输入框中数据 到data中
  getInputData (e) {
    // console.log(e.currentTarget.dataset);
    const { name } = e.currentTarget.dataset
    // console.log(e.detail.value);
    const { value } = e.detail
    this.setData({
      [name]:value
    })
  },
  // 获取验证码 发送到邮箱中
  async getEmailCode () {
    const { email } = this.data
    if (!email.trim()) {
      wx.showToast({
        title: '邮箱不合法',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return 
    }
    var emreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    17
    if (emreg.test(email) == false) {
      // 不符合条件
      wx.showToast({
        title: '邮箱不合法',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return 
    }
    // 符合条件
    // 发起请求获取验证码 type传`1`  第一个参数传`2`
    const { data } = await post_ToEmailCode(1,email)
    console.log(data);
    if (data.code !== 200) {
      return 
    }
    wx.showToast({
      title: '发送成功',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: true
    });
      
    const time = 3 * 60 * 1000
    this.setData({
      time
    })
  },
  // 倒计时结束
  finishDown () {
    this.setData({
      time:''
    })
  },
  // 点击确定 提交验证码 是否和传到邮箱里面里面的一致
  submit_email_code () {
    // 如果验证码正确
    this.setData({
      isPasswordInput:true
    })
  },
  // 点击提交  将新的密码提交
  submit_password () {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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