// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
import { createComparisonFunction } from '../../../utils/sort_self.js'

// 引入  用来发送请求的方法  需要将路径补全
import {
  reply_to_me,getUserInfo,get_read_all
} from '../../../request/api/store_api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData



import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 6,
    currentPage: 1,
    totalCount: 0,
    // 回复我的列表
    replyToMe: [],
    // 加载图片基地址
    imgURL: '',
    // 控制主要数据是否显示
    is_show: true
  },
  // 删除
  deleteFunc (e) {
    console.log(e);
    Dialog.confirm({
      message: '确定删除吗'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  // 页面加载获取回复我的 列表
  async getReplyToMe () {
    showLoading(this)
    const { pageSize,currentPage,replyToMe } = this.data
    const { data } = await reply_to_me(pageSize, currentPage)
    hideLoading(this)
    if (data.code !== 200) {
      return 
    }
    let current_page = currentPage + 1
    const List = data.data.data
    if (replyToMe.length <= 0 && List.length <= 0) {
      this.setData({
        is_show:false
      })
    }
    // 遍历循环根据发送者id 获取发送者信息
    List.forEach(async item => {
      const senderInfo = await this.get_userInfo(item.senderId)
      item.senderInfo = senderInfo
      replyToMe.push(item)
      replyToMe.sort(createComparisonFunction('createTime'))
      this.setData({
        replyToMe
      })
    })
    wx.stopPullDownRefresh()
    this.setData({
      currentPage: current_page,
      totalCount: data.data.totalCount,
    })
  },
  // 根据用户id获取用户的信息
  async get_userInfo (userId) {
    const { data } = await getUserInfo(userId)
    return data.data
  },
  // 点击跳转到 商品的详情页
  to_commodity (e) {
    const { targetid } = e.currentTarget.dataset
    console.log(targetid);
    wx.navigateTo({
      url: `/suppages/store/commodity/commodity?id=${targetid}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 进入这个页面  全部标记已读  at我传2
  async sign_read_all () {
    const { data } = await get_read_all(2)
    // console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: '未知错误',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getReplyToMe()
    this.sign_read_all()
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
  onPullDownRefresh: function() {
    this.setData({
      currentPage: 1,
      totalCount: 0,
      replyToMe: []
    })
    this.getReplyToMe()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 页面触底进行判断 是否还有下一页 有下一页的话则请求  无则提示
    const { pageSize, currentPage, totalCount } = this.data
    let num = Math.ceil((totalCount / pageSize))
    if (currentPage <= num) {
      // 可以请求
      this.getReplyToMe()
    } else {
      wx.showToast({
        title: '客官,没有更多了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})