import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// suppages/mine/store_orders/store_orders.js
import {
  getDonationDetail,getDonationDetail_attribute,getUserInfo
} from '../../../request/api/store_api.js'

import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

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
    // 存公益详情
    donationDetailObj: {},
    // 加载图片基地址
    imgURL: '',
  },
  // 根据type 和id 获得公益详情
  async get_donation_detail (type,id) {
    const { data } = await getDonationDetail(type,id) 
    console.log(data);
    if (data.code !== 200) {
      return 
    }
    const res = await this.get_userInfo(data.data.applyUserId)
    console.log(res);
    data.data.applyUserInfo = res
    this.setData({
      donationDetailObj:data.data
    })
  },
  // 点击支持或者不支持  发表态度 type 1 不同意 2 同意  第二个参数为id值
  async release_attribute (type,id) {
    const { data } = await getDonationDetail_attribute(type, id)
    console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: `${data.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return 
    }
    // 已经成功
    wx.showToast({
      title: '成功发表态度',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true
    });
    const { donationDetailObj } = this.data

    if (type == 2) {
      let num = donationDetailObj.userUpTotal+1
      this.setData({
        ['donationDetailObj.userUpTotal']:num
      })
    } else {
      let num = donationDetailObj.userDownTotal+1
      this.setData({
        ['donationDetailObj.userDownTotal']:num
      })
    }
      
  },
  // 点击支持
  async attribute_Support (e) {
    const { id } = e.currentTarget.dataset
    if (!id) {
      return 
    }
    const res = await this.release_attribute(2,id)
  },
  // 点击不支持
  async attribute_noSupport (e) {
    const { id } = e.currentTarget.dataset
    if (!id) {
      return 
    }
    const res = await this.release_attribute(1,id)
  },
  // 根据用户id获取用户的信息
  async get_userInfo (userId) {
    const { data } = await getUserInfo(userId)
    return data.data
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const { id, type } = options
    // 根据这个发送请求详细的公益详情
    // console.log(id, type);
    this.get_donation_detail(type, id)
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