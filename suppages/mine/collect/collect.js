// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getMyProductCollectList,
  getUserInfo,
  get_collect,
  delete_collect,
  delete_collect_all,
  isCollect
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

// suppages/store/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  是否已经收藏了
    isCollect: false,
    collectList: [],
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    imgURL: ''
  },
  // 点击收藏按钮
  collectFunc(e) {
    // const collect = !this.data.isCollect
    const { collectList } = this.data
    // 通过item.id 查找那一项的
    const { id,type } = e.currentTarget.dataset
    console.log(id, type);
    collectList.forEach(async item => {
      if (id === item.id) {
        if (item.isCollect === 1) {
          // 发起取消收藏的请求
          const r = await this.toCollect(type, id)
          if (r) {
            // 操作成功
            item.isCollect = 0
          }
        } else {
          // 发起收藏的请求
          const r = await this.cancelCollect(id)
          if (r) {
            item.isCollect = 1
          }
        }
        this.setData({
          collectList
        })
      }
    })
  },
  // 获取收藏列表
  async getCollectList() {
    const {
      pageSize,
      currentPage,
      collectList
    } = this.data
    const {
      data
    } = await getMyProductCollectList(pageSize, currentPage)
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
    const arrList = data.data.data
    arrList.forEach(async (item) => {
      // item.consumerId
      const res = await this.get_user_info(item.userId)
      const isCollectInfo = await this.is_Collect(item.type, item.id)
      item.isCollect = isCollectInfo
      item.consumerInfo = res
      // console.log(item);
      collectList.push(item)
      this.setData({
        collectList
      })
    })


  },
  // 根据用户id  consumerId  获取用户信息
  async get_user_info (consumerId) {
    if (!consumerId) {
      return 
    }
    const {
      data
    } = await getUserInfo(consumerId)
    // console.log(data.data);
    const result = data.data
    return result
  },
  // 收藏
  async toCollect (type,id) {
    const { data } = await get_collect(type, id)
    console.log(data);
    if (data.code !== 200) {
      return 
    }
    return true
  },
  // 取消收藏  参数type 和id
  async cancelCollect (id) {
    const { data } = await delete_collect(id)
    if (data.code !== 200) {
      return 
    }
    return true
  },
  // 取消收藏全部   感觉这个一般不用
  // 判断是否收藏
  async is_Collect (type,id) {
    const { data } = await isCollect(type, id)
    console.log(data);
    return data.data
  },
  // 跳转商品详情页
  toCommodity (e) {
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
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollectList()
    // this.is_Collect(1,4)
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