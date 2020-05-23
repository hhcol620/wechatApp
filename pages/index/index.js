// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import { get_swipers,getProductBriefById } from '../../request/api/api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const { showLoading,hideLoading } = app.globalData

Page({
  data: {
    // 轮播图数组
    swiperList:[]
  },
  async getSwiper () {
    showLoading()
    // const res = await get_swipers()
    // console.log(res);
    // this.setData({
    //   swiperList:res.data.message
    // })
    hideLoading()
  },
  // 根据商品id获得商品的信息
  async getGoodsMessage () {
    showLoading()
    // const res = await getProductBriefById(1)
    // console.log('信息',res);
    hideLoading()
  },
  // 跳转到通知页
  to_school_inform () {
    wx.navigateTo({
      url: '/pages/school_inform/school_inform',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    }); 
  },
  // 跳转到广告页
  to_advertising () {
    wx.navigateTo({
      url: '/pages/advertising/advertising',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
   // 页面开始加载 就会触发
  onLoad: function() { 
    this.getSwiper();
    this.getGoodsMessage();
  }
})
