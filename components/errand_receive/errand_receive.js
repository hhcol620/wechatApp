// components/errand_completed_orders_receive/errand_completed_orders_receive.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrList: {
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击联系发起人
    contactIssure (e) {
      // console.log(e);
      const { phonenum } = e.currentTarget.dataset
      console.log(phonenum);
      wx.makePhoneCall({
        phoneNumber: phonenum,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      }); 
    },
    // 点击编辑按钮
    edit (e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('deleteFunc',id)
      // console.log(id);
    },
    toDetail(e){
      const { id } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/suppages/mine/errand_order_detail/errand_order_detail?id=${id}`,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
  }
})
