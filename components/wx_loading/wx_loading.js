// components/wx_loading/wx_loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loadingtext: {
      type: String,
      value:'正在加载中'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadingState:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    nomove () {
      console.log('禁止滚动');
    },
    show(){
      this.setData({
        loadingState: true,
      })
    },
    hide(){
      this.setData({
        loadingState: false
      })
    }
  }
})
