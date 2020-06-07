import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// suppages/mine/store_orders/store_orders.js
import {
  getErrand_detail,receiveErrand,getOrderState,getUserInfo
} from '../../../request/api/store_api.js'

import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData



// suppages/errand/errand_detail/errand_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 需求id
    id: '',
    // 控制隐私信息的显示
    isShow: false,
    // 存储用户公开信息对象
    public_mess: {},
    // 存储用户隐私信息的对象
    privacy_mess: {},
    // 是否正在加载
    isloading: true,
    
  },

  // 根据id获得跑腿的详细信息
  async getErrand_detail (id) {
    const { data } = await getErrand_detail(id)
    console.log(data);
    if (data.code !== 200) {
      // 失败
      return 
    }
    // 成功
    const pubMessage = data.data
    const publisherInfo = await this.get_userInfo(pubMessage.publisherId)
    pubMessage.publisherInfo = publisherInfo
    const privacyInfo = {
      phoneNum: pubMessage.phoneNum,
      cypher: pubMessage.cypher,
      name: pubMessage.publisherInfo.loginName
    }
    this.setData({
      public_mess: pubMessage,
      privacy_mess: privacyInfo
    })
  },
  // 立即接单
  async receive_order (e) {
    const { id,version } = this.data.public_mess
    // 发起请求
    const resTo = await this.toReceiveOrder(id, version)
    // console.log(resTo);
    if (resTo) {
      this.setData({
        isShow:true,
        isloading:true
      })
      // resTo.text
      const code  = resTo.text
      // 等待3秒发送请求
      let timer = null
      clearTimeout(timer)
      timer = setTimeout(
        async () => {
          const res = await this.get_order_state(code)
          if (res.code !== 200) {
            Dialog.alert({
              message: `${data.text}`,
            }).then(() => {
              this.setData({
                isShow:false
              })
            });
            // 失败
            return 
          }
          // 成功
          Dialog.alert({
            message: `${res.text}`,
          }).then(() => {
            this.setData({
              isShow: true,
              isloading:false
            })
          });
        },3000
      )
    }
  },
  // 关闭遮罩
  onClickHide () {
    this.setData({
      isShow:false
    })
  },
  // 点击接单之后 发起接单请求 
  async toReceiveOrder (id, version) {
    const { data } = await receiveErrand(id, version)
    console.log(data);
    if (data.code !== 200) {
      Dialog.alert({
        message: `${data.text}`,
      }).then(() => {
        this.setData({
          isShow:false
        })
      });
      // 失败
      return 
    }
    return data
  },
  // 发起接单请求之后  轮询 一个时间段内 间隔更小的一段时间 连续对服务器发起请求
  async get_order_state (code) {
    // 参数就是订单id
    const { data } = await getOrderState(code)
    if (data.code !== 200) {
      Dialog.alert({
        message: `${data.text}`,
      }).then(() => {
        this.setData({
          isShow:false
        })
      });
      // 失败
      return 
    }
    return data
  },
  // 根据用户id获得用户信息
  async get_userInfo (userId) {
    const { data } = await getUserInfo(userId)
    const Info = data.data
    console.log(Info);
    return Info
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const {id} = options
    // console.log(id);
    
    this.setData({
      id
    })
    this.getErrand_detail(id)
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