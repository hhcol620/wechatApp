// suppages/store/inform/inform.js
import { getSystemInfoSync, getSystemNews} from "../../../miniprogram_npm/vant-weapp/common/utils";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageSize: 10,
      currentPage: 1,
      evaluateList:[]
  },

  async getSystemInfo(){
    console.log("进入");
    const { data } = await getSystemNews()
    console.log("系统通知:" + JSON.stringify(data));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("系统通知:");
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