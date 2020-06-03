import regeneratorRuntime from '../../lib/runtime/runtime.js'

import { post_login,get_login_code,post_emailCodeLogin,post_ToEmailCode,post_login_WX } from '../../request/api/store_front_api.js'
import { getMyInfo } from '../../request/api/store_api.js'

const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL,
  access_token
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
    isPasswordLogin: true,
    // 倒计时
    time: '',
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
    showLoading(this)
    const { email, password, inputCode, code, isPasswordLogin } = this.data
    // 验证邮箱
    var emreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    if (emreg.test(email) == false) {
      // 不符合条件
      wx.showToast({
        title: '邮箱不合法',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      hideLoading(this)
        
      return 
    }
    let res;
    if (isPasswordLogin == true) {
      // 表示为账号密码登陆
      // 发起请求之前再判断code是否一致
      if (!email.trim() || !password.trim() || !inputCode.trim()) {
        wx.showToast({
          title: '输入不合法',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true
        });
        hideLoading(this)
          
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
        hideLoading(this)
          
        return
      }
      res = await this.login_password(email, password,inputCode)
    } else {
      if (!email.trim() || !inputCode.trim()) {
        // 判断都不能为空
        return
      }
      // 不为空 再发起请求
      res = await this.login_email_code(email, inputCode)
    }
    console.log(res);
    if (res.code !== 200) {
      wx.showToast({
        title: `${res.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      hideLoading(this)
        
      return 
    }
    hideLoading(this)
    // 登陆成功 
    // 本地存储accessToken 并设置全局的access_token
    // 本地存储cookie 并设置全局的cookie

    // 设置全局的access_token
    wx.setStorageSync('access_token', res.data.access_token);
    wx.setStorageSync('userAccessToken', res.data.jti);
    const accessToken = wx.getStorageSync('access_token');
    const userAccessToken = wx.getStorageSync('userAccessToken');
    app.globalData.access_token = 'bearer ' +  accessToken
    app.globalData.userAccessToken = userAccessToken
    // 获取登陆信息
    // await this.getmyinfo()
    // 存储成功之后 返回上一页
    wx.navigateBack({
      delta: 1
    });    
  },
  // 账号密码登陆 请求
  async login_password (email, password,inputCode) {
    const obj = {
      loginName:email,
      password,
      webCode: inputCode
    }
    const { data } = await post_login(obj)
    console.log(data);
    return data
  },
  // 验证码登陆 请求
  async login_email_code (email, inputCode) {
    const obj = {
      loginName:email,
      emailVerifyCode: inputCode
    }
    const { data } = await post_emailCodeLogin(obj)
    return data

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
  // 
  // 获取验证码 发送到邮箱中  验证码登陆
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
    // 发起请求获取验证码 type传`2`  第一个参数传`2`
    const { data } = await post_ToEmailCode(2,email)
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
  // 微信登陆
  async wechat_login () {
    // 在这个位置 直接登录  如果已经绑定 则不用跳转 登陆成功直接返回   否则跳转进行绑定
    showLoading(this)
    const {code} = await wx.login()
    console.log(code)
    const obj = {
      code
    }
    const { data } = await post_login_WX(obj)
    // console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: `${data.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      hideLoading(this)
      return 
    }
    // 设置全局的access_token
    wx.setStorageSync('access_token', data.data.access_token);
    wx.setStorageSync('userAccessToken', data.data.jti);
    const accessToken = wx.getStorageSync('access_token');
    const userAccessToken = wx.getStorageSync('userAccessToken');
    app.globalData.access_token = 'bearer ' +  accessToken
    app.globalData.userAccessToken = userAccessToken
    hideLoading(this)
    // 获取登陆信息
    // await this.getmyinfo()
    // 存储成功之后 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },
  // 登陆成功获取我的个人信息
  async getmyinfo () {
    const { data } = await getMyInfo()
    if (data.code !== 200) {
      wx.showToast({
        title: '身份已过期',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return
    }
    wx.setStorageSync('userInfo', data.data);
      
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