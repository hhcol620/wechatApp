// suppages/mine/store_leave_message/store_leave_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制遮罩是否打开
    isShow: false
  },
  // 点击触发
  toCommodity_detail () {
    // 跳转到 商品的详情页
    console.log('点击触发');
  },
  // 长按触发
  longpressFunc () {
    console.log('长按触发');
    this.setData({
      isShow: true
    })
  },
  // 隐藏遮罩弹框 
  onClickHide() {
    this.setData({
      isShow: false
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