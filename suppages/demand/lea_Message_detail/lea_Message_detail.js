// suppages/store/lea_Message_detail/lea_Message_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShow: false,
    keyBoardHeight:"0px"
  },
  replyFunc (e) {
    console.log('点击了回复');
    // console.log(e);
    this.setData({
      inputShow:!this.data.inputShow
    })
  },
  // 输入框获得焦点
  inputFocus (e) {
    const h = e.detail.height + 'px'
    console.log(h);
      this.setData({
        keyBoardHeight: h
      })
    },
   // 输入框脱焦
   inputBlur () {
    this.setData({
      inputShow:!this.data.inputShow
    })
  },
  // 点击了发送
  send () {
    
  },


  // 页面滚动
  onPageScroll (e) {
    console.log(e);
  },
  // 页面尺寸变化
  onResize (e) {
    console.log('尺寸变化了');
    console.log(e);
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