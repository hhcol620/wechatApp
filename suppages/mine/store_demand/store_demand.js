// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import { get_demandList,delete_demand } from '../../../request/api/store_api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const { showLoading,hideLoading } = app.globalData



// suppages/mine/store_release_product/store_release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制遮罩是否打开
    isShow: false,
    // 存储我的需求列表
    demandList: [],
    // 点击更多的项的id值
    id:''
    
  },
  // 记录停留在这个页面的时间
  time: 0,

  // 点击了更多  打开一个弹框
  more_btn (e) {
    let i = e.currentTarget.dataset.id
    console.log(i);
    // 将这个id存到data中  提供后面点击删除使用
    this.setData({
      isShow: true,
      id:i
    })
  },
  // 隐藏遮罩弹框 
  onClickHide() {
    this.setData({
      isShow: false
    });
  },
  // 页面加载 发起请求 获取分页需求列表
  async get_demand_List () {
    showLoading()
    const { data } = await get_demandList(1, 1)
    hideLoading()
    // console.log(data);
    if (data.code !== 200) {
      // 请求失败 提示用户获取信息失败
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return  
    }
    // 获取成功
    const list = data.data.data
    console.log(list);
    // 将需要填充到页面上的数据 放到一起
    const l = list.map((v) => {
      const content = v.content
      const mainImg = v.mainPic
      const topic = v.topic
      const id = v.id
      return {
        content,
        mainImg,
        topic,
        id
      }
    })
    this.setData({
      demandList:l
    })
      
  },
  // 点击了删除需求
  async delete_demand () {
    const { data } = await delete_demand(3)
    // console.log(data.code);
    if (data.code !== 200) {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    }
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000,
      mask: true
    });
  },
  // 点击编辑  进入发布需求页进行更改
  /* 将id传到发布页面 */
  editFunc (e) {
    // 获取id值
    // console.log(e.target.dataset.id);
    // console.log('您点击了编辑');
    // 这里使用了 es6 的模板字符串
    let id = e.target.dataset.id
    wx.navigateTo({
      url: `/suppages/release/release_demand/release_demand?id=${id}`,
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 点击发布需求  进入发布需求页
  release_demand () {
    wx.navigateTo({
      url: '/suppages/release/release_demand/release_demand',
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_demand_List()
    this.time = (new Date()).valueOf()
    // (new Date()).valueOf()
    // console.log(this.time);
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
    let time_after = (new Date()).valueOf()
    console.log(time_after - this.time);
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