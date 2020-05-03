// components/SearchSelect/SearchSelect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    propArray: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 组件内部的数据
    selectShow: false, //初始option不显示
    label: "请选择", //初始内容
    // 对应的参数对照  有时需要使用这个参数
    selectValue: '',
    // 选择框索引
    selectIndex: '',
    // 输入数据
    inputValue: '',
    animationData: {} //右边箭头的动画

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //option的显示与否
    selectToggle: function() {
      var nowShow = this.data.selectShow; //获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(90).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function(e) {
      var arr = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var index = e.target.dataset.index; //当前点击的索引
      var label = arr[index].label; //当前点击的内容
      var value = arr[index].value;
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        selectIndex: index,
        selectValue: value,
        label: label,
        animationData: this.animation.export()
      })
    },
    // 输入框中内容  输入完毕触发
    searchInput(e) {
      // console.log(e.detail.value);
      const Inputvalue = e.detail.value
      const obj = {
        selectValue: this.data.selectValue,
        selectIndex: this.data.selectIndex,
        selectLabel: this.data.label,
        Inputvalue: Inputvalue
      }
      this.triggerEvent('myget', obj)
    },
    // 点击空白 关闭
    // 此方法供父组件调用
    close() {
      this.setData({
        selectShow: false
      })
    },
    // 监听输入框  当输入框为空  触发父组件事件  
    bInput (e) {
      console.log(e.detail.value);
      if (e.detail.value.length <= 0) {
        this.triggerEvent('reset')
      }
    }
  }
})