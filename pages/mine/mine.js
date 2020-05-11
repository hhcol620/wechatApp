// pages/mine/mine.js
import { getSystemInfoSync } from "../../miniprogram_npm/vant-weapp/common/utils";
import { getMyInfo } from '../../request/api/store_api.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
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
    imgURL:''
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
    const token = wx.getStorageSync('token'); 
    if (!token) {
      // 获取不到就跳转到登陆页
    // console.log('获取不到');
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //     success: (result) => {
          
    //     },
    //     fail: () => {},
    //     complete: () => {}
    //   }); 
    }else{
      // const { data } = await getMyInfo()
      // if(data.code !== 200) return
      // this.setData({
      //   userInfo: data.data
      // })
    }
  },
  // 登陆成功获取我的个人信息
  async getmyinfo () {
    const { data } = await getMyInfo()
    console.log('ok');
    if (data.code !== 200) return
    this.setData({
      userInfo: data.data
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.redirectToLogin()
    this.getmyinfo()
    this.setData({
      imgURL
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