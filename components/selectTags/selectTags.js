// components/selectTags/selectTags.js
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
    // 判断是否关注了 默认为  未关注
    isConcern:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击关注
    click_concern (e) {
      // console.log(e);
      const { avaliable, id } = e.currentTarget.dataset
      const avaliObj = {
        avaliable,
        id
      }
      // console.log(avaliable);
      this.triggerEvent('changeConcern',avaliObj) 
    },
    // 取消关注
    click_noconcern (e) {
      const { avaliable, id } = e.currentTarget.dataset
      const avaliObj = {
        avaliable,
        id
      }
      this.triggerEvent('changeConcern',avaliObj) 
    }
  }
})
