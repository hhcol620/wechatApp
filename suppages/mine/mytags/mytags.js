import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// suppages/store/my_info/my_info.js
import { getUserTag,followInterestTag } from '../../../request/api/store_api.js'

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
    totalCount: 0,
    // 已关注标签
    likeTags:[],
    // 所有的标签
    allTags: [],
    // 控制主要数据是否显示
    is_show: true
  },

  // 获取标签列表
  async getTag () {
    showLoading(this)
    const { data } = await getUserTag()
    hideLoading(this)
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
    console.log(data);
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
    wx.stopPullDownRefresh() 
  },
  // 切换 标签是否关注
  async change_concern (e) {
    // console.log(e);
    // console.log(e);
    // e.detail   avaliable  当为1 的时候表示已经关注的状态 
    const type = e.detail.avaliable||2
    const id = e.detail.id
    // 因为切换关注接口 type值 跟这个avaliable对应 
    const { data } = await followInterestTag(type, id)
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
    // 根据id 值去切换对应的avaliable
    const { allTags } = this.data
    allTags.forEach(item => {
      if (id == item.id) {
        if (item.avaliable == 1) {
          item.avaliable = 2
        }else {
          item.avaliable = 1
          console.log(id);
        }
      }
    })
    const likeTags = allTags.filter(item => {
      return item.avaliable === 1
    })
    this.setData({
      likeTags,
      allTags
    })
  },
  // 页面下拉刷新
  PullDownRefresh () {
    this.setData({
      pageSize: 10,
      currentPage: 1,
      // 已关注标签
      likeTags:[],
      // 所有的标签
      allTags: []
    })
    // 然后重新请求 获取tags
    this.getTag()
  },
  // 触底加载下一页
  reachBottom () {
    
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
    this.PullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { currentPage } = this.data
    this.setData({
      currentPage:currentPage+1
    })
    this.getTag()
    // 
    console.log('触发了');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})