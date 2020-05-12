// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getOrderDetail,getUserInfo,get_goodsInfo,post_evaluate
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




// suppages/mine/store_write_evaluate/store_write_evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 1,
    // 订单信息
    orderObj: {},
    // 加载图片基地址
    imgURL,
    // 文字评价  提交的时候使用content
    evaluate_content:'',
    // rate  评分信息  分别乘以2 对应着productQualityEvaluate     salerServiceEvaluate     wholeEvaluate
    rate: {
      // 质量
      quality: 1,
      // 服务
      service: 1,
      // 整体体验
      experience:1
    }
  },
  // 根据订单id 获取订单的信息
  async getOrder_detail (orderid) {
    const { data } = await getOrderDetail(2, orderid)
    if (data.code !== 200) {
      wx.showToast({
        title: '获取订单信息失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return 
    }
    const orderObj = data.data
    // console.log(orderObj);
    const userInfo = await this.getuser_Info(orderObj.salerId)
    const goodsInfo = await this.getGoodsInfo(orderObj.productId)
    console.log(goodsInfo);
    orderObj.salerInfo = userInfo
    orderObj.goodsInfo = goodsInfo
    this.setData({
      orderObj
    })
  },
  // 根据卖家id 获取卖家的信息
  async getuser_Info (userId) {
    const { data } = await getUserInfo(userId)
    return data.data
  },
  // 根据商品id 获取商品信息
  async getGoodsInfo (goodsId) {
    const { data } = await get_goodsInfo(goodsId)
    return data.data
  },
  // 获取输入框中的数据
  getInputData (e) {
    // console.log(e.detail.value);
    const inputContent = e.detail.value
    this.setData({
      evaluate_content:inputContent
    })
  },
  // 打分
  onChange (e) {
    const { name } = e.currentTarget.dataset
    const value = e.detail
    // console.log(name);
    // console.log(e.detail);
    this.setData({
      [name]:value
    })
  },
  // 提交   发布评价
  async submit_btn () {
    // 用户点击提交   验证输入框是否为空  不为空就提交
    const orderId = this.data.orderObj.id
    const { evaluate_content, rate } = this.data
    const evaluateObj = {
      content: evaluate_content,
      productQualityEvaluate: rate.quality*2, salerServiceEvaluate: rate.service*2,
      wholeEvaluate: rate.experience*2
    }
    // console.log(orderId, evaluateObj);
    if (!evaluate_content.trim()) {
      // 评价为空
      wx.showToast({
        title: '评价为空',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return 
    }
    const { data } = await post_evaluate(orderId, evaluateObj)
    // console.log(res);
    if (data.code !== 200) {
      // 提交失败 请稍后重试,
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return 
    }
    // 提交成功  
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgURL
    })
    // 获取订单id
    const { orderid } = options
    // 根据订单id发起请求  获取订单的信息
    this.getOrder_detail(orderid)
    // console.log(orderid);
    

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