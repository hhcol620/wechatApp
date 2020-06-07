// components/overlay_self/overlay_self.js
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
    move () {
      console.log('禁止滚动');
    },
    close () {
      this.triggerEvent('click')
    }
  }
})
