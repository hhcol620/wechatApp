// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_evaluate,
  delete_evaluate,
  getUserInfo
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


// suppages/mine/store_evaluate/store_evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制遮罩是否打开
    isShow: false,
    // 评价列表 
    evaluateList: [],

    pageSize: 10,
    currentPage: 1,
    // 评价id
    id: '',
    // 页面加载图片基地址
  },

  // 长按了更多  打开一个弹框
  more_btn(e) {
    // console.log(e);
    const {
      id
    } = e.currentTarget.dataset
    // console.log(id);
    // 将这个id保存到data里面  提供给弹框里面的按钮使用
    this.setData({
      isShow: true,
      id
    })
  },
  // 隐藏遮罩弹框 
  onClickHide() {
    this.setData({
      isShow: false
    });
  },
  // 删除评价
  async delete_evaluate() {
    const {
      id
    } = this.data
    // console.log(id);
    // 拿到需要删除的id之后 发起请求
    const {
      data
    } = await delete_evaluate(id)
    console.log(data);
  },
  // 页面加载 就发起请求  获得自己给别人的评价列表
  async getEvaluate() {
    const {
      data
    } = await get_evaluate(this.data.pageSize, this.data.currentPage)
    
    if (data.code !== 200) {
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }

    this.setData({
      evaluateList: data.data.data
    })
    // 成功将数据 赋值到data里面
    // 根据其中的买家id  获取用户的信息 头像和昵称
    // List.forEach(async item => {
    //   const buyerInfo = await this.getUserInfoById(item.buyerId)
    //   item.buyerInfo = buyerInfo
    //   evaluateList.push(item)
    //   // console.log(List);
    //   this.setData({
    //     evaluateList
    //   })
    // })

  },
  // 根据用户id获得用户信息
  async getUserInfoById(consumerId) {
    const {
      data
    } = await getUserInfo(consumerId)
    // console.log(data.data);
    return data.data
  },
  // 跳转到订单详情页
  navigator_order_detail (e) {
    // console.log('ok');
    // 订单id  根据订单id跳转到订单详情页  
    // console.log(e.currentTarget.dataset.orderid);
    const { orderid } = e.currentTarget.dataset
    console.log(orderid);
    wx.navigateTo({
      url: `/suppages/mine/store_orders_detail/store_orders_detail?orderid=${orderid}`,
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
    this.getEvaluate()
    this.setData({
      imgURL
    })
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