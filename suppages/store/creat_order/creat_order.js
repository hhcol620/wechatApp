// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getMyInfo,
  get_goodsInfo
} from '../../../request/api/store_api.js'

import {
  getOrderCode,
  postCreateOrder
} from '../../../request/api/store_front_api.js'

import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

import {
  getTime
} from '../../../utils/getTime.js'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast.js';
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
    // 控制选择支付方式
    pay_type_show: false,
    // 1表示微信 2表示支付宝
    radio: '1',
    // 商品id
    productId: '',
    // 商品版本
    version:'',
    // 商品信息
    productInfo: {},
    // 用户信息
    userInfo: {},
    // 加载图片基地址
    imgURL: '',
    // 留言
    orderRemark:''

  },
  // 根据商品id生成商品的预订单
  async get_order_code(id) {
    const {
      data
    } = await getOrderCode()
    // console.log('code',data);
    if (data.code !== 200) {
      return
    }
    const {
      text
    } = data
    const res = await this.post_order_msg(text)
    return res
  },
  // 根据商品 id orderCode 
  async post_order_msg (orderCode) {
    const { productId,userInfo,orderRemark,version } = this.data
    const id = productId
    const { address,phoneNum } = userInfo
    const obj = {
      orderCode,
      address,
      phoneNum,
      orderRemark,
      productVersion:version
    }
    const {
      data
    } = await postCreateOrder(id, obj)
    return data
  },
  // 提交订单
  onSubmit () {
    const { userInfo } = this.data
    const { address, nickname, phoneNum } = userInfo
    if (!address || !nickname || !phoneNum) {
      // 收货地址信息不完整
      Dialog.alert({
        message: '收货地址信息不完整,请检查后重试',
      }).then(() => {
        // on close
      });
      return 
    }
    this.setData({
      pay_type_show: true
    })
  },
  // 获取用户的当前地址
  getAddress () {
    let that = this
    wx.chooseAddress({
      success: function (res) {
        // console.log(JSON.stringify(res));
        // console.log(res);
        const address =res.provinceName+res.cityName+res.countyName+res.detailInfo
        that.setData({
          "userInfo.nickname": res.userName,
          "userInfo.phoneNum.": res.telNumber,
          "userInfo.address": address
        })
      }
    })
  },
  // 获取一下页面的初始信息  商品的信息  和自己设置的默认收货地址信息
  async getmyinfo() {
    const {
      data
    } = await getMyInfo()
    // console.log(data);
    if (data.code !== 200) {
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      if (data.code === 402) {
        wx.redirectTo({
          url: '/pages/login/login',
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });

      }
      return
    }
    // 成功
    this.setData({
      userInfo: data.data
    })


  },
  // 页面加载  立即根据商品的id获取商品的信息
  async getGoodsInfo(id) {
    const {
      data
    } = await get_goodsInfo(id)
    // console.log(data);
    if (data.code !== 200) {
      // 失败
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return
    }
    let obj = data.data
    let tagName_List = (obj.tagNames || '').split('|')
    if (tagName_List[0] == '') {
      tagName_List = []
    }
    // console.log(tagName_List);
    obj.tagName_List = tagName_List
    this.setData({
      productInfo: obj
    })

  },
  // 获取输入框中的数据
  getInputData (e) {
    const { name } = e.currentTarget.dataset
    const value = e.detail
    this.setData({
      [name]:value
    })
  },
  // 关闭选择支付方式
  payType_onClose() {
    this.setData({
      pay_type_show: false
    })
  },

  // 复选框的功能实现
  onChange(event) {
    console.log(event);
    this.setData({
      radio: event.detail
    });
  },
  // 复选框的功能实现
  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },
  // 点击去付款
  async confirm() {
    const { radio,id } = this.data
    const res = await this.get_order_code(id)
    console.log(res);
    if (res.code !== 200) {
      Toast.fail(`${res.text}`)
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      },2000)
      return 
    }
    const { orderCode, paymentMoney } = res.data
    if (radio == 1) {
      wx.redirectTo({
        url: `/suppages/store/wx_payment/wx_payment?ordercode=${orderCode}&paymentmoney=${paymentMoney}`,
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });

    } else if (radio == 2) {
      // 支付宝的话直接跳转
      wx.redirectTo({
        url: `../payment/payment?radio=${radio}`,
        success: (result) => {},
        fail: () => {},
        complete: () => {}
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      id,version
    } = options
    this.setData({
      imgURL,
      productId: id,
      version
    })
    
    // 商品id
    // console.log(id);
    // 获取我的信息
    this.getmyinfo()
    // 获取商品的信息
    this.getGoodsInfo(id)
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
    // this.getmyinfo()
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