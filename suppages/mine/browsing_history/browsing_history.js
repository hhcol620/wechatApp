import regeneratorRuntime from '../../../lib/runtime/runtime.js'

import { getUserRecodrByPage, deleteOwnAllBrowsing, deleteBrowsingByIndex } from '../../../request/api/store_api.js'


import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';



const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData




Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageSize: 10,
      currentPage: 1,
      recordList:[],
      totalCount: 0,
      // 图片加载基地址
      imgURL:''
      
  },
  // 长按  => 弹框提示用户
  longPressFunc (e) {
    // console.log(e);
    const { inx } = e.currentTarget.dataset
    console.log(inx);
    Dialog.confirm({
      message: '确定删除本条浏览记录吗'
    }).then(() => {
      this.deleteBrowsingByIndex(inx);
    }).catch(() => {
      // on cancel
    });
  },
  // 点击跳转
  to_commodity (e) {
    const { id } = e.currentTarget.dataset
    console.log(id);
    wx.navigateTo({
      url: `../../store/commodity/commodity?id=${id}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 删除全部
  deleteAll (e) {
    Dialog.confirm({
      message: '确定删除全部的浏览记录吗'
    }).then(() => {
      this.deleteAllCollect();
    }).catch(() => {
      // on cancel
    });
  },
  // 根据索引删除浏览记录
  async deleteBrowsingByIndex (inx) {
    const { recordList } = this.data
    // console.log(recordList);
    const { data } = await deleteBrowsingByIndex(inx)
    console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return
    }
    // console.log(data);
    recordList.forEach((item, index) => {
      if (inx == index) {
        // 这一项不要
        recordList.splice(index, 1)
        console.log('ok');
      }
    })
    this.setData({
      recordList
    })
  },
  // 删除全部
  async deleteAllBrowsing(){
    const{ data } = await deleteOwnAllBrowsing();
    if(data.code !== 200) return
    this.setData({
      recordList: []
    })
  },
  // 获得浏览历史列表
  async getBrowseHistory () {
    const { pageSize,currentPage} = this.data
    const { data } = await getUserRecodrByPage(pageSize, currentPage)
    console.log(data);
    if (data.code !== 200) return
    this.setData({
      recordList: data.data.data,
      totalCount: data.data.totalCount
    })
    wx.stopPullDownRefresh()
  },

  // 下拉刷新
  PullDownRefresh () {
    this.setData({
      pageSize: 10,
      currentPage: 1,
      recordList:[],
      totalCount: 0,
    })
    this.getBrowseHistory()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBrowseHistory()
    this.setData({
      imgURL
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})