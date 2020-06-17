import regeneratorRuntime from '../../../lib/runtime/runtime.js'

import { getUserRecodrByPage, deleteOwnAllBrowsing, deleteBrowsingByIndex } from '../../../request/api/store_api.js'


import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
// 按照时间排序
import { createComparisonFunction } from '../../../utils/sort_self.js'


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
      pageSize: 12,
      currentPage: 1,
      recordList:[],
      totalCount: 0,
      // 图片加载基地址
      imgURL: '',
      // 控制主要数据是否显示
      is_show: true
      
  },
  // 长按  => 弹框提示用户
  longPressFunc (e) {
    // console.log(e);
    const { id } = e.currentTarget.dataset
    console.log(id);
    Dialog.confirm({
      message: '确定删除本条浏览记录吗'
    }).then(() => {
      this.deleteBrowsingByIndex(id);
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
      this.deleteAllBrowsing();
    }).catch(() => {
      // on cancel
    });
  },
  // 根据索引删除浏览记录
  async deleteBrowsingByIndex (id) {
    const { recordList } = this.data
    // console.log(recordList);
    const { data } = await deleteBrowsingByIndex(id)
    // console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
        
      return
    }
    // console.log(data);
    recordList.forEach((item, index) => {
      if (id == item.id) {
        // 这一项不要
        recordList.splice(index, 1)
        // console.log('ok');
      }
    })
    this.setData({
      recordList
    })
  },
  // 删除全部
  async deleteAllBrowsing(){
    const{ data } = await deleteOwnAllBrowsing();
    if (data.code !== 200) {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return
    }
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false
    });
    this.setData({
      recordList: [],
      is_show:false
    })
  },
  // 获得浏览历史列表
  async getBrowseHistory () {
    const { pageSize, currentPage, recordList } = this.data
    showLoading(this)
    const { data } = await getUserRecodrByPage(pageSize, currentPage)
    hideLoading(this)
    console.log(data);
    if (data.code !== 200) return
    const list = data.data?(data.data.data):[]
    const c_page = currentPage + 1
    // console.log('list',list);
    recordList.push(...list)
    recordList.sort(createComparisonFunction('browseDate'))
    // console.log('recordList',recordList);
    if (recordList.length <= 0) {
      this.setData({
        is_show:false
      })
    }
    this.setData({
      recordList,
      totalCount: data.data.totalCount,
      currentPage:c_page
    })
    wx.stopPullDownRefresh()
  },

  // 下拉刷新
  PullDownRefresh () {
    this.setData({
      currentPage: 1,
      recordList:[],
      totalCount: 0,
    })
    this.getBrowseHistory()
  },
  // 触底加载下一页
  reachBottom () {
    const { pageSize, currentPage, totalCount } = this.data
    if (currentPage > Math.ceil(totalCount / pageSize)) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      
    } else {
      this.getBrowseHistory()
    }
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
    this.setData({
      is_show:true
    })
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
    this.reachBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})