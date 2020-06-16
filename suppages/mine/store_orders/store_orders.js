import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 排序
import { createComparisonFunction } from '../../../utils/sort_self.js'
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';


import {
  getMyOrderList,
  getUserInfo,
  get_goodsInfo,
  cancel_order,
  finishOrder
} from '../../../request/api/store_api.js'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast.js'

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
    // tab 标签默认激活项 active
    active: 0,
    
    // 加载图片基地址
    imgURL: '',
    // 请求分页
    // 页面大小
    pageSize: 5,
    // 当前页
    currentPage: 1,
    // 总条数
    totalCount: 0,
    // 订单列表
    orderList: [],
    // tab  默认
    tabIndex: 0,
    // 控制主要数据是否显示
    is_show: true
  },
  // tab 切换
  async tabChange (e) {
    // console.log(e);
    const { index } = e.detail
    this.setData({
      // 当前页
      currentPage: 1,
      // 总条数
      totalCount: 0,
      // 订单列表
      orderList: [],
      tabIndex: index,
      is_show:true
    })
    if (index == 0) {
      await this.getOrderList_buy()
    } else if (index == 1) {
      await this.getOrderList_sale()
    }
  },
  // 跳转订单详情页
  toOrdersDetail (e) {
    // 订单id
    const {orderId,type} = e.detail
    // console.log('触发了',orderId,type);
    wx.navigateTo({
      url: `../../../suppages/mine/store_orders_detail/store_orders_detail?orderid=${orderId}&type=${type}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 买到的订单
  // 获取列表 这里面获取了列表
  async getOrderList_buy() {
    const {
      orderList,currentPage
    } = this.data
    showLoading(this)
    const {
      data
    } = await getMyOrderList(this.data.pageSize, this.data.currentPage, 2);
    hideLoading(this)
    if (data.code !== 200) return;
    const res = data.data||[]
    const List = res.data||[]
    console.log(List);
    if (orderList.length <= 0&&List.length===0) {
      this.setData({
        is_show:false
      })
    }
    List.forEach(async item => {
      const res = await this.getbuyerInfo(item.salerId)
      const goodsInfo = await this.getGoodsInfo(item.productId)
      item.salerInfo = res
      item.goodsInfo = goodsInfo
      orderList.push(item)
      orderList.sort(createComparisonFunction('createTime'))
      this.setData({
        orderList
      })
    })
    wx.stopPullDownRefresh()
    const total = res.totalCount
    let c_page = currentPage+1
    this.setData({
      totalCount: total,
      currentPage: c_page
    })
  },
  // 我卖出的订单
   // 获取列表 这里面获取了列表之后 需要触发一下父页面的值将值传到页面上
  async getOrderList_sale () {
    const { orderList, currentPage } = this.data
    showLoading(this)
    const{ data } = await getMyOrderList(this.data.pageSize, this.data.currentPage, 1);
    hideLoading(this)
    if (data.code !== 200) return;
    const res = data.data||[]
    const List = res.data||[]
    // console.log(List);
    if (orderList.length <= 0&&List.length===0) {
      this.setData({
        is_show:false
      })
    }
    List.forEach(async item => {
      const res = await this.getbuyerInfo(item.salerId)
      const goodsInfo = await this.getGoodsInfo(item.productId)
      item.goodsInfo = goodsInfo
      item.salerInfo = res
      orderList.push(item)
      orderList.sort(createComparisonFunction('createTime'))
      this.setData({
        orderList
      })
    })
    wx.stopPullDownRefresh()
    const total = res.totalCount
    let c_page = currentPage+1
    this.setData({
      totalCount: total,
      currentPage:c_page
    })
  },
  // 根据卖家id 查询卖家信息
  async getbuyerInfo(userId) {
    const res = await getUserInfo(userId)
    // console.log(res.data.data);
    return res.data.data
  },
  // 根据商品id 获取商品信息
  async getGoodsInfo(goodsId) {
    const {
      data
    } = await get_goodsInfo(goodsId)
    return data.data
  },
  // 取消订单
  async cancelOrder (e) {
    // console.log(e);
    let { orderList } = this.data
    const { orderid, type } = e.detail
    Dialog.confirm({
      title: '提示',
      message: (type==3)?'确认要取消这个订单吗?':'确定要删除这个订单吗?',
    })
      .then(async () => {
        const { data } = await cancel_order(type, orderid)
        if (data.code !== 200) {
          Toast.fail('操作失败')
          return 
        }
        if (type == 3) {
          Toast.success('您已成功取消订单')
        } else {
          Toast.success('您已成功删除订单')
        }
        orderList.forEach((v, i) => {
          if (v.id == orderid) {
            orderList.splice(i,1)
          }
        })
        this.setData({
          orderList
        })
      })
      .catch(() => {
        // on cancel
      });
   
  },
  // 完成订单
  async finish_order (e) {
    let orderId = e.detail
    const { data } = await finishOrder(orderId)
    // console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: '确认收货失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      
      return
    }
    Toast.success('确认收货成功')
    const { tabIndex } = this.data
    this.setData({
      // 当前页
      currentPage: 1,
      // 总条数
      totalCount: 0,
      // 订单列表
      orderList: [],
      is_show:true
    })
    if (tabIndex == 0) {
      await this.getOrderList_buy()
    } else if (tabIndex == 1) {
      await this.getOrderList_sale()
    }
  },
  // 下拉刷新
  async pullDownRefresh() {
    const { tabIndex } = this.data
    this.setData({
      pageSize: 5,
      // 当前页
      currentPage: 1,
      // 总条数
      totalCount: 0,
      // 订单列表
      orderList: []
    })
    if (tabIndex == 0) {
      await this.getOrderList_buy()
    } else if (tabIndex == 1) {
      await this.getOrderList_sale()
    }
  },
  // 触底加载下一页
  async reachBottom () {
    const { pageSize, currentPage, totalCount, tabIndex } = this.data
    if (currentPage <= Math.ceil(totalCount / pageSize)) {
      console.log('ok');
      if (tabIndex == 0) {
        await this.getOrderList_buy()
      } else if (tabIndex == 1) {
        await this.getOrderList_sale()
      }
    }
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList_buy()
    this.setData({
      imgURL
    })
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