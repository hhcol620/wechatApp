// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// 排序
import { createComparisonFunction } from '../../../utils/sort_self.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_goodsList,delete_goods
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
    // 控制遮罩是否打开
    isShow: false,
    // 自己发布的二手商品列表
    goodsList: [],
    // pageSize
    pageSize: 5,
    // 当前页
    currrentPage: 1,
    // 数据总条数
    totalCount: 0,
    // 点击查看更多的 那条数据的id 
    id: '',
    // 控制主要数据是否显示
    is_show: true,
    // 加载图片基地址
    imgURL:''
  },
  // 页面加载 请求方法 获取自己发布的二手商品列表
  async getGoodsList () {
    const {
      pageSize,
      currrentPage,
      goodsList
    } = this.data
    showLoading(this)
    const {
      data
    } = await get_goodsList(pageSize,currrentPage)
    hideLoading(this)
    // console.log(data.code);
    if (data.code !== 200) {
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
    // 将页面大小和数据总条数和当前页记录一下 
    const totalCount = data.data.totalCount
    const list = data.data.data||[]
    // console.log(list);
    // 二次包装一下 提高速度
    const l = list.map((v) => {
      const title = v.title
      const productDesc = v.productDesc
      const mainPicUrl = v.mainPicUrl
      const browserTimes = v.browserTimes
      const collectTotal = v.collectTotal
      const salePrice = v.salePrice
      const createTime = v.createTime
      const id = v.id
      const state = v.state
      return {
        title,
        productDesc,
        mainPicUrl,
        browserTimes,
        collectTotal,
        salePrice,
        createTime,
        id,
        state
      }
    })
    let c_page = currrentPage+1
    goodsList.push(...l)
    goodsList.sort(createComparisonFunction('createTime'))
    if (goodsList.length<=0) {
      this.setData({
        is_show:false
      })
    }
    this.setData({
      goodsList: goodsList,
      currrentPage: c_page,
      totalCount:totalCount
    })
    wx.stopPullDownRefresh()
  },
  // 点击了更多  打开一个弹框
  more_btn(e) {
    // 这个就是这条数据的id值  存储一下 提供打开弹框后使用
    // console.log(e.currentTarget.dataset);
    const {id} = e.currentTarget.dataset
    this.setData({
      isShow: true,
      id: id
    })
  },
  // 隐藏遮罩弹框 
  onClickHide() {
    this.setData({
      isShow: false
    });
  },
  // 点击发布宝贝 跳转到发布页
  release_product() {
    wx.navigateTo({
      url: '/suppages/release/release_product/release_product',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 点击编辑  将id传到发布页面
  editFunc(e) {
    // 这个就是这条数据的id值
    // console.log(e.currentTarget.dataset);
    // 解构赋值 然后使用模板字符串拼接
    const {
      id
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/suppages/release/release_product/release_product?id=${id}`,
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });
  },
  async delete_commodity () {
    const  {id,goodsList} = this.data
    console.log(id);
    const { data } = await delete_goods(id)
    if (data.code !== 200) {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true
    });
    let list = goodsList
    list.forEach((v,i) => {
      if (v.id == id) {
        list.splice(i,1)
      }
    })
    this.setData({
      goodsList:list
    })
      
  },
  // 触底加载下一页
  reachBottom () {
    const { currrentPage,totalCount,pageSize } = this.data
    if (currrentPage <= Math.ceil(totalCount / pageSize)) {
      // 
      this.getGoodsList()
    } else {
      wx.showToast({
        title: '没有更多的数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
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
    this.setData({
      goodsList: [],
      // 当前页
      currrentPage: 1,
      totalCount: 0,
      is_show: true,
    })
    this.getGoodsList()
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