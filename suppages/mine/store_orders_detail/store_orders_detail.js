// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getOrderDetail,getUserInfo,get_goodsInfo,getEvaluateByOrderId,get_product_order_detail
} from '../../../request/api/store_api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData


// suppages/mine/store_orders_detail/store_orders_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 3.5,
    // 订单信息
    order_detail: {},
    // 加载图片基地址
    imgURL:''
  },

 
  // 根据订单id获取订单的详情
  async getOrder_detail (type,orderid) {
    const { data } = await getOrderDetail(type,orderid)
    if (data.code !== 200) {
      // 获取订单信息失败
      return 
    }
    // console.log(data);
    const orderObj = data.data
    const goodsInfo = await this.getGoodsInfo(orderObj.productId)
    const buyerInfo = await this.getUserInfoById(orderObj.buyerId)
    const salerInfo = await this.getUserInfoById(orderObj.salerId)
    const evaluateInfo = await this.getEvaluateByOrderId(orderObj.id)
    orderObj.goodsInfo = goodsInfo
    orderObj.buyerInfo = buyerInfo
    orderObj.salerInfo = salerInfo
    orderObj.evaluateInfo = evaluateInfo
    this.setData({
      order_detail: orderObj
    })
  },
  // 根据订单id获取订单详情 不需要type
  async get_Order_Detail (id) {
    const { data } = await get_product_order_detail(id)
    if (data.code !== 200) {
      // 获取订单信息失败
      return 
    }
    // console.log(data);
    const orderObj = data.data
    const goodsInfo = await this.getGoodsInfo(orderObj.productId)
    const buyerInfo = await this.getUserInfoById(orderObj.buyerId)
    const salerInfo = await this.getUserInfoById(orderObj.salerId)
    const evaluateInfo = await this.getEvaluateByOrderId(orderObj.id)
    orderObj.goodsInfo = goodsInfo
    orderObj.buyerInfo = buyerInfo
    orderObj.salerInfo = salerInfo
    orderObj.evaluateInfo = evaluateInfo
    this.setData({
      order_detail: orderObj
    })

  },
  // 根据productId  获取商品信息
  async getGoodsInfo (goodsId) {
    const { data } = await get_goodsInfo(goodsId)
    if (data.code !== 200) {
      wx.showToast({
        title: `${data.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });  
      return 
    }
    return data.data
  },
  // 根据buyerId 获取买家 卖家信息
  async getUserInfoById(Id) {
    const {
      data
    } = await getUserInfo(Id)
    // console.log(data.data);
    if (data.code !== 200) {
      wx.showToast({
        title: `${data.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });  
      return 
    }
    return data.data
  },
  // 根据订单id获取评价
   // 根据订单id获取评价信息
  async getEvaluateByOrderId (orderId) {
    const { data } = await getEvaluateByOrderId(orderId)
    // console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: `${data.text}`,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });  
      return 
    }
    return data.data
  },
  // 如果需要快速复制单号 在单号后面设置一个按钮 调用这个api wx.setClipboardData(Object object) 

  copy_orderCode (e) {
    // console.log(e.currentTarget.dataset);
    // 订单号
    const {code} = e.currentTarget.dataset
    wx.setClipboardData({
      data: `${code}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 举报评价  跳转举报页  需要参数  type=3&targetid=举报id&customerId=举报的用户id
  evaluate_report (e) {
    const {  salerid,evaluateid } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/suppages/store/commodity_report/commodity_report?type=3&targetid=${evaluateid}&customerid=${salerid}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgURL
    })
    // console.log(options.orderid);
    // 这个就是订单id  这个里面的type  主要用于区分 自己是卖家 还是买家  1-作为卖家  2-作为买家 
    const { orderid, type } = options
    if (type) {
      this.getOrder_detail(type,orderid)
    } else {
      this.get_Order_Detail(orderid)
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