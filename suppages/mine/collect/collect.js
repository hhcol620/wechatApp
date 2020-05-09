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
  async getCollectList(){
      const{ data } = await getMyProductCollectList(this.data.pageSize, this.data.currentPage)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCollectList()
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