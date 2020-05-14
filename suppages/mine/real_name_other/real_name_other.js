import regeneratorRuntime from '../../../lib/runtime/runtime.js'
import { getMyInfo,oneCardAuthen } from '../../../request/api/store_api.js'
// 引入上传文件方法 参数就是本地的路径
import {
  upLoadImages
} from '../../../utils/uploadImg.js'
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



// suppages/store/real_name/real_name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 身份证正面地址
    cardImg: '',
    // 姓名
    name: '',
    // 身份证号
    cardNum: '',
    // 手机号
    telNum:'',
    // 图片加载基地址
    imgURL:''
  },
  // 输入框中输入内容触发 获取其中的值
  // 获取输入框中的数据
  getInputData(e) {
    const name = e.currentTarget.dataset.name
    const value = e.detail
    // console.log(name, value);

    this.setData({
      [name]: value
    })
    // console.log(e);
  },

  // 点击身份证
  upCard(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async (result) => {
        const res = await upLoadImages(result.tempFilePaths[0])
        const geturl = JSON.parse(res.data)
        // console.log();
        this.setData({
          cardImg: `${geturl.text}`
        })
      },
      fail: () => {},
      complete: () => {}
    });

  },
  // 用户点击了提交
  submitFunc() {

    const {cardImg,name,cardNum,telNum} = this.data
    // if (!name.trim()||!cardNum.trim()||!telNum.trim()||!cardImg.trim()) {
    //   // 有空值   提示用户输入不合法
    //   Notify({ type: 'warning', message: '输入不合法,请检查后重试' });
    //   return
    // }
    // 发起提交请求*********************

    // 提交成功之后  提示用户已经接收到您的实名认证申请 然后等待1秒 退到上一页

    Dialog.confirm({
        title: '提示',
        message: '您的提交我们已经收到',
        asyncClose: true
      })
      .then(() => {
        setTimeout(() => {
          this.navigateBackFunc()
          Dialog.close();
        }, 1000);
      })
      .catch(() => {
        Dialog.close();
      });
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