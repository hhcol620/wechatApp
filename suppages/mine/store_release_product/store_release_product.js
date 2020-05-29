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
    // 控制遮罩是否打开
    isShow: false,
    // 自己发布的二手商品列表
    goodsList: [],
    // pageSize
    pageSize: 5,
    // 当前页
    currrentPage: 1,
    // 数据总条数
    totalCount: 0,
    // 点击查看更多的 那条数据的id 
    id: ''
  },
  // 页面加载 请求方法 获取自己发布的二手商品列表
  async getGoodsList () {
    const {
      pageSize,
      currrentPage,
      goodsList
    } = this.data
    const {
      data
    } = await get_goodsList(pageSize,currrentPage)
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
    
    const list = data.data.data
    // console.log(list);
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
    let c_page = currrentPage+1
    goodsList.push(...l)
    this.setData({
      goodsList: goodsList,
      currrentPage:c_page
    })
    wx.stopPullDownRefresh()
  },
  // 点击了更多  打开一个弹框
  more_btn(e) {
    // 这个就是这条数据的id值  存储一下 提供打开弹框后使用
    // console.log(e.currentTarget.dataset);
    const id = e.currentTarget.dataset
    this.setData({
      isShow: true,
      id: id
    })
  },
  // 隐藏遮罩弹框 
  onClickHide() {
    this.setData({
      isShow: false
    });
  },
  // 点击发布宝贝 跳转到发布页
  release_product() {
    wx.navigateTo({
      url: '/suppages/release/release_product/release_product',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 点击编辑  将id传到发布页面
  editFunc(e) {
    // 这个就是这条数据的id值
    // console.log(e.currentTarget.dataset);
    // 解构赋值 然后使用模板字符串拼接
    const {
      id
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/suppages/release/release_product/release_product?id=${id}`,
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });
  },
  // 触底加载下一页
  reachBottom () {
    const { currrentPage,totalCount,pageSize } = this.data
    if (currrentPage <= Math.ceil(totalCount / pageSize)) {
      // 
      this.getGoodsList()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    this.reachBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})