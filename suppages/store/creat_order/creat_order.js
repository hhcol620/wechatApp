// suppages/store/creat_order/creat_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: 'https://pic.images.ac.cn/image/5e9e31b03b6dc.html',
    // 控制选择支付方式
    pay_type_show: false,
    // 1表示微信 2表示支付宝
    radio: '1' 
  },


  // 提交订单
  onSubmit () {
    // console.log('ok');
    // 点击提交订单  跳转 支付页面
    // wx.navigateTo({
    //   url: '../payment/payment',
    //   success: (result)=>{
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    this.setData({
      pay_type_show:true
    })
  },
  // 关闭选择支付方式
  payType_onClose () {
    this.setData({
      pay_type_show:false
    })
  },

  // 复选框的功能实现
  onChange (event) {
    console.log(event);
    this.setData({
      radio: event.detail
    });
  },
  // 复选框的功能实现
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },
  // 点击去付款
  confirm () {
    const radio = this.data.radio
    if (radio==1) {
      // 微信支付 调用微信的支付接口
    } else if (radio == 2) {
      // 支付宝的话直接跳转
      wx.navigateTo({
        url: `../payment/payment?radio=${radio}`,
        success: (result)=>{
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
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