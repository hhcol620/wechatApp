const {
  default: Dialog
} = require('../../miniprogram_npm/vant-weapp/dialog/dialog');

// components/errand_no_receive/errand_no_receive.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrList: {
      type: Array,
      value: []
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
    contactReceiver(e) {
      const {
        phonenum
      } = e.currentTarget.dataset
      // console.log(phonenum);
      wx.makePhoneCall({
        phoneNumber: phonenum,
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });

    },
    // 点击编辑按钮
    delete(e) {
      const {
        id,
        version,
        state
      } = e.currentTarget.dataset
      if (state == 2) {
        const obj = {
          id: id,
          version: version
        }
        this.triggerEvent('deleteFuncNoRec', obj)
      }
      if (state == 4) {
        this.triggerEvent('deleteFunc', id)
      }

      // console.log(id);
    },
    // 点击完成
    finish(e) {
      const {
        id
      } = e.currentTarget.dataset
      this.triggerEvent('finishFunc', id)
    },
    toDetail(e) {
      const {
        id,
        state,
        paystate,
        money
      } = e.currentTarget.dataset
      if (paystate == 0) {
        Dialog.confirm({
            title: '提示',
            message: '即将跳转到支付页面',
          })
          .then(() => {
            // 待支付
            wx.navigateTo({
              url: `/suppages/release/errand_pay/errand_pay?money=${money}&id=${id}`
            });
          })
          .catch(() => {
            // on cancel
          });

        return
      }
      if (paystate != 0 && state == 2) {
        // 未完成   不允许跳转
        wx.showToast({
          title: '还没有人接单哦',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false
        });

        return
      }
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