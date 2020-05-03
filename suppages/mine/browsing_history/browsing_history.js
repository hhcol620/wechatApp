import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
// suppages/store/browsing_history/browsing_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 长按  => 弹框提示用户
  longPressFunc (e) {
    console.log(e);
    Dialog.confirm({
      message: '确定删除本条浏览记录吗'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  // 删除全部
  deleteAll (e) {
    console.log(e);
    Dialog.confirm({
      message: '确定删除全部的浏览记录吗'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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