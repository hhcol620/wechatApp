// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_swipers
} from '../../../request/api/api.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading
} = app.globalData

Page({
  data: {
    // 展示输入框
    inputShow: false,
    // 设置输入框位置
    keyBoardHeight: "0px"
  },
  // 方法
  // 点赞
  upFunc() {
    console.log('点击了点赞');
  },
  // 回复
  replyFunc() {
    console.log('点击了回复');
    this.setData({
      inputShow: !this.data.inputShow
    })
  },
  // 收藏
  collectFunc() {
    console.log('点击了点赞');
  },
  // 立即购买
  toPayFunc() {
    console.log('点击了立即购买,发起请求生成预订单');
    wx.navigateTo({
      url: '../creat_order/creat_order',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  // 输入框获得焦点
  inputFocus(e) {
    const h = e.detail.height + 'px'
    console.log(h);
    this.setData({
      keyBoardHeight: h
    })
  },
  // 输入框脱焦
  inputBlur() {
    this.setData({
      inputShow: !this.data.inputShow
    })
  },
  // 点击了发送
  send() {

  },
  // 页面开始加载 就会触发
  onLoad: function() {}
})