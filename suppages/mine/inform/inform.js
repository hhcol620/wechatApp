// suppages/store/inform/inform.js
import { getSystemInfoSync} from "../../../miniprogram_npm/vant-weapp/common/utils";
import { getSystemNews } from '../../../request/api/store_api.js'
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      evaluateList:[]
  },

  async getSystemInfo(){
    const { data } = await getSystemNews(this.data.pageSize, this.data.currentPage)
    console.log(data.data.data);

    if (data.code !== 200) return;
    this.data.totalCount = data.data.totalCount;
    this.setData({
        evaluateList: data.data.data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo()
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