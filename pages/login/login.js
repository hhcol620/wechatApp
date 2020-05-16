import regeneratorRuntime from '../../lib/runtime/runtime.js'

import { post_login,get_login_code,post_emailCodeLogin } from '../../request/api/store_front_api.js'

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
    // email password
    email: '',
    password: '',
    // 输入的验证码
    inputCode:'',
    // 显示验证码
    code: '',
    // 控制是密码登陆还是邮箱验证码登陆
    // passwordlogin
    isPasswordLogin: true
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
  // 账号密码登陆
  async post_login_password () {
    const { email, password, inputCode, code, isPasswordLogin } = this.data
    // 验证邮箱
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
    if (isPasswordLogin == true) {
      // 表示为账号密码登陆
      // 发起请求之前再判断code是否一致
      if (!email.trim() || !password.trim() || !inputCode.trim()) {
        // 判断都不能为空
        return
      }
      if (inputCode !== code) {
        // 验证码不对
        wx.showToast({
          title: '验证码不一致',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true
        });
          
        return
      }
      const res = await login_password(email, password,inputCode)
    } else {
      if (!email.trim() || !inputCode.trim()) {
        // 判断都不能为空
        return
      }
      // 不为空 再发起请求
      const res = await login_password(email, inputCode)
    }
    
    
  },
  // 账号密码登陆 请求
  async login_password (email, password,inputCode) {
    const obj = {
      email,
      password,
      code: inputCode
    }
    const { data } = await post_login(obj)
    console.log(data);
  },
  // 验证码登陆 请求
  async login_email_code (email, inputCode) {
    const obj = {
      email,
      code: inputCode
    }
    const { data } = await post_emailCodeLogin(obj)
    console.log(data);
  },
  // 获取验证 登陆验证   发送请求  点击发送请求
  async getCode () {
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
    // 发起请求获取验证码
    const { data } = await get_login_code(email)
    console.log(data);
    if (data.code !== 200) {
      return 
    }
    this.setData({
      code: data.text
    })
  },
  // 点击验证码登陆
  email_login () {
    this.setData({
      isPasswordLogin: false
    })
  },
  // 点击密码登陆
  passwordLogin () {
    this.setData({
      isPasswordLogin: true
    })
  },

  // 找回密码
  to_found_password () {
    wx.navigateTo({
      url: '/pages/retrieve_password/retrieve_password',
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