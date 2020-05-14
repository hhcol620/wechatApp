// components/errand_index/errand_index.js
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
    time: 30 * 60 * 60 * 1000
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 查看详情
    To_errand_detail (e) {
      const { id } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/suppages/errand/errand_detail/errand_detail?id=${id}`,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  }
})
