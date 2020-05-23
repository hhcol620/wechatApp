// // components/Swiper_num/Swiper_num.js

// // 如果使用  async  await 这个es7 的将异步的请求
// import regeneratorRuntime from '../../lib/runtime/runtime.js'
// // 引入  用来发送请求的方法  需要将路径补全
// // import {
// //   get_swipers
// // } from '../../request/api/api.js'
// //index.js
// //获取应用实例
// const app = getApp()
// // 引入全局  请求加载动画方法
// const {
//   showLoading,
//   hideLoading
// } = app.globalData

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },


  /* 
     组件生命周期
  
  */
  lifetimes: {
    //  组件实例刚刚被创建好 created 生命周期被触发 组件数据this.data 就是component 构造器 中定义的数据data 此时还不能调用setData 通常情况下 这个生命周期 之应该用于给组件的this 添加 一些自定义属性的字段
    created: function() {

    },
    // 组件完全初始化完毕 进入页面节点树
    attached: function() {
    },
    // 组件离开页面节点树后 datached 生命周期被触发 退出一个页面时 如果组件还在页面节点树中,则detached会被触发
    detached: function() {

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
  },



})