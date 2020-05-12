import regeneratorRuntime from '../../lib/runtime/runtime.js'



import { getMyOrderList,getUserInfo } from '../../request/api/store_api.js'

const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData

// components/store_orders_buy/store_orders_buy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 加载图片基地址
    imgURL:'',
    // 控制遮罩是否显示
    isShow: false,
    // 存储订单列表
    myOrderList: [],
    // 页面大小
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    totalCount: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 获取列表 这里面获取了列表之后 需要触发一下父页面的值将值传到页面上
    async getOrderList () {
      const { myOrderList } = this.data
      const{ data } = await getMyOrderList(this.data.pageSize, this.data.currentPage, 2);
      if (data.code !== 200) return;
      const res = data.data
      const List = res.data
      console.log(List);
      List.forEach(async item => {
        const res = await this.getbuyerInfo(item.salerId)
        item.salerInfo = res
        myOrderList.push(item)
        this.setData({
          myOrderList
        })
      })
      const total = res.totalCount
      this.setData({
        totalCount: total
      })
    },
    // 根据卖家id 查询卖家信息
    async getbuyerInfo (userId) {
      const res = await getUserInfo(userId)
      // console.log(res.data.data);
      return res.data.data 
    },
    // 跳转订单详情页
    jumpPageDetail () { 
      this.triggerEvent('detail')     
    },

    // 联系卖家
    contact_seller () {
      wx.makePhoneCall({
        // 手机号
        phoneNumber: '17796761085',
        // 下面是三个回调
        complete: (res) => {},
        fail: (res) => {},
        success: (res) => {},
      })
    },
    // 点击评价  这个后面需要做一个页面 跳转 评价页面
    write_evaluation (e) {
      console.log(e);
      const { orderid } = e.currentTarget.dataset
      console.log(orderid);
      wx.navigateTo({
        url: `/suppages/mine/store_write_evaluate/store_write_evaluate?orderid=${orderid}`,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    },
    // 点击了更多  打开一个弹框
    more_btn () {
      this.setData({
        isShow: true
      })
    },
    // 隐藏遮罩弹框 
    onClickHide() {
      this.setData({
        isShow: false
      });
    },
    // 查看物流
    review_logistics () {
      console.log('您点击了查看物流');
    },
    // 查看订单信息
    order_detail (){
      console.log('查看订单');
    },
    // 查看钱款去向
    where_monery () {
      console.log('查看钱款去向');
    }
  },
  // 组件的生命周期
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getOrderList()
      this.setData({
        imgURL
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  }
})
