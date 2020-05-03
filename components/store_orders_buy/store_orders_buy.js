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
    // 控制遮罩是否显示
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    // 点击查看评价  这个后面需要做一个页面 显示评价
    review_evaluation (e) {
      console.log('您点击了评价');
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
  }
})
