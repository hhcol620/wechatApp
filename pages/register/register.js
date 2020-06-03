import regeneratorRuntime from '../../lib/runtime/runtime.js'

import { post_ToEmailCode, post_register, checkData } from '../../request/api/store_front_api.js'

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
    nickName: '',
    password: '',
    secPassword: '',
    // 邮箱验证码
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
      icon: 'success',
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
  // 提交   将数据提交给后台
  async post_registerEmailCode () {
    const { email, nickName, password, secPassword, code } = this.data
    const emailCheck = await this.checkUserInfo({
      type: "email",
      validValue: email
    })
    if (emailCheck.code !== 200) {
      wx.showToast({
        title: `${emailCheck.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }
    const nickCheck = await this.checkUserInfo({
      type: "nickname",
      validValue: nickName
    })
    if (nickCheck.code !== 200) {
      wx.showToast({
        title: `${nickCheck.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }

    if (!password.trim()) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return   
    }
    if (password !== secPassword) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }
    const obj = {
      email,
      nickname:nickName,
      password
    }
    // 第一个参数为code 第二个为params
    const { data } = await post_register(code, obj)
    console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: `${data.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask:true
      });
      return  
    }
    // 注册成功
    wx.showToast({
      title: '',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: true
    });
    // 然后返回上一页  让用户登录
    wx.navigateBack({
      delta: 1
    });
      
  },
  // 验证用户邮箱 和用户名是否唯一 不唯一不进行下一步的操作  这个传递的参数应该为 {type:"email",validValue:'1111@qq.com' }  还可以phoneNum,nickname,alipayNum 
  async checkUserInfo (checkInfo) {
    const { data } = await checkData(checkInfo)
    console.log(data);
    return data
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