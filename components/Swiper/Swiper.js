// components/Swiper/Swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的初始数据
   */
  data: {
    imgList: [
      { img: 'https://image.suning.cn/uimg/ZR/share_order/158742573158888363.jpg', toUrl: '../../suppages/store/commodity/commodity' },
      { img: 'https://image.suning.cn/uimg/ZR/share_order/158742573131221711.jpg', toUrl: '../../suppages/store/commodity/commodity' },
      { img: 'https://image.suning.cn/uimg/ZR/share_order/158742573186927388.jpg', toUrl: '../../suppages/store/commodity/commodity' }
    ],
    // 轮播图正在显示的图
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCurrent (e) {
      // 通过获取current  来动态的设置轮播图的样式
      console.log(e.detail.current);
      const current = e.detail.current
      this.setData({
        current: current
      })
    }
  }
})
