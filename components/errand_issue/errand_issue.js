// components/errand_no_receive/errand_no_receive.js
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
    // 点击联系接单人
    contactReceiver (e) {
      const {phoneNum} = e.currentTarget.dataset
      wx.makePhoneCall({
        phoneNumber: phoneNum,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    },
    // 点击编辑按钮
    delete (e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('deleteFunc',id)
      // console.log(id);
    },
    // 点击完成
    finish (e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('finishFunc',id)
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
