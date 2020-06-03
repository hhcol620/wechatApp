// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  releaseErrand
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


import Notify from '../../../miniprogram_npm/vant-weapp/notify/notify';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';


// suppages/release/release_product/release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 真实接口使用数据
    // 描述
    mian_desc: '',
    // 要求
    requirement: '',
    // 价格
    price: '',
    // 地址
    address: '',
    // 手机号
    telNum: '',
    // 备注信息
    remark: '',
  },
  // 点击立即发布 
/* 需要进行的  获取每一项中的数据 判断合法性 然后提交 */
  // 先提示用户不可修改
  async Dia_user () {
    Dialog.confirm({
      title: '提示',
      message: '跑腿发布不可修改,确认发布吗',
    })
      .then(() => {
        // on confirm
        this.submit_btn()
      })
      .catch(() => {
        // on cancel
      });
  },
  async submit_btn() {
    const {
      mian_desc,
      requirement,
      price,
      address,
      telNum,
      remark
    } = this.data
    if (!mian_desc.trim() || !price.trim() || !requirement.trim()) {
      // 输入不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        //  禁止用户手抖连续点击
        mask: true
      });
    }

    // 发起提交请求
    const errandObj = {
      content: mian_desc,
      requirement: requirement,
      money: price,
      address: address,
      phoneNum: telNum,
      cypher: remark
    }
    const {
      data
    } = await releaseErrand(errandObj)
    console.log(data);
    if (data.code !== 200) {
      Notify({ type: 'warning', message: `${data.text}` });
      return
    }
    // 成功  提示成功 并后退一页
    // 提交成功   提示用户 然后回退上一页面
    Dialog.confirm({
      title: '提示',
      message: '您已成功发布跑腿,很快就会有人联系您呢,请保持手机畅通',
      asyncClose: true
    })
      .then(() => {
      clearTimeout(time)
      const time = setTimeout(() => {
        this.navigateBackFunc()
        Dialog.close();
      }, 1000);
    })
    .catch(() => {
      Dialog.close();
    });
    clearTimeout(time)
    const time = setTimeout(() => {
      this.navigateBackFunc()
      Dialog.close();
    }, 2000);
  },
  // 获取输入框中的数据
  getInputData(e) {
    const name = e.target.dataset.name.toString()
    const value = e.detail.value
    this.setData({
      [name]: value
    })
    // console.log(e);
  },
  // 跳转到上一个页面
  navigateBackFunc() {
    wx.navigateBack({
      delta: 1
    })
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