
// components/store_orders_buy/store_orders_buy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myOrderList: {
      type: Array,
      value:[]
    },
    imgURL: {
      type: String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 控制遮罩是否显示
    isShow: false,
    // 订单id
    orderId:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转订单详情页
    jumpPageDetail (e) { 
      const { orderid } = e.currentTarget.dataset
      const obj = {
        orderId: orderid,
        type:2
      }
      // console.log(orderid);
      this.triggerEvent('detail',obj)     

    },
    // 联系卖家
    contact_seller() {
      wx.makePhoneCall({
        // 手机号
        phoneNumber: '17796761085',
        // 下面是三个回调
        complete: (res) => {},
        fail: (res) => {},
        success: (res) => {},
      })
    },
    // 点击评价  
    write_evaluation(e) {
      console.log(e);
      const {
        orderid
      } = e.currentTarget.dataset
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
    more_btn() {
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
    // 查看订单信息
    // 查看订单信息
    order_detail () {
      const { orderId } = this.data
      const obj = {
        orderId,
        type:1
      }
      this.triggerEvent('detail',obj)
      // console.log(orderId);
    }
  }
})