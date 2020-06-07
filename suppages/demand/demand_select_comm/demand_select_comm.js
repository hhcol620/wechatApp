// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'

import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';


// 排序
import { createComparisonFunction } from '../../../utils/sort_self.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_goodsList,post_demand_reply_lea_msg
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



// suppages/mine/store_release_product/store_release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 需求 id
    demandId:'',
    // 自己发布的二手商品列表
    goodsList: [],
    // pageSize
    pageSize: 10,
    // 当前页
    currrentPage: 1,
    // 数据总条数
    totalCount: 0,
    // // 被选中的商品id
    id: '',
    // 加载图片基地址
    imgURL:''
  },
  // 页面加载 请求方法 获取自己发布的二手商品列表
  async getGoodsList () {
    showLoading(this)
    let { pageSize,currrentPage,totalCount,goodsList } = this.data
    const {
      data
    } = await get_goodsList(pageSize, currrentPage)
    // console.log(data.code);
    if (data.code !== 200) {
      hideLoading(this)
      // 提醒用户获取信息失败
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return
    }
    // 获取信息成功  将数据渲染到页面上
    console.log(data);
    const list = data.data.data
    totalCount = data.data.totalCount
    let c_page = currrentPage+1
    const l = list.map((v) => {
      const title = v.title
      const productDesc = v.productDesc
      const mainPicUrl = v.mainPicUrl
      const browserTimes = v.browserTimes
      const salePrice = v.salePrice
      const id = v.id
      return {
        title,
        productDesc,
        mainPicUrl,
        browserTimes,
        salePrice,
        id
      }
    })
    // console.log('l',l);
    goodsList.push(...l)
    goodsList.sort(createComparisonFunction('createTime'))
    this.setData({
      goodsList,
      totalCount,
      currrentPage:c_page
    })
    hideLoading(this)
    wx.stopPullDownRefresh()
  },
  // 点击商品  表示选中
  selectGoods (e) {
    const { goodsid } = e.currentTarget.dataset
    // console.log(goodsid);
    this.setData({
      id: goodsid
    })

  },
  // 点击了确定
  async submitFunc () {
    const { id } = this.data 
    if (!id) {
      // 
      Toast('您还没有选择商品,请选择商品后确认回复');
      return
    }
    await this.post_demand_comm()
  },
  // 提交商品留言  demandId   targetId 
  async post_demand_comm () {
    const { demandId,id } = this.data
    const obj = { demandId,targetId:id }
    const { data } = await post_demand_reply_lea_msg(obj)
    // console.log(data);
    if (data.code !== 200) {
      Toast('确认回复失败')
      return 
    }
    Toast.success('回复成功')
    setTimeout(function() {
      wx.navigateBack({
        delta: 1
      });
    },500) 
  },
  // 触底加载下一页
  reachBottom () {
    const { pageSize, currrentPage, totalCount } = this.data
    if (currrentPage > Math.ceil(totalCount / pageSize)) {
      // 没有更多数据了
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return 
    }
    // 继续加载下一页
    this.getGoodsList()
  },
  // 下拉刷新
  pullDownRefresh () {
    this.setData({
      goodsList: [],
      // 当前页
      currrentPage: 1,
      totalCount: 0
    })
    this.getGoodsList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { id } = options
    this.setData({
      demandId: id,
      imgURL
    })
    this.getGoodsList()
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