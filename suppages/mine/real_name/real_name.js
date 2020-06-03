import regeneratorRuntime from '../../../lib/runtime/runtime.js'
import { oneCardAuthen,getMyInfo } from '../../../request/api/store_api.js'
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


// import { getSystemInfoSync } from "../../../miniprogram_npm/vant-weapp/common/utils";


// suppages/store/real_name/real_name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否已经实名
    isreal: false,
    // 学生证正面地址
    studentCardImg: '',
    // 姓名
    name: '',
    // // 学校
    // school: '',
    // // 学院
    // academy: '',
    // 身份证号
    cardNum: '',
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

  // 点击上传学生证照片页
  upStudentCard (e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async (result) => {
        showLoading(that)
        const res = await upLoadImages(result.tempFilePaths[0])
        hideLoading(that)
        const geturl = JSON.parse(res.data)
        this.setData({
          studentCardImg: `${geturl.text}`
        })
      },
      fail: () => {},
      complete: () => {}
    });

  },
  // 用户点击了提交
  async submitFunc () {
    showLoading(this)
    const {studentCardImg,name,cardNum} = this.data
    if (!name.trim()||!cardNum.trim()||!studentCardImg.trim()) {
      // 有空值   提示用户输入不合法
      Notify({ type: 'danger', message: '输入不合法,请检查后重试' });
      return
    }
    // 发起提交请求*********************
    // const { name, school, academy, cardNum, studentCardImg } = this.data
    const studentObj = {
      fileUri:studentCardImg,
      inputName: name,
      inputCardNo:cardNum
    }
    const { data } = await oneCardAuthen(studentObj)
    hideLoading(this)
    console.log(data);
    // 提交成功之后  提示用户已经接收到您的实名认证申请 然后等待1秒 退到上一页
    if (data.code !== 200) {
      // 提交失败
      Notify({ type: 'danger', message: '提交失败,请稍后重试' });
      return
    }
    Notify({ type: 'success', message: `${data.text}` });
    // 提交成功   提示用户 然后回退上一页面
    Dialog.confirm({
        title: '提示',
        message: '您的提交我们已经收到,重新登陆就可以获得更多的权限啦!',
        asyncClose: true
      })
      .then(() => {
        setTimeout(() => {
          // this.navigateBackFunc()
          try {
            wx.clearStorageSync()
          } catch(e) {
            // Do something when catch error
          }
          this.toLogin()
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
  // 认证或者提交成功 让用户跳到登陆页
  toLogin () {
    wx.redirectTo({
      url: '/pages/login/login',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 页面加载 发起请求获取是否已经实名成功
  async get_my_info () {
    const { data } = await getMyInfo()
    console.log(data);
    if (data.code !== 200) {
      return
    }
    if (data.data.state === 40) {
      // 已经实名成功
      this.setData({
        isreal:true
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgURL
    })
    this.get_my_info()
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