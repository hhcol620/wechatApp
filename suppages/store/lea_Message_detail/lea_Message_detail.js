/// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_goodsInfo,
  get_leave_message_first,getUserInfo,getMyInfo
} from '../../../request/api/store_api.js'

import {
  get_recommend_byProductId,get_collect,delete_collect,isCollect,write_msg
} from '../../../request/api/store_front_api.js'


import {
  getTime
} from '../../../utils/getTime.js'
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
    inputShow: false,
    keyBoardHeight: "0px",
    // 一级留言的数据
    first_lea_msg: {},
    // 商品id
    productId:'',
    // 一级留言id
    first_classId:'',
    // placeholder
    placeholder:'',
    // 加载图片基地址
    imgURL: '',
    // 加载二级留言的信息
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    // 二级留言
    sec_msg: [],
    // 留言输入框中内容
    msg_content: '',
    // 回复的信息  
    parentId: '',
    firstClassId: '',
    // placeholder 提示内容
    placeHolder: '',
    sendername:''
    
  },
  // 给二级留言回复 placeholder
  async replyFunc (e) {
    const { placeHolder } = this.data
    // console.log('点击了回复');
    // 留言id firstClassId
    const { id, firclassid,sendername } = e.currentTarget.dataset
    console.log(id, firclassid);
    let placeholder = sendername?`回复 @ ${sendername}`:'看对眼要留言,问问更多的细节~'
    this.setData({
      placeHolder: placeholder,
      sendername,
      inputShow: !this.data.inputShow,
      parentId: id,
      firstClassId: firclassid
    })
  },
  // 给一级留言回复
  reply_fir () {
    const { first_classId } = this.data

    this.setData({
      inputShow: !this.data.inputShow,
      parentId: -1,
      firstClassId:first_classId
    })
  },
  async sendFunc () {
    const { parentId,firstClassId } = this.data
    const access_token = wx.getStorageSync('access_token');
    if (!access_token) {
      // 未登录
      wx.showToast({
        title: '您还未登录',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return
    }
    console.log('点击了发送');
    const { productId, msg_content } = this.data
    const obj = {
      productId: productId,
      content: msg_content,
      firstClassId,
      parentId
    }
    // 这个里面都是给商品的留言  产生的是一级留言
    const { data } = await write_msg(obj)
    console.log(data);
    if (data.code !== 200) {
      // 失败
      wx.showToast({
        title: '回复失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      }); 
      return
    }
    wx.showToast({
      title: '回复成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true
    });
    // 从本地取出数据伪造假数据
    const userInfo = await this.get_my_Info()
    const { sendername } = this.data
    userInfo.pic = userInfo.portrait||''
    const parentWriterInfo = {
      nickname: sendername
    }
    const msg = {
      createTime:getTime(),
      content: msg_content,
      replyTotal: 0,
      consumerInfo: userInfo,
      parentWriterInfo
    } 
    // console.log(msg);
    // 将这个msg插入到一级留言的头部
    const { sec_msg,totalCount } = this.data
    sec_msg.unshift(msg)
    console.log(sec_msg);
    const count = totalCount+1
    this.setData({
      sec_msg,
      totalCount:count
    })
      
  },
  // 根据商品id 一级留言的id 获取二级留言信息
  // 根据一级留言查询其下的留言信息
  async get_leave_message_second(id, firstClassId) {
    const { pageSize,currentPage,totalCount,sec_msg } = this.data
    const {
      data
    } = await get_leave_message_first(pageSize, currentPage, id, 0, firstClassId)
    if (data.code !== 200) {
      return
    }
    const list = data.data.data||[]
    list.forEach(async (v,i) => {
      v.consumerInfo = await this.getUserInfoById(v.consumerId)
      v.parentWriterInfo = await this.getUserInfoById(v.parentWriterId) || {}
      sec_msg.push(v)
      this.setData({
        sec_msg
      })
    })
    let current_page = currentPage+1
    this.setData({
      currentPage: current_page,
      totalCount:data.data.totalCount
    })
  },
  // 根据用户id获得用户信息
  async getUserInfoById (consumerId) {
    const { data } = await getUserInfo(consumerId)
    // console.log(data.data);
    return data.data
  },
  // 输入框获得焦点
  inputFocus (e) {
    const h = e.detail.height + 'px'
    console.log(h);
      this.setData({
        keyBoardHeight: h
      })
    },
   // 输入框脱焦
   inputBlur () {
    this.setData({
      inputShow:!this.data.inputShow
    })
  },
  // 获取输入框中数据
  getData (e) {
    const {name} = e.currentTarget.dataset
    const value = e.detail
    // console.log(name);
    this.setData({
      [name]:value
    })
  },
  // 获取自己的信息
  async get_my_Info () {
    const { data } = await getMyInfo()
    return data.data
  },


  // 页面滚动
  onPageScroll (e) {
  },
  // 页面尺寸变化
  onResize (e) {
    
  },
  reachBottom () {
    const { pageSize,currentPage,totalCount,productId,first_classId } = this.data
    if (currentPage > Math.ceil(totalCount / pageSize)) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return
    }
    this.get_leave_message_second(productId,first_classId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // 商品id 一级留言id
    const { id, classid,item } = options
    // console.log(options);
    let arr = JSON.parse(item)
    this.get_leave_message_second(id, classid)
    this.setData({
      imgURL,
      first_lea_msg: arr[0],
      productId: id,
      first_classId:classid
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