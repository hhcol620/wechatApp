// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'

// 排序
import { createComparisonFunction } from '../../../utils/sort_self.js'


// 引入  用来发送请求的方法  需要将路径补全
import { getUserInfo } from '../../../request/api/store_api.js'

import {
  get_userCenter_ByUserId,get_user_release_comm,get_user_release_demand,
  get_user_evaluate
} from '../../../request/api/store_front_api.js'

import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

import {
  getTime
} from '../../../utils/getTime.js'
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
    // 图片加载基地址
    imgURL: '',
    // 用户id
    userid:'',
    // 浏览 收藏 宝贝 卖出 参与公益活动 
    personMsg: {},
    UserInfo: {},
    // 请求商品列表的数据
    getEsObj: {
      pageSize: 10,
      currentPage: 1,
      totalCount:100
    },
    // 商品的列表
    esList: [],
    // 请求需求列表的数据
    getDemandObj: {
      pageSize: 10,
      currentPage:1,
      totalCount:100
    },
    // 需求的列表
    demandList: [],
    // 请求评价列表数据
    getEvaluateObj: {
      pageSize: 10,
      currentPage:1,
      totalCount:100
    },
    // evaluate 评价 列表
    evaluateList: [],
    // tab现在所在位置
    index: 0,
    // 控制主要数据是否显示
    is_show: true
  },
  // 获取用户信息
  async getUserCenter (id) {
    const { data } = await get_userCenter_ByUserId(id)
    // console.log(data);
    if (data.code !== 200) {
      return 
    }
    this.setData({
      personMsg:data.data
    })
  },
  // 
  async getUserMsg (id) {
    const res = await this.get_UserInfo(id)
    this.setData({
      UserInfo: res
    })
  },
  // tab  切换
  TabsChange (e) {
    // console.log(e);
    const { index } = e.detail
    const { esList,demandList,evaluateList } = this.data
    this.setData({
      index,
      is_show: true
    })
    if (index == 0) {
      if (esList.length <= 0) {
        this.get_es_comm()
      }
    } else if(index == 1) {
      if (demandList.length <= 0) {
        this.get_demand()
      }
    } else if (index == 2) {
      if (evaluateList.length <= 0) {
        this.getEvaluate()
      }
    }
  },
  // 根据用户id获取用户信息
  async get_UserInfo (id) {
    const { data } = await getUserInfo(id)
    if (data.code !== 200) {
      return 
    }
    // console.log(data);
    return data.data
  },
  // 获取用户发布的宝贝
  async get_es_comm () {
    const { getEsObj,userid,esList } = this.data
    const { pageSize,currentPage,totalCount } = getEsObj
    showLoading(this)
    const { data } = await get_user_release_comm(pageSize,currentPage,userid)
    hideLoading(this)
    if (data.code !== 200) {
      return
    }
    console.log(data);
    const cpage = currentPage+1
    esList.push(...data.data.data)
    esList.sort(createComparisonFunction('createTime'))
    if (esList.length <= 0) {
      // 为空
      this.setData({
        is_show:false
      })
    }
    this.setData({
      esList,
      ['getEsObj.currentPage']:cpage,
      ['getEsObj.totalCount']:data.data.totalCount
    })
  },
  // 获取用户发布的求购
  async get_demand () {
    const { getDemandObj,userid,demandList } = this.data
    const { pageSize, currentPage, totalCount } = getDemandObj
    showLoading(this)
    const { data } = await get_user_release_demand(pageSize, currentPage, userid)
    hideLoading(this)
    if (data.code !== 200) {
      return
    }
    console.log(data);
    // demandList.push(...data.data.data)
    
    const cpage = currentPage + 1
    const List = data.data.data
    if (List.length <= 0 && demandList.length <= 0) {
      this.setData({
        is_show: false
      })
    }
    List.forEach((v,i) => {
      v.mainPicUrl = v.mainPic
      v.title = v.topic
      v.productDesc = v.content
      demandList.push(v)
      demandList.sort(createComparisonFunction('createTime'))
      this.setData({
        demandList
      })
    })
    this.setData({
      ['getDemandObj.currentPage']: cpage,
      ['getDemandObj.totalCount']: data.data.totalCount
    })
  },
  // 获取用户被评价的信息
  async getEvaluate () {
    const { getEvaluateObj,userid,evaluateList } = this.data
    const { pageSize, currentPage, totalCount } = getEvaluateObj
    showLoading(this)
    const { data } = await get_user_evaluate(pageSize,currentPage,userid)
    hideLoading(this)
    if (data.code !== 200) {
      return
    }
    // console.log(data);
    // evaluateList.push(...data.data.data)
    const List = data.data.data
    if (evaluateList.length <= 0 && List.length <= 0) {
      this.setData({
        is_show:false
      })
    }
    List.forEach(async (v,i) => {
      v.userInfo = await this.get_UserInfo(v.buyerId)
      evaluateList.push(v)
      evaluateList.sort(createComparisonFunction('createTime'))
      this.setData({
        evaluateList
      })
    })
    const cpage = currentPage+1
    this.setData({
      ['getEvaluateObj.currentPage']: cpage,
      ['getEvaluateObj.totalCount']: data.data.totalCount
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { userid } = options
    this.setData({
      imgURL,
      userid
    })
    // 字符的userid
    // console.log(userid);
    this.getUserCenter(userid)
    this.getUserMsg(userid)
    this.get_es_comm()
    // this.get_demand()
    // this.getEvaluate()
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
    // 先获取tab 所在位置   发起不同的请求
    const { index } = this.data
    if (index == 0) {
      const { pageSize,currentPage,totalCount} = this.data.getEsObj
      if (currentPage <= Math.ceil(totalCount / pageSize)) {
        this.get_es_comm()
      } else {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true
        });  
      }
      
    } else if (index == 1) {
      const { pageSize,currentPage,totalCount} = this.data.getDemandObj
      if (currentPage <= Math.ceil(totalCount / pageSize)) {
        this.get_demand()
      } else {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true
        });  
      }
    } else if (index == 2) {
      const { pageSize,currentPage,totalCount} = this.data.getEvaluateObj
      if (currentPage <= Math.ceil(totalCount / pageSize)) {
        this.getEvaluate()
      } else {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true
        });  
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})