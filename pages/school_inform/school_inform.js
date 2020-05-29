// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getUserInfo
} from '../../request/api/store_api.js'
import {
  get_propagate_detail
} from '../../request/api/store_front_api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData


// pages/school_inform/school_inform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 加载图片基地址
    imgURL: '',
    // 通知id
    id:'',
    // 通知详情
    informDetail:[]
  },
  // 根据通知的id获取详情
  async get_detail_byId (id){
    const { data } = await get_propagate_detail(id)
    console.log(data);
    const obj = data.data
    const publisherInfo = await this.get_userInfo_byId(obj.publisherId)
    obj.publisherInfo = publisherInfo
    this.setData({
      informDetail:obj
    })
  },
  // 根据用户id获取用户的信息
  async get_userInfo_byId (userid) {
    const { data } = await getUserInfo(userid)
    if (data.code !== 200) {
      return 
    }
    return data.data
  },
  // 跳转用户中心页
  toUserCenter (e) {
    const { userid } = e.currentTarget.dataset
    console.log(userid);
    wx.navigateTo({
      url: `/suppages/store/other_userInfo_page/other_userInfo_page?userid=${userid}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    this.setData({
      imgURL,
      id
    })
    this.get_detail_byId(id)
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