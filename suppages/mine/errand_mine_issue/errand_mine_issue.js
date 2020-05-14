// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getMyErrandOrder,deleteErrandOrder,finishErrandOrder
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




Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认激活
    active: 0,
    // 这三个都是请求的参数
    stateObj: {
      pageSize: 10,
      currentPage: 1,
      totalCount: 0
    },
    // 请求回来的数据存储
    errandList:[],
  },
  // 获取我发布的跑腿订单   state  2 没有被接单的  3 已经被接单   4已完成
  async getStateErrandList (state) {
    const { pageSize,currentPage} = this.data.stateObj
    const { data } = await getMyErrandOrder(pageSize, currentPage, state)
    // console.log(data);
    if (data.code !== 200) {
      return
    }
    this.setData({
      ['stateObj.totalCount']:data.data.totalCount,
      errandList:data.data.data
    })
  },
  // 切换clickTabs
  async clickTabs (e) {
    // console.log(e);
    this.setData({
      ['stateObj.totalCount']: 0,
      ['stateObj.currentPage']: 1,
      errandList:[]
    })
    const { index } = e.detail
    if (index === 0) {
      await this.getStateErrandList(2)
    } else if (index === 1) {
      await this.getStateErrandList(3) 
    } else if (index == 2) {
      await this.getStateErrandList(4)
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
      const res = await this.deleteErrandOrder(id)
      // console.log(res.code);
      if (res.code !== 200) {
        Dialog.confirm({
          message: `${res.text}`
        })
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
  // 点击完成
  finishErrand (e) {
    // console.log(e.detail);
    const { errandList } = this.data
    const id = e.detail
    Dialog.confirm({
      message: '亲点击确定表示已经收到货了'
    }).then(async () => {
      const res = await this.finish_errand_order(id)
      if (res.code !== 200) {
        Dialog.confirm({
          message: `${res.text}`
        })
        return
      }
      // 这里进行一个遍历循环  然后本地删除id对应的一项
      errandList.forEach((item,index) => {
        if (item.id == id) {
          // console.log('id是',id);
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
  // 点击完成
  async finish_errand_order (id) {
    const { data } = await finishErrandOrder(id)
    return data
  },
  // 传进来 作为发起人  type传5 第二个参数传id
  async deleteErrandOrder (id) {
    const { data } = await deleteErrandOrder(5, id)
    return data
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 默认传进去 2 
    this.getStateErrandList(2)
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