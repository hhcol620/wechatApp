// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_goodsList
} from '../../../request/api/store_api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading
} = app.globalData



// suppages/mine/store_release_product/store_release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 需求 id
    demandId:'',
    // 自己发布的二手商品列表
    goodsList: [],
    // pageSize
    pageSize: 10,
    // 当前页
    currrentPage: 1,
    // 数据总条数
    totalCount: 0,
    // // 被选中的商品id
    id: '',
  },
  // 页面加载 请求方法 获取自己发布的二手商品列表
  async getGoodsList() {
    const {
      data
    } = await get_goodsList(1, 1)
    // console.log(data.code);
    if (data.code !== 200) {
      // 提醒用户获取信息失败
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return
    }
    // 获取信息成功  将数据渲染到页面上
    console.log(data);
    // 将页面大小和数据总条数和当前页记录一下 
    const {
      pageSize,
      currrentPage,
      totalCount
    } = data.data
    this.setData({
      pageSize,
      currrentPage,
      totalCount
    })
    const list = data.data.data
    console.log(list);
    const l = list.map((v) => {
      const title = v.title
      const productDesc = v.productDesc
      const mainPicUrl = v.mainPicUrl
      const browserTimes = v.browserTimes
      const salePrice = v.salePrice
      const id = v.id
      return {
        title,
        productDesc,
        mainPicUrl,
        browserTimes,
        salePrice,
        id
      }
    })
    console.log(l);
    this.setData({
      goodsList: l
    })
    wx.stopPullDownRefresh()
  },
  // 点击商品  表示选中
  selectGoods (e) {
    const { goodsid } = e.currentTarget.dataset
    // console.log(goodsid);
    this.setData({
      id: goodsid
    })

  },
  // 点击了确定
  submitFunc () {
  /* 首先需要将这个商品id传到上一个需求页面 初步想去触发上一个页面的事件 将值传到上一页面 并执行发送 */
    const { id,demandId,goodsList } = this.data
    console.log(id);
    const goodsInfo = goodsList.filter((item) => {
      return id === item.id
    })
    // console.log(goodsInfo[0]);
    wx.navigateTo({
      url: `/suppages/demand/demand_detail/demand_detail?id=${demandId}`,
      success: (result) => {
        result.eventChannel.emit('acceptSelectComm', { goodsInfo: goodsInfo[0] })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { id } = options
    this.setData({
      demandId:id
    })
    this.getGoodsList()
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
    this.setData({
      goodsList: [],
      // pageSize
      pageSize: 10,
      // 当前页
      currrentPage: 1,
      totalCount: 0
    })
    this.getGoodsList()
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