import regeneratorRuntime from '../../lib/runtime/runtime.js'

// pages/mine/mine.js
import { getSystemInfoSync } from "../../miniprogram_npm/vant-weapp/common/utils";
import { getMyInfo, get_no_read, get_is_wx_binding, wx_unbinding } from '../../request/api/store_api.js'

import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';


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
    userInfo: {},
    // 加载图片基地址
    imgURL: '',
    // 系统通知 未读
    inform_no_read: 0,
    // at我的未读
    atMe_no_read: 0,
    // 用户是否已经绑定
    isbind:false
  },
  // 联系客服
  handleContact1 (e) {
    console.log('ok');
  },
  handleContact (e) {
    console.log(e);
  },
  // 点击反馈 
  feedbackFunc (e) {
    console.log(e);
  },
  // 进入我的页面立即判断本地是否有token 如果没有的话就重定向到登陆页页面
  async redirectToLogin () {
    const token = wx.getStorageSync('access_token'); 
    if (!token) {
      // 获取不到就跳转到登陆页
    // console.log('获取不到');
      wx.navigateTo({
        url: '/pages/login/login',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      }); 
    }else{
      this.getmyinfo()
      this.getUnRead()
      this.isBind()
    }
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
        mask: false,
        success: (result) => {
          // if (data.code === 402) {
          //   wx.navigateTo({
          //     url: '/pages/login/login',
          //     success: (result) => {
                
          //     },
          //     fail: () => {},
          //     complete: () => {}
          //   });
              
          // }
        },
        fail: () => {},
        complete: () => {}
      });
        
      return
    }
    this.setData({
      userInfo: data.data
    })
  },
  // 登陆成功获取未读消息
  async getUnRead () {
    const { data } = await get_no_read()
    // console.log(data);
    if (data.code !== 200) {
      // if (data.code === 402) {
      //   wx.navigateTo({
      //     url: '/pages/login/login',
      //     success: (result) => {
            
      //     },
      //     fail: () => {},
      //     complete: () => {}
      //   });
          
      // }
      return 
    }
    const arr = data.text.split('|')
    // console.log(arr);
    this.setData({
      inform_no_read: arr[0],
      atMe_no_read:arr[1]
    })
  },
  // 判断用户是否已经绑定了微信
  async isBind () {
    const { data } = await get_is_wx_binding()
    console.log(data);
    if (data.code !== 200) {
      return
    }
    // 成功
    if (data.data == 1) {
      // 已绑定
      this.setData({
        isbind:true
      })
    } else {
      this.setData({
        isBind:false
      })
    }
  },
  async relieve_binding_wechat () {
    const { data } = await wx_unbinding()
    // console.log(data);
    if (data.code !== 200) {
      Toast('解绑失败,请稍后重试');
      return
    }
    // 解绑成功
    wx.showToast({
      title: '解绑成功',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: true
    });
    this.setData({
      isbind:true
    })
  },

  // 图片预览
  priviewImg (e) {
    const imgUrl = e.currentTarget.dataset.img
    // console.log(imgUrl);
    wx.previewImage({
      current: `${imgUrl}`, // 当前显示图片的http链接
      urls: [`${imgUrl}`] // 需要预览的图片http链接列表
    })
  },
  // 绑定微信
  to_binding_wechat () {
    const { id } = this.data.userInfo
    wx.navigateTo({
      url: `/pages/wechat_binding/wechat_binding?userid=${id}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 跳转登陆页
  toLogin () {
    wx.navigateTo({
      url: '/pages/login/login',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    }); 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgURL
    })
    this.redirectToLogin()
    // this.isBind()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.redirectToLogin()
    // this.getmyinfo()
    // this.getUnRead()
    // this.isBind()
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