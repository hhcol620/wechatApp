import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// 排序
import { createComparisonFunction } from '../../../utils/sort_self.js'

// suppages/mine/store_orders/store_orders.js
import {
  getAllErrandList
} from '../../../request/api/store_api.js'

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
    // active: 'new',
    // 跑腿信息列表
    errandList: [],
    // 页面大小  
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // total
    totalCount:0,
    // 默认激活项
    index: 0
  },
  // 获取跑腿信息
  async getErrandList (pageSize, currentPage, typ) {
    showLoading(this)
    const { errandList } = this.data
    const {
      data
    } = await getAllErrandList(pageSize, currentPage, typ)
    wx.stopPullDownRefresh()
    // console.log(data);
    if (data.code !== 200) {
      hideLoading(this)
      // 失败
      return 
    }
    let c_page = currentPage + 1
    // console.log(c_page);
    const arr = data.data.data
    // console.log('arr',arr);

    // let list = errandList.push(...arr)
    arr.forEach((v, i) => {
      errandList.push(v)
      if (typ == 1) {
        errandList.sort(createComparisonFunction('createTime'))
      } else if(typ == 2 ) {
        errandList.sort(createComparisonFunction('price'))
      }
    })
    // console.log(list);
    // 成功
    this.setData({
      errandList,
      currentPage: c_page,
      totalCount:data.data.totalCount
    })
    hideLoading(this)
  },
  // tab 切换
  tabChange (e) {
    const {
      index
    } = e.detail
    this.setData({
      errandList: [],
      // 页面大小  
      pageSize: 10,
      // 当前页
      currentPage: 1,
      totalCount:0,
      index
    })
    const { pageSize, currentPage } = this.data
    // console.log(e);
    // 获取标识符 如果根据标识符发起不同的请求
    
    if (index === 0) {
      // typ 设置为1
    this.getErrandList(pageSize, currentPage,1)

    } else if (index === 1) {
      // typ设置为2
    this.getErrandList(pageSize, currentPage,2)
    }
  },
  // 跳转发布页
  releaseFunc () {
    wx.navigateTo({
      url: '../../release/errand/errand',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 下拉刷新
  pullDownRefresh () {
    this.setData({
      currentPage: 1,
      totalCount: 0,
      errandList: []
    })
    const { index,pageSize,currentPage } = this.data
    if (index === 0) {
      // typ 设置为1
    this.getErrandList(pageSize, currentPage,1)

    } else if (index === 1) {
      // typ设置为2
    this.getErrandList(pageSize, currentPage,2)
    }
  },
  // 触底加载下一页
  reachBottom () {
    const { index, pageSize, currentPage, totalCount } = this.data
    if (currentPage > Math.ceil(totalCount / pageSize)) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      }); 
      return
    }
    if (index === 0) {
      // typ 设置为1
    this.getErrandList(pageSize, currentPage,1)

    } else if (index === 1) {
      // typ设置为2
    this.getErrandList(pageSize, currentPage,2)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { pageSize, currentPage } = this.data
    // 默认第三个参数设置为1
    this.getErrandList(pageSize, currentPage,1)
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
    this.pullDownRefresh()
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