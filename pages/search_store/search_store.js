import regeneratorRuntime from '../../lib/runtime/runtime.js'


import {
  getUserInfo
} from '../../request/api/store_api.js'

import {
  get_search_content
} from '../../request/api/store_front_api.js'

const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData



// pages/search_store/search_store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉选择项
    option: [{
        text: '综合排序',
        value: 0
      },
      {
        text: '最新发布',
        value: 1
      },
      {
        text: '价格从高到低',
        value: 2
      },
      {
        text: '价格从低到高',
        value: 3
      }

    ],
    // 下拉默认选中项
    selectValue: 0,
    // 是否展示侧边弹出层
    show: false,
    // 单选框
    way_radio_items: [{
        name: '正常交易',
        value: '10',
        checked: false
      },
      {
        name: '公益捐赠',
        value: '20',
        checked: false
      },
    ],
    searchContent: '',
    // 请求分页 
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    // 列表数据
    goodsList: [],
    // 加载图片基地址
    imgURL: '',
    // 价格区间  
    // 最低价
    priceMin: '',
    // 最高价格
    priceMax: '',
    // 价格排序   2表示升序 1表示降序
    priceOrder: '',
    // 发布时间排序   2表示升序 1表示降序
    timeOrder: ''
  },

  // 单选框
  handleItemChange(e) {
    const {
      index
    } = e.detail
    const arr = JSON.parse(JSON.stringify(this.data.way_radio_items))
    arr.forEach((i, v) => v === index ? i.checked = true : i.checked = false)
    this.setData({
      way_radio_items: arr
    })
  },
  // 获取输入框中数据
  getInputData(e) {
    const {
      name
    } = e.currentTarget.dataset
    const {
      value
    } = e.detail
    this.setData({
      [name]: value
    })
  },
  // 搜索框获得焦点  跳转上一页
  toPrevious() {
    // wx.navigateTo({
    //   url: '/pages/search/search',
    //   success: (result) => {

    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });
    wx.navigateBack({
      delta: 1
    });


  },

  // 输入框确认事件  (pageSize, currentPage, keyword, priceMin, priceMax,tradeType)
  async search_submit() {
    // 您点击了确定
    // console.log('ok');
    // 这个位置开始搜索
    const {
      pageSize,
      currentPage,
      searchContent,
      priceMin,
      priceMax,
      way_radio_items,
      priceOrder,
      timeOrder
    } = this.data
    // 交易方式
    let tradeType = ''
    let trade_arr = way_radio_items.forEach((item) => {
      if (item.checked === true) {
        tradeType = item.value
      }
    })

    console.log('tradeType', tradeType);
    const {
      data
    } = await get_search_content(pageSize, currentPage, searchContent, priceMin, priceMax, tradeType, priceOrder, timeOrder)
    console.log(data);
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
    let {
      goodsList,
      totalCount
    } = this.data
    totalCount = data.data.totalCount
    const list = data.data.data
    // console.log(list);
    // goodsList.push(...list)
    list.forEach(async item => {
      let consumerInfo = await this.getUserInfoById(item.consumerId)
      item.consumerInfo = consumerInfo
      goodsList.push(item)
      this.setData({
        goodsList
      })
    })
    // console.log('goodsList', goodsList);
    this.setData({
      totalCount
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
  // 点击筛选 打开侧边选择
  openSider() {
    console.log('点击了筛选 打开侧边框');
    this.setData({
      show: true
    })
  },
  // 关闭侧边弹出框
  onClose() {
    this.setData({
      show: false
    });
  },
  // 点击了重置
  resetFunc() {
    const way_radio_items = [{
        name: '正常交易',
        value: '10',
        checked: false
      },
      {
        name: '公益捐赠',
        value: '20',
        checked: false
      },
    ]
    // 最低价
    const priceMin = ''
    // 最高价格
    const priceMax = ''
    this.setData({
      way_radio_items: way_radio_items,
      priceMin: priceMin,
      priceMax: priceMax
    })
  },
  // 点击了确定
  async submitFunc() {
    // 先清空
    this.setData({
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      goodsList: []
    })
    // 关闭侧边框 开始搜索
    this.onClose()
    await this.search_submit()
  },
  // 下拉选项发生了改变
  dropdown_getChange(e) {
    console.log(e);
    const value = e.detail
    console.log(value);
    /* value中的值对应着  {
        text: '综合排序',
        value: 0
      },
      {
        text: '最新发布',
        value: 1
      },
      {
        text: '价格从高到低',
        value: 2
      },
      {
        text: '价格从低到高',
        value: 3
      } */
    /* 综合排序的时候将 priceOrder timeOrder 都重置   */
    this.setData({
      goodsList:[]
    })
    switch (value) {

      case 0:
        this.setData({
          // 价格排序   2表示升序 1表示降序
          priceOrder: '',
          // 发布时间排序   2表示升序 1表示降序
          timeOrder: ''
        })
        this.search_submit()

        break;
      case 1:
        this.setData({
          // 价格排序   2表示升序 1表示降序
          priceOrder: '',
          // 发布时间排序   2表示升序 1表示降序
          timeOrder: 2
        })
        this.search_submit()

        break;
      case 2:
        this.setData({
          // 价格排序   2表示升序 1表示降序
          priceOrder: 1,
          // 发布时间排序   2表示升序 1表示降序
          timeOrder: ''
        })
        this.search_submit()

        break;
      case 3:
        this.setData({
          // 价格排序   2表示升序 1表示降序
          priceOrder: 2,
          // 发布时间排序   2表示升序 1表示降序
          timeOrder: ''
        })
        this.search_submit()

        break;

      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      keyword
    } = options
    this.setData({
      imgURL,
      searchContent: keyword
    })
    this.search_submit()
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
  onPullDownRefresh: function() {},

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