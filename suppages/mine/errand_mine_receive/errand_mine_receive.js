// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getErrandOrder,deleteErrandOrder
} from '../../../request/api/store_api.js'


import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData




// suppages/mine/errand_mine_receive/errand_mine_receive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认激活
    active: 0,
    // 这三个都是请求的参数
    stateObj: {
      pageSize:5,
      currentPage: 1,
      totalCount: 0
    },
    // 请求回来的数据存储
    errandList:[],
  },
  // 获取我发布的跑腿订单   state  3 未完成  4已完成
  async getStateErrandList (state) {
    const { pageSize, currentPage } = this.data.stateObj
    const { errandList } = this.data
    const { data } = await getErrandOrder(pageSize, currentPage,2, state)
    console.log(data);
    if (data.code !== 200) {
      return
    }
    const list = data.data.data
    errandList.push(...list)
    // 关闭顶部加载loading
    wx.stopPullDownRefresh()
    this.setData({
      ['stateObj.totalCount']:data.data.totalCount,
      errandList
    })
  },
  // 切换clickTabs  根据不同的tab选项  重新发起请求
  clickTabs (e) {
    // console.log(e);
    const { index } = e.detail
    this.setData({
      ['stateObj.totalCount']: 0,
      ['stateObj.currentPage']: 1,
      errandList: [],
      active:index
    })
    
    if (index === 0) {
      this.getStateErrandList(3)
    } else if (index === 1) {
      this.getStateErrandList(4) 
    }
  },
  // 删除某一个订单 
  deleteErrand (e) {
    // console.log(e.detail);
    const { errandList } = this.data
    const id = e.detail
    Dialog.confirm({
      message: '确定删除吗'
    }).then(async () => {
      const res = this.deleteErrandOrders(id)
      // console.log(res.code);
      if (res.code !== 200) {
        return
      }
      // 这里进行一个遍历循环  然后本地删除id对应的一项
      errandList.forEach((item,index) => {
        if (item.id == id) {
          console.log('id是',id);
          // 删除这一项
          errandList.splice(index,1)
        }
      })
      this.setData({
        errandList
      })
    }).catch(() => {
      // on cancel
    });
  },
  // 传进来 作为买家  type传5 第二个参数传id
  async deleteErrandOrders (id) {
    const { data } = await deleteErrandOrder(6, id)
    console.log(data);
  },
  // 下拉刷新
  pullDownRefresh () {
    const index = this.data.active
    this.setData({
      ['stateObj.totalCount']: 0,
      ['stateObj.currentPage']: 1,
      errandList: []
    })
    
    if (index === 0) {
      this.getStateErrandList(3)
    } else if (index === 1) {
      this.getStateErrandList(4) 
    }
  },
  // 触底加载 
  reachBottom () {
    const index = this.data.active
    const { pageSize,currentPage,totalCount } = this.data.stateObj
    if (currentPage <= Math.ceil(totalCount / pageSize)) {
      if (index === 0) {
        this.getStateErrandList(3)
      } else if (index === 1) {
        this.getStateErrandList(4) 
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 默认传进去 3
     this.getStateErrandList(3)
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
    this.pullDownRefresh()
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