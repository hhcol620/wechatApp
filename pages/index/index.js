// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  
} from '../../request/api/store_api.js'
import {
  get_propagate,get_donation_finsh,get_donation_finsh_detail
} from '../../request/api/store_front_api.js'
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
  data: {
    // 加载图片基地址
    imgURL:'',
    // 学校通知
    schoolNotice: [],
    // 广告
    advertising: [],
    // 公益列表
    donationList: []
  },
  async getSwiper() {
    showLoading()
    // const res = await get_swipers()
    // console.log(res);
    // this.setData({
    //   swiperList:res.data.message
    // })
    hideLoading()
  },
  // 跳转到通知页
  to_school_inform (e) {
    const { id } = e.currentTarget.dataset
    console.log(id);
    wx.navigateTo({
      url: `/pages/school_inform/school_inform?id=${id}`,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 跳转到广告页
  to_advertising (e) {
    const { id } = e.currentTarget.dataset
    console.log(id);
    wx.navigateTo({
      url: `/pages/advertising/advertising?id=${id}`,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  // 获取学校通知
  async get_Sch_notice() {
    const pageSize = 3,
      currentPage = 1,
      type = 2

    const {
      data
    } = await get_propagate(pageSize, currentPage, type)
    console.log(data);
    if (data.code !== 200) {
      return
    }
    this.setData({
      schoolNotice: data.data.data
    })
  },
  // 获取广告
  async get_advertising() {
    const pageSize = 6,
      currentPage = 1,
      type = 1

    const {
      data
    } = await get_propagate(pageSize, currentPage, type)
    console.log(data);
    if (data.code !== 200) {
      return
    }
    this.setData({
      advertising: data.data.data
    })
  },
  // 页面加载获取以获得捐助的活动
  async getDonation () {
    const { donationList } = this.data 
    const { data } = await get_donation_finsh()
    // console.log(data);
    if (data.code !== 200) {
      return
    }
    let list = data.data
    list.forEach(async (v, i) => {
      const detail = await this.getDonationDetail(v.id)
      // console.log(detail);
      v.detailInfo = detail
      donationList.push(v)
      this.setData({
        donationList
      })
    })
  },
  // 根据id获得捐助活动的详情
  async getDonationDetail (id) {
    const { data } = await get_donation_finsh_detail(5,id)
    // console.log(data);
    if (data.code !== 200) {
      return
    }
    return data.data
  },
  // 跳转到 公益详情页
  to_donation_detail (e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/suppages/public_service/public_service_detail/public_service_detail?id=${id}&type=5`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    }); 

  },
  // 页面开始加载 就会触发
  onLoad: function() {
    this.setData({
      imgURL
    })
    this.getDonation()
    this.get_Sch_notice()
    this.get_advertising()
  }
})