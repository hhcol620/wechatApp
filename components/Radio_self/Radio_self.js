// components/Radio_self/Radio_self.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value:[]
    },
    // 默认选中项
    index: {
      type: Number,
      value:1
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
    // radio切换时 返回选中value 触发父组件事件传参value  不能直接使用传过来的数组否则不能进行调试,应该将索引传回页面  让页面修改源数组
    radioChange (e) {
      // console.log(e.target.dataset);
      const { index } = e.target.dataset
      this.triggerEvent('handleItemChange',{index})
    }
  }
})
