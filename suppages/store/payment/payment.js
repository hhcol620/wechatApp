import drawQrcode from '../../../utils/weapp-qrcode.js'

// suppages/store/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 2表示支付宝支付
    pay_type: 2
  },

  // 生成支付宝的二维码
  makeImg () {
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: 'https://www.baidu.com'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const radio = options.radio
    this.setData({
      pay_type:radio
    })
    if (radio == 1) {
      // 则证明是微信  调用微信的支付接口
      
    } else if (radio == 2) {
      // 证明用户选择的是支付宝支付  显示图片  调用支付宝的方法
      this.makeImg()
    }
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