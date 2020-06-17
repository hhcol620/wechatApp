import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 排序
import { createComparisonFunction } from '../../../utils/sort_self.js'


// suppages/store/inform/inform.js
import {
  getSystemInfoSync
} from "../../../miniprogram_npm/vant-weapp/common/utils";
import {
  getSystemNews,get_read_all
} from '../../../request/api/store_api.js'

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
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    evaluateList: [],
    // 控制主要数据是否显示
    is_show: true
  },

  async getSystemInfo() {
    const {
      pageSize,
      currentPage,
      totalCount,
      evaluateList
    } = this.data
    showLoading(this)
    const {
      data
    } = await getSystemNews(pageSize, currentPage)
    hideLoading(this)
    // console.log(data.data.data);

    if (data.code !== 200) return;
    wx.stopPullDownRefresh()
    this.data.totalCount = data.data.totalCount;
    let cpage = currentPage + 1
    let list = data.data.data||[]
    evaluateList.push(...list)
    evaluateList.sort(createComparisonFunction('createTime'))
    if (evaluateList.length <= 0) {
      this.setData({
        is_show:false
      })
    }
    
    this.setData({
      evaluateList: evaluateList,
      currentPage: cpage
    })
    
  },
  // 查看更多 
  /* 
    30-跑腿订单通知  40-商城订单通知 50-商城公益基金 60-商城评价
  
  */
  view_more(e) {
    // console.log(e.currentTarget.dataset);
    const {
      newstype,targetid
    } = e.currentTarget.dataset
    console.log(newstype,targetid);
    switch (newstype) {
      case 30:
        // 跳转到跑腿订单
        wx.navigateTo({
          url: `/suppages/mine/errand_order_detail/errand_order_detail?id=${targetid}`,
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
        break;
      case 40:
          // 商城订单通知
          wx.navigateTo({
            url: `/suppages/mine/store_orders_detail/store_orders_detail?orderid=${targetid}`,
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
        break;
      case 50:
            // 跳转商城公益基金
            wx.navigateTo({
              url: `/suppages/public_service/public_service_detail/public_service_detail?id=${targetid}&type=5`,
              success: (result) => {
                
              },
              fail: () => {},
              complete: () => {}
            });
        break;
      case 60:
          // 跳转到商城评价
        wx.navigateTo({
          url: `/suppages/mine/store_orders_detail/store_orders_detail?orderid=${targetid}`,
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
        break;
      default:
        // 提示未知错误
        wx.showToast({
          title: '未知错误',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false
        });
          
        break;
    }
  },

  // 进入这个页面  全部标记已读  系统通知传1
  async sign_read_all () {
    const { data } = await get_read_all(1)
    console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: '未知错误',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
        
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSystemInfo()
    this.sign_read_all()
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
    this.setData({
      currentPage: 1,
      totalCount: 0,
      evaluateList: []
    })
    this.getSystemInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 页面触底进行判断 是否还有下一页 有下一页的话则请求  无则提示
    const { pageSize, currentPage, totalCount } = this.data
    let num = Math.ceil((totalCount / pageSize))
    if (currentPage <= num) {
      // 可以请求
      this.getSystemInfo()
    } else {
      wx.showToast({
        title: '客官,没有更多了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})