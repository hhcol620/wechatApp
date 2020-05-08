// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 选择框数据
    selectArray: [{
      "id": "1",
      'label':'商城',
      "value": "1"
    }],
    // 搜索内容  控制列表组件  对应的数组里面的value
    selectValue: 1,
    // 输入框输入的内容
    Inputvalue:''
  },


  getDate: function(e) {
    console.log(e.detail)
    const { selectValue,Inputvalue} = e.detail
    // 通过控制回传回来的搜索数据将显示不同的组件 selectIndex 0表示商城  Inputvalue发起不同的列表请求
    // console.log(selectValue,Inputvalue);
    // 
    this.setData({
      selectValue,
      Inputvalue
    })
    // 首先判断这两个值是否合法 这里判断是否为空
    if (selectValue.trim() && Inputvalue.trim()) {
      // 两个都合法进行跳转
      wx.navigateTo({
        url: `/pages/search_store/search_store?keyword=${Inputvalue}`,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
  },
  // 点击空白关闭
  close () {
    // 关闭select   获取页面自定义组件的实例  通过实例调用组件事件
    this.selectComponent('#select').close()
  },
  // 当输入框为空 立即显示 历史记录
  resetFunc () {
    console.log('ok');
    this.setData({
      selectValue:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})