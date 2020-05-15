import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// suppages/mine/store_orders/store_orders.js
import {
  getFinishDonation,getFinishingDonation
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
    // tab栏默认激活项
    active: 0,
    // 
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    // 存储列表
    donationList: []
  },
  // 切换tab栏
  async tabsClick (e) {
    // 切换tab 清空存储列表
    this.setData({
      pageSize: 10,
      currentPage: 1,
      // 存储列表
      donationList:[]
    })
    const {pageSize,currentPage } = this.data
    // console.log(e);   //index 1表示正在审核 2表示审核成功
    const { index } = e.detail
    if (index == 0) {
      await this.getFinishing_donation(pageSize, currentPage)
    } else if (index == 1) {
      await this.getFinish_donation(pageSize, currentPage)
    }
  },
  // 获取已经转账的公益基金申请
  async getFinish_donation (pageSize, currentPage) {
    const { donationList } = this.data
    const { data } = await getFinishDonation(pageSize, currentPage)
    console.log(data);
    if (data.code !== 200) {
      return 
    }
    // 成功
    const total = data.data.totalCount
    const arr = data.data.data
    const list = donationList.concat(arr)
    console.log(list);
    this.setData({
      totalCount:total,
      donationList:list
    })
  },
  // 获得正在审核的公益基金申请
  async getFinishing_donation (pageSize, currentPage) {
    const { donationList } = this.data
    const { data } = await getFinishingDonation(pageSize, currentPage)
    if (data.code !== 200) {
      return 
    }
    // 成功
    const total = data.data.totalCount
    const arr = data.data.data
    const list = donationList.concat(arr)
    console.log(list);
    this.setData({
      totalCount:total,
      donationList:list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { pageSize,currentPage} = this.data
    this.getFinishing_donation(pageSize,currentPage)
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