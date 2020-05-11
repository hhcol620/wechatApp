// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getMyProductCollectList
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

// suppages/store/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  是否已经收藏了
    isCollect:false,
    collectList:[],
    pageSize: 10,
    currentPage: 1,
    totalCount: 0
  },
  // 点击收藏按钮
  collectFunc () {
    const collect = !this.data.isCollect
    this.setData({
      isCollect:collect
    })
  },
  async getCollectList () {
    const { pageSize,currentPage } = this.data
    const res = await getMyProductCollectList(pageSize, currentPage)
    console.log(res);
    console.log('ok');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectList()
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