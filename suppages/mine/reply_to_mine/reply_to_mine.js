// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  reply_to_me,getUserInfo
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
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    // 回复我的列表
    replyToMe: [],
    // 加载图片基地址
    imgURL:''
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
    const { pageSize,currentPage,replyToMe } = this.data
    const { data } = await reply_to_me(pageSize, currentPage)
    if (data.code !== 200) {
      return 
    }
    const current_page = currentPage + 1
    const List = data.data.data
    console.log(List);
    // 遍历循环根据发送者id 获取发送者信息
    List.forEach(async item => {
      const senderInfo = await this.get_userInfo(item.senderId)
      item.senderInfo = senderInfo
      replyToMe.push(item)
      this.setData({
        replyToMe
      })
    })
    this.setData({
      currentPage: current_page,
      totalCount: data.totalCount,
    })
  },
  // 根据用户id获取用户的信息
  async get_userInfo (userId) {
    const { data } = await getUserInfo(userId)
    return data.data
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getReplyToMe()
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