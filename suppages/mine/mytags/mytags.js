import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// suppages/store/my_info/my_info.js
import { getUserTag } from '../../../request/api/store_api.js'

const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData


// suppages/store/mytags/mytags.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片加载基地址
    imgURL:'',
    // tab栏默认激活
    active: 0,
    pageSize: 10,
    currentPage: 1,
    // 已关注标签
    likeTags:[],
    // 所有的标签
    allTags: []
  },

  // 获取标签列表
  async getTag () {
    const { data } = await getUserTag()
    // console.log(data.data);
    if (data.code !== 200) {
      // 获取信息失败
      wx.showToast({
        title: '获取列表失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return 
    }
    // 成功  对总体进行一个过滤筛选   筛选出来是否已经关注
    const List = data.data
    const likeTags = List.filter(item => {
      return item.avaliable === 1
    })
    console.log(List);
    console.log(likeTags);
    this.setData({
      likeTags,
      allTags:List
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgURL
    })
    this.getTag()
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