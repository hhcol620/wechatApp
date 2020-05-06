// components/cateSelectTree/cateSelectTree.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cateList: {
      type: Array,
      value:[]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: null,
    items:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickNav({
      detail = {}
    }) {
      this.setData({
        mainActiveIndex: detail.index || 0
      });
    },

    onClickItem({
      detail = {}
    }) {
      const activeId = this.data.activeId === detail.id ? null : detail.id;

      this.setData({
        activeId
      });
      // 触发父组件事件  并把这个里面的id值传给父页面
      this.triggerEvent('getActiveId',activeId)
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})