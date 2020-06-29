import regeneratorRuntime from '../../lib/runtime/runtime.js'

// suppages/mine/store_orders/store_orders.js
import {
  getFinishDonation,
  getFinishingDonation,
  getUserInfo
} from '../../request/api/store_api.js'

import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

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
    donationList: [],
    // 加载图片基地址
    imgURL: '',
    // 判断索引   下一个将是哪个块??
    box_index: 2
  },
  // 切换tab栏
  async tabsClick(e) {
    const {
      index
    } = e.detail
    // 切换tab 清空存储列表
    this.setData({
      currentPage: 1,
      totalCount: 0,
      // 存储列表
      donationList: [],
      active: index
    })
    const {
      pageSize,
      currentPage
    } = this.data
    // console.log(e);   //index 1表示正在审核 2表示审核成功

    if (index == 0) {
      await this.getFinishing_donation(pageSize, currentPage)
    } else if (index == 1) {
      await this.getFinish_donation(pageSize, currentPage)
    }
  },
  // 获取已经转账的公益基金申请
  async getFinish_donation(pageSize, currentPage) {
    showLoading(this)
    const {
      donationList
    } = this.data
    const {
      data
    } = await getFinishDonation(pageSize, currentPage)
    wx.stopPullDownRefresh()
    // console.log(data);
    if (data.code !== 200) {
      hideLoading(this)
      return
    }
    // 成功
    const total = data.data.totalCount
    let c_page = currentPage + 1
    const arr = data.data.data
    arr.forEach(async (v, i) => {
      const userInfo = await this.get_user_info(v.applyUserId)
      v.applyUserInfo = userInfo
      donationList.push(v)
      this.setData({
        donationList
      })
    })
    hideLoading(this)
    // const list = donationList.concat(arr)
    // console.log(list);
    this.setData({
      totalCount: total,
      currentPage: c_page
    })
  },
  // 获得正在审核的公益基金申请
  async getFinishing_donation(pageSize, currentPage) {
    const {
      donationList
    } = this.data
    showLoading(this)
    const {
      data
    } = await getFinishingDonation(pageSize, currentPage)
    wx.stopPullDownRefresh()
    if (data.code !== 200) {
      hideLoading(this)
      return
    }
    // 成功
    const total = data.data.totalCount
    let c_page = currentPage + 1
    const arr = data.data.data
    arr.forEach(async (v, i) => {
      const userInfo = await this.get_user_info(v.applyUserId)
      v.applyUserInfo = userInfo
      console.log(userInfo);
      donationList.push(v)
      this.setData({
        donationList
      })
    })
    hideLoading(this)
    this.setData({
      totalCount: total,
      currentPage: c_page
    })
  },
  // 根据id获取用户的信息
  async get_user_info(userid) {
    const {
      data
    } = await getUserInfo(userid)
    if (data.code !== 200) {
      return
    }
    return data.data
  },
  // 下拉刷新
  async pullDownRefresh() {
    this.setData({
      currentPage: 1,
      totalCount: 0,
      donationList: []
    })
    const index = this.data.active
    const {
      pageSize,
      currentPage
    } = this.data

    if (index == 0) {
      await this.getFinishing_donation(pageSize, currentPage)
    } else if (index == 1) {
      await this.getFinish_donation(pageSize, currentPage)
    }
  },
  // 触底加载下一页
  async reachBottom() {
    const index = this.data.active
    const {
      pageSize,
      currentPage,
      totalCount
    } = this.data
    if (currentPage > Math.ceil(totalCount / pageSize)) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return
    }
    if (index == 0) {
      await this.getFinishing_donation(pageSize, currentPage)
    } else if (index == 1) {
      await this.getFinish_donation(pageSize, currentPage)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgURL
    })
    const {
      pageSize,
      currentPage
    } = this.data
    this.getFinishing_donation(pageSize, currentPage)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.pullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.reachBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 页面滚动
  onPageScroll: function(e) {
    // console.log(e);
    let s_top = 2
    let that = this
    const query = wx.createSelectorQuery()
    query.select('.list').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      //res[0].top // list节点的上边界坐标
      //res[1].scrollTop // 显示区域的竖直滚动位置
      // console.log('res',res);
      // console.log('top',res[0].top);
      // console.log('scrolltop', res[1].scrollTop);
      // scrollTop  94 414  (+320)
      s_top = res[1].scrollTop
      console.log(s_top);
      if (Math.abs((s_top - 94) % 320) <= 20) {
        console.log('ok');
        let box_index = Math.floor((s_top - 94) / 320)+2
        that.setData({
          box_index: box_index
        })
      }
    })
    
    
  }
})