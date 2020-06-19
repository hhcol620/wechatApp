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
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast.js';


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
    // requirement: '',
    // 价格
    price: '',
    // 地址
    address: '',
    // 手机号
    telNum: '',
    // 备注信息
    remark: '',
    // 到达时间  用于显示 10h 58min
    datetime_show: '',
    // 到达时间  用于传给后台
    datetime_server: '',
    // 时间
    currentDate: '00:30',
    minHour: 0,
    maxHour: 30,
    // 打开时间弹框
    time_show: false
  },
  // 点击立即发布 
  /* 需要进行的  获取每一项中的数据 判断合法性 然后提交 */
  // 先提示用户不可修改
  async Dia_user() {
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
      datetime_server,
      price,
      address,
      telNum,
      remark
    } = this.data
    if (!mian_desc.trim() || !price.trim() || !datetime_server) {
      // 输入不合法
      wx.showToast({
        title: '请输入必要的信息',
        icon: 'none',
        //  禁止用户手抖连续点击
        mask: false
      });
    }

    // 发起提交请求
    const errandObj = {
      content: mian_desc,
      requirement: datetime_server,
      money: price,
      address: address,
      phoneNum: telNum,
      cypher: remark
    }
    showLoading(this)
    const {
      data
    } = await releaseErrand(errandObj)
    hideLoading(this)
    console.log(data);
    if (data.code !== 200) {
      Toast.fail(`${data.text}`)
      return
    }
    // 订单id
    let id = data.data
    // 价格
    let money = price
    // 成功  提示成功 并后退一页
    // 提交成功   提示用户 然后回退上一页面
    Dialog.alert({
        title: '提示',
        message: '您需要支付佣金,在物品送达后,您点击完成,我们将佣金转给接单人',
        asyncClose: true
      })
      .then(() => {
        clearTimeout(time)
        const time = setTimeout(() => {
          // this.navigateBackFunc()
          wx.redirectTo({
            url: `/suppages/release/errand_pay/errand_pay?money=${money}&id=${id}`
          });
            
          Dialog.close();
        }, 1000);
      })
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
  // 输入时间
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  // 打开输入时间弹框
  opentime() {
    this.setData({
      time_show: true
    })
  },
  // 隐藏输入时间弹出层
  onClickHide() {
    this.setData({
      time_show: false
    });
  },
  // 时间输入框中点击了确认 
  time_confirm (event) {
    let date = event.detail
    let arr = date.split(':')
    // 总分钟数
    let mins = arr[0] ? ((arr[0] * 60-0) + (arr[1]-0)):(arr[1]-0)
    // 显示到页面的方式
    let str = arr[0]+'h '+arr[1]+'min'
    this.setData({
      currentDate: date,
      datetime_show: str,
      datetime_server:mins,
      time_show: false
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