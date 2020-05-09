// suppages/store/my_info/my_info.js
import { getMyInfo } from '../../../request/api/store_api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 被选中的头像图片路径
    chooseImgs:["https://image.suning.cn/uimg/ZR/share_order/158742573131221711.jpg"],
    userInfo: {}
  },

  async getMyInfo(){
    const { data } = await getMyInfo(1,1)
    if(data.code !== 200){
      return
    }
    this.setData({
      userInfo: data.data
    })
  },

  // 选择图片
  handleChooseImg () {
    // 调用小程序自带的选择图片api
    wx.chooseImage({
      // 同时选中图片数量
      count: 1,
      // 图片格式  原图格式 压缩格式
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机 
      sourceType: ['album','camera'],
      success: (result)=>{
        // console.log(result);
        this.setData({
          chooseImgs:result.tempFilePaths
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getMyInfo()
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