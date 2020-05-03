// components/errand_index/errand_index.js
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
    time: 30 * 60 * 60 * 1000
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 查看详情
    To_errand_detail () {
      wx.navigateTo({
        url: '/suppages/errand/errand_detail/errand_detail',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  }
})
