import regeneratorRuntime from '../../../lib/runtime/runtime.js'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
// suppages/store/my_info/my_info.js
import {
  getMyInfo,
  checkData,
  editUserInfo,
  checkDataPic
} from '../../../request/api/store_api.js'

import Notify from '../../../miniprogram_npm/vant-weapp/notify/notify';
// 上传图片
import {
  upLoadImages
} from '../../../utils/uploadImg.js'

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
    // 用户信息
    userInfo: {},
    // 记录用户的用户名和手机号
    nickname: '',
    phonenum: '',
    // 加载图片基地址
    imgURL: ''
  },
  TimeId: -1,
  async getMyInfo () {
    showLoading(this)
    const {
      data
    } = await getMyInfo()
    hideLoading(this)
    if (data.code !== 200) {
      return
    }
    this.setData({
      userInfo: data.data,
      nickname: data.data.nickname,
      phonenum: data.data.phoneNum
    })
  },
  // 获取输入框中的数据
  getInputData(e) {
    // console.log(e);
    const {
      name
    } = e.currentTarget.dataset
    const val = e.detail
    // console.log(name, val);
    this.setData({
      [name]: val
    })
  },

  // 选择图片
  handleChooseImg() {
    // 调用小程序自带的选择图片api
    wx.chooseImage({
      // 同时选中图片数量
      count: 1,
      // 图片格式  原图格式 压缩格式
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机 
      sourceType: ['album', 'camera'],
      success: async (result) => {
        const res = await upLoadImages(result.tempFilePaths[0])
        const geturl = JSON.parse(res.data)
        console.log(geturl);
        const istrue = await this.checkPic(geturl.text)
        if (!istrue) {
          return 
        }
        this.setData({
          ['userInfo.portrait']: `${geturl.text}`
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 检测上传的图片是否合法
  async checkPic (url) {
    const obj = {picUri:url}
    const { data } = await checkDataPic(obj)
    if (data.code !== 200) {
      Toast(`${data.text}`);
      return 
    }
    // console.log('头像合法',data);
    return true
  },
  // 防止抖动
  checkNameDebounce() {
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.checkName()
    }, 1000)
  },
  // 检测输入的用户名和手机号是否唯一
  async checkName() {
    const n_name = this.data.nickname
    // 
    // 脱焦  调用这个方法  发起请求
    const {
      nickname
    } = this.data.userInfo
    console.log(n_name, nickname);
    if (n_name !== nickname) {
      const checkObj = {
        type: 'nickname',
        validValue: nickname
      }
      const {
        data
      } = await checkData(checkObj)
      // 
      console.log(data);

      if (data.code !== 200) {
        Notify({
          type: 'warning',
          message: `${data.text},请重新输入`
        });
        this.setData({
          ['userInfo.nickname']: n_name
        })
        return
      }
    }
  },
  checkPhoneDebounce() {
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.checkphone()
    }, 1000)
  },
  async checkphone() {
    const {
      phonenum
    } = this.data
    const {
      phoneNum
    } = this.data.userInfo
    if (phonenum !== phoneNum) {
      const checkObj = {
        type: 'phoneNum',
        validValue: phoneNum
      }
      const {
        data
      } = await checkData(checkObj)
      console.log(data);
      // 
      if (data.code !== 200) {
        Notify({
          type: 'warning',
          message: `${data.text},请重新输入`
        });
        this.setData({
          ['userInfo.phoneNum']: phonenum
        })
        return
      }
    }
  },
  // 提交  这个提交当页面退出 提交
  async submit_userInfo() {
    const {
      userInfo
    } = this.data
    const {
      data
    } = await editUserInfo(userInfo)
    if (data.code !== 200) {
      wx.showToast({
        title: '编辑信息失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyInfo()
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
    this.submit_userInfo()
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