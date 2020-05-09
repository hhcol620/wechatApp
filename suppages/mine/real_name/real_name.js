import Notify from '../../../miniprogram_npm/vant-weapp/notify/notify';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
import { getMyInfo } from '../../../request/api/store_api.js'
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
import { getSystemInfoSync } from "../../../miniprogram_npm/vant-weapp/common/utils";


// suppages/store/real_name/real_name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否已经实名
    isreal: true,
    // 一卡通正面地址
    studentCardImg: '',
    // 备用审核图片
    otherImg: ''
  },

  // 点击上传一卡通
  upStudentCard(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        // 上传成功
        this.setData({
          studentCardImg: result.tempFilePaths[0]
        })
      },
      fail: () => {},
      complete: () => {}
    });

  },
  // 上传其他的图片
  upOtherImg(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        // 上传成功
        this.setData({
          otherImg: result.tempFilePaths[0]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 用户点击了提交
  submitFunc() {


    // 提交成功之后  提示用户已经接收到您的实名认证申请 然后等待3秒 退到上一页
    // 成功通知
    // Dialog.alert({
    //   message: '您的实名认证申请我们已经收到,请耐心等待我们的审核'
    // }).then(() => {
    //   this.navigateBackFunc()
    //   // on close
    // }).then(() => {
    //   this.navigateBackFunc()
    //   // on close
    // });

    Dialog.confirm({
        title: '标题',
        message: '弹窗内容',
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
    // 失败通知
    // Notify({ type: 'warning', message: '提交失败,请稍后重试' });

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