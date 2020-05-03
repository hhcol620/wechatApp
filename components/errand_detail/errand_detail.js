
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
    // 控制隐私信息的显示
    isShow: false,
    // 存储用户隐私信息的对象
    privacy_mess: {},
    // 是否正在加载
    isloading:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 立即接单
    receive_order(e) {
      console.log(e);
      this.setData({
        isShow:true
      })
    },
    // 关闭遮罩
    onClickHide () {
      this.setData({
        isShow:false
      })
    }
  }
})