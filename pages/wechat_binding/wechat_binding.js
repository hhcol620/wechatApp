import regeneratorRuntime from '../../lib/runtime/runtime.js'

import { get_Tobinding_WX_emailCode,post_Tobinding_WX } from '../../request/api/store_front_api.js'

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
    // 邮箱验证码
    email_code: '',
    // 临时凭证
    code:''
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
    const { data } = await get_Tobinding_WX_emailCode()
    console.log(data);
    if (data.code !== 200) {
      return 
    }
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true
    });
      
    const time = 3 * 60 * 1000
    this.setData({
      time
    })
    // 发送成功验证码  然后获取临时登陆凭证
    const {code} = await wx.login()
    console.log(code);
    this.setData({
      code
    })
  },
  // 倒计时结束
  finishDown () {
    this.setData({
      time:''
    })
  },
  // 点击确定 提交验证码 是否和传到邮箱里面里面的一致
  async submit_email_code () {
    const { email_code, code } = this.data
    if (!email_code.trim() || !code.trim()) {
      return
    }
    const obj = {
      code,
      bindEmailCode:email_code
    }
    showLoading()
    const { data } = await post_Tobinding_WX(obj)
    
    hideLoading()
    console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: '绑定失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return 
    }
    // 绑定成功
    wx.showToast({
      title: '绑定成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        },1500) 
      },
      fail: () => {},
      complete: () => {}
    });
      
     
    
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