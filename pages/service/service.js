import regeneratorRuntime from '../../lib/runtime/runtime.js'


import {
  getUserInfo
} from '../../request/api/store_api.js'

import {
  get_donation_finsh,get_donation_finsh_detail
} from '../../request/api/store_front_api.js'

const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData



// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 加载图片基地址
    imgURL:'',
    // 公益列表
    donationList: []
  },
  // 页面加载获取以获得捐助的活动
  async getDonation () {
    const { donationList } = this.data 
    const { data } = await get_donation_finsh()
    // console.log(data);
    if (data.code !== 200) {
      return
    }
    let list = data.data
    list.forEach(async (v, i) => {
      const detail = await this.getDonationDetail(v.id)
      // console.log(detail);
      v.detailInfo = detail
      donationList.push(v)
      this.setData({
        donationList
      })
    })
  },
  // 根据id获得捐助活动的详情
  async getDonationDetail (id) {
    const { data } = await get_donation_finsh_detail(5,id)
    // console.log(data);
    if (data.code !== 200) {
      return
    }
    return data.data
  },
  // 跳转到 公益详情页
  to_donation_detail (e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/suppages/public_service/public_service_detail/public_service_detail?id=${id}&type=5`,
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
    this.getDonation()
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