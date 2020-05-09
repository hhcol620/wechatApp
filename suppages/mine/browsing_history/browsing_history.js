import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
import { getUserRecodrByPage, deleteOwnAllCollect, deleteCollectByInde } from '../../../request/api/store_api.js'
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
import { getSystemInfoSync } from "../../../miniprogram_npm/vant-weapp/common/utils";
// suppages/store/browsing_history/browsing_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageSize: 10,
      currentPage: 1,
      recordList:[],
      totalCount: 0
  },
  // 长按  => 弹框提示用户
  longPressFunc (e) {
    console.log(e);
    Dialog.confirm({
      message: '确定删除本条浏览记录吗'
    }).then(() => {
      //this.deleteCollectByIndex(ind);
    }).catch(() => {
      // on cancel
    });
  },
  // 删除全部
  deleteAll (e) {
    console.log(e);
    Dialog.confirm({
      message: '确定删除全部的浏览记录吗'
    }).then(() => {
      this.deleteAllCollect();
    }).catch(() => {
      // on cancel
    });
  },
  async deleteCollectByIndex(index){
    const { data } = await deleteCollectByInde(index)
  },
  async deleteAllCollect(){
    const{ data } = await deleteOwnAllCollect();
    if(data.code !== 200) return
    this.setData({
      recordList: []
    })
  },
  async getBrowseHistory(){
    const { data } = await getUserRecodrByPage(this.data.pageSize, this.data.currentPage)
    console.log(data);
    if (data.code !== 200) return
    this.setData({
      recordList: data.data.data,
      totalCount: data.data.totalCount
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBrowseHistory()
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