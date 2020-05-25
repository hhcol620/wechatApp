// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// 引入  用来发送请求的方法  需要将路径补全
import {
  getUserInfo
} from '../../../request/api/store_api.js'

import {
  get_goods_recommend_offline
} from '../../../request/api/store_front_api.js'

//index.js
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
    // 以下三个初始化页面上的数据 可以不跟后台交互显示
    longPic: {
      url: 'https://ae01.alicdn.com/kf/Hbbc29ecf96d2418cb5d2c4e010364d60M.jpg',
      keywords:'二手商品'
    },
    topPic: [
      {
        url: 'https://ae01.alicdn.com/kf/Hb5799a13a2a644e6977399a7460033f6o.jpg',
        keywords: '二手书'
      },
      {
        url: 'https://ae01.alicdn.com/kf/Hffaced681cd94fc282c6f5e425cf62abg.jpg',
        keywords: '二手笔记本'
      },
      {
        url: 'https://ae01.alicdn.com/kf/H963e8ded4418479cabbc5a6d73c1adf3q.jpg',
        keywords: '数码电子'
      },
      {
        url: 'https://ae01.alicdn.com/kf/Hdb25033d90534cf6a610ef978f1e9eae3.jpg',
        keywords: '手机平板'
      }

    ],
    bottomPic: [
      {
        url: 'https://ae01.alicdn.com/kf/Ha6b2c57f35c449499b2bc1904c64e920W.jpg',
        keywords: '墨菲定律'
      },
      {
        url: 'https://ae01.alicdn.com/kf/H6d9faab2920945ffbd1812603343c385q.jpg',
        keywords: '别在吃苦的年纪选择安逸'
      },
    ],
    // 加载图片基地址
    imgURL: '',
    // 推荐的列表
    recommend_offline: [],
    // 请求推荐的分页 
    pageSize: 10,
    currentPage: 1,
    totalCount: 0
  },
  // 首页的推荐 猜你喜欢
  async get_recommend_offline () {
    const { pageSize,currentPage,totalCount,recommend_offline } = this.data
    const { data } = await get_goods_recommend_offline(pageSize,currentPage)
    console.log(data);
    if (data.code !== 200) {
      // 获取推荐列表失败
      return 
    }
    let list = data.data.data
    list.forEach(async item => {
      const consumerInfo = await this.getUserInfoById(item.consumerId)
      item.consumerInfo = consumerInfo
      recommend_offline.push(item)
      this.setData({
        recommend_offline
      })
    })
  },
  // 根据用户id获得用户信息
  async getUserInfoById(consumerId) {
    const {
      data
    } = await getUserInfo(consumerId)
    // console.log(data.data);
    return data.data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgURL
    })
    this.get_recommend_offline()
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