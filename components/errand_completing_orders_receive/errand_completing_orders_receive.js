// components/errand_completing_orders_release/errand_completing_orders_release.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击联系发布者
    contactReleaser () {
      wx.makePhoneCall({
        phoneNumber: '17796761085',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    },
    // 点击编辑按钮
    edit () {
      console.log('您点击了编辑');
    }
  }
})
