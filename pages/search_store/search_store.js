import regeneratorRuntime from '../../lib/runtime/runtime.js'

import { get_search_content } from '../../request/api/store_front_api.js'

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
        text: '最新发布',
        value: 0
      },
      {
        text: '价格从高到底',
        value: 1
      },
      {
        text: '综合排序',
        value: 2
      }
    ],
    // 下拉默认选中项
    selectValue: 1,
    // 是否展示侧边弹出层
    show: false,
    // 测试多选框
    way_checkbox_items: [{
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
    // 测试单选框
    type_ridio_items: [{
        name: '9成新以上',
        value: '10',
        checked: false
      },
      {
        name: '8成新以上',
        value: '20',
        checked: false
      },
      {
        name: '7成新以上',
        value: '30',
        checked: false
      },
      {
        name: '6成新以上',
        value: '40',
        checked: false
      },
      {
        name: '其他成色',
        value: '50',
        checked: false
      },
    ],
    searchContent:'',
    // 请求分页 
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    // 列表数据
    goodsList: [],
    // 加载图片基地址
    imgURL:''
  },

  // 单选框
  handleItemChange(e) {
    const {
      index
    } = e.detail
    const arr = JSON.parse(JSON.stringify(this.data.type_ridio_items))
    arr.forEach((i, v) => v === index ? i.checked = true : i.checked = false)
    this.setData({
      type_ridio_items: arr
    })
  },
  // 多选框
  checkboxItemChange(e) {
    // console.log(e.detail.index);  这个是被点击的索引
    const {
      index
    } = e.detail
    const arrList = JSON.parse(JSON.stringify(this.data.way_checkbox_items))
    arrList.forEach((v, i) => {
      if (i === index) {
        if (v.checked == true) {
          v.checked = false
        } else {
          v.checked = true
        }

      }
    })
    this.setData({
      way_checkbox_items: arrList
    })
  },
  // 获取输入框中数据
  getInputData (e) {
    const { name } = e.currentTarget.dataset
    const value = e.detail
    this.setData({
      [name]: value
    })
  },

  // 输入框确认事件
  async search_submit() {
    // 您点击了确定
    console.log('ok');
    // 这个位置开始搜索
    const { pageSize, currentPage, searchContent } = this.data
    const { data } = await get_search_content(pageSize, currentPage, searchContent)
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
    let { goodsList, totalCount } = this.data
    totalCount = data.data.totalCount
    const list = data.data.data
    // console.log(list);
    goodsList.push(...list)
    console.log('goodsList',goodsList);
    this.setData({
      totalCount,
      goodsList
    })

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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