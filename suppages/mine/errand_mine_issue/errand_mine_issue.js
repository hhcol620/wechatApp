// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  getMyErrandOrder,deleteErrandOrder,finishErrandOrder,deleteErrandOrder_noreceive,getErrandOrder
} from '../../../request/api/store_api.js'


import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

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
    // 默认激活
    active: 0,
    // 这三个都是请求的参数
    stateObj: {
      pageSize: 5,
      currentPage: 1,
      totalCount: 0
    },
    // 请求回来的数据存储
    errandList: [],
    // 控制主要数据是否显示
    is_show: true
  },
  // 获取我发布的跑腿订单   state  2 没有被接单的  3 已经被接单   4已完成
  async getStateErrandList (state) {
    const { pageSize, currentPage } = this.data.stateObj
    const { errandList } = this.data
    showLoading(this)
    const { data } = await getMyErrandOrder(pageSize, currentPage, state)
    hideLoading(this)
    // console.log(data);
    if (data.code !== 200) {
      return
    }
    wx.stopPullDownRefresh()
    const list = data.data.data
    errandList.push(...list)
    let c_page = currentPage + 1
    if (errandList.length<=0) {
      this.setData({
        is_show:false
      })
    }
    this.setData({
      ['stateObj.totalCount']:data.data.totalCount,
      errandList,
      ['stateObj.currentPage']:c_page
    })
  },
  // 获取已完成的跑腿订单
  async getFinishErrandList (state) {
    // state 4
    // 
    const { pageSize, currentPage } = this.data.stateObj
    const { errandList } = this.data
    showLoading(this)
    const { data } = await getErrandOrder(pageSize, currentPage, 1, state)
    hideLoading(this)
    console.log(data);
    if (data.code !== 200) {
      return
    }
    wx.stopPullDownRefresh()
    const list = data.data.data||[]
    errandList.push(...list)
    let c_page = currentPage + 1
    if (errandList.length<=0) {
      this.setData({
        is_show:false
      })
    }
    this.setData({
      ['stateObj.totalCount']:data.data.totalCount,
      errandList,
      ['stateObj.currentPage']:c_page
    })
  },
  // 切换clickTabs
  async clickTabs (e) {
    // console.log(e);
    const { index } = e.detail
    this.setData({
      ['stateObj.totalCount']: 0,
      ['stateObj.currentPage']: 1,
      errandList: [],
      active: index,
      is_show: true
    })
    
    if (index === 0) {
      await this.getStateErrandList(2)
    } else if (index === 1) {
      await this.getStateErrandList(3) 
    } else if (index == 2) {
      await this.getFinishErrandList(4)
    }
  },
  // 删除某一个订单  这是完成的情况
  deleteErrand (e) {
    const { errandList } = this.data
    const id = e.detail
    Dialog.confirm({
      message: '确定删除吗'
    }).then(async () => {
      const res = await this.deleteErrandOrder(id)
      // console.log(res.code);
      if (res.code !== 200) {
        Dialog.confirm({
          message: `${res.text}`
        })
        return
      }
      // 这里进行一个遍历循环  然后本地删除id对应的一项
      errandList.forEach((item,index) => {
        if (item.id == id) {
          console.log('id是',id);
          // 删除这一项
          errandList.splice(index,1)
        }
      })
      this.setData({
        errandList
      })

    }).catch(() => {
      // on cancel
    });
  },
  // 删除订单  没有完成的情况
  deleteErrand_noreceive (e) {
    const { errandList } = this.data
    const { id, version } = e.detail
    console.log(e);
    Dialog.confirm({
      message: '确定删除吗'
    }).then(async () => {
      const res = await this.delete_no_receive(id,version)
      // console.log(res.code);
      if (res.code !== 200) {
        Dialog.confirm({
          message: `${res.text}`
        })
        return
      }
      // 这里进行一个遍历循环  然后本地删除id对应的一项
      errandList.forEach((item,index) => {
        if (item.id == id) {
          console.log('id是',id);
          // 删除这一项
          errandList.splice(index,1)
        }
      })
      this.setData({
        errandList
      })

    }).catch(() => {
      // on cancel
    });
  },
  // 点击完成
  finishErrand (e) {
    // console.log(e.detail);
    const { errandList } = this.data
    const id = e.detail
    Dialog.confirm({
      message: '亲点击确定表示已经收到货了'
    }).then(async () => {
      const res = await this.finish_errand_order(id)
      if (res.code !== 200) {
        Dialog.confirm({
          message: `${res.text}`
        })
        return
      }
      // 这里进行一个遍历循环  然后本地删除id对应的一项
      errandList.forEach((item,index) => {
        if (item.id == id) {
          // 删除这一项
          errandList.splice(index,1)
        }
      })
      this.setData({
        errandList
      })

    }).catch(() => {
      // on cancel
    });
  },
  // 点击完成
  async finish_errand_order (id) {
    const { data } = await finishErrandOrder(id)
    return data
  },
  // 传进来 作为发起人  type传5 第二个参数传id  已经完成的情况下
  async deleteErrandOrder (id) {
    const { data } = await deleteErrandOrder(5, id)
    return data
  },
  // 删除跑腿订单   没有人接单
  async delete_no_receive (id,version) {
    const { data } = await deleteErrandOrder_noreceive(id,version)
    return data
  },
  // 下拉刷新
  async pullDownRefresh () {
    this.setData({
      ['stateObj.totalCount']: 0,
      ['stateObj.currentPage']: 1,
      errandList:[]
    })
    const index = this.data.active
    if (index === 0) {
      await this.getStateErrandList(2)
    } else if (index === 1) {
      await this.getStateErrandList(3) 
    } else if (index == 2) {
      await this.getFinishErrandList(4)
    }
  },
  // 触底加载下一页
  async reachBottom () {
    const { pageSize,currentPage,totalCount } = this.data.stateObj
    const index = this.data.active
    if (currentPage <= Math.ceil(totalCount / pageSize)) {
      if (index === 0) {
        await this.getStateErrandList(2)
      } else if (index === 1) {
        await this.getStateErrandList(3) 
      } else if (index == 2) {
        await this.getFinishErrandList(4)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { active } = options
    if (active) {
      // 将字符转为数字
      let num = active - 0
      console.log(num);
      this.setData({
        active:num
      })
    }
    // 默认传进去 2 
    this.getStateErrandList(2)
    
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
    this.pullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.reachBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})