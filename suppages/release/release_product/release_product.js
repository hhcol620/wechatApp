// suppages/release/release_product/release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 价格
    price: '',
    // 新旧程度
    degreeValue: 9.9,
    // 主图
    mainImg:'',
    // 附图
    descImages: [],
    // 组件展示用
    fileList: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true
      }
    ],
    // 测试多选框
    way_ridio_items: [
      { name: '自提', value: '1',checked: false },
      { name: '面交', value: '2', checked: true },
      { name: '快递', value: '3',checked: false }
    ],
    // 测试单选框
    type_ridio_items: [
      { name: '正常交易', value: '1',checked: false },
      { name: '公益捐赠', value: '2', checked: true },
    ]
  },
  // 单选框
  handleItemChange (e) {
    const {index} = e.detail 
    const arr = JSON.parse(JSON.stringify(this.data.type_ridio_items))
    arr.forEach((i, v) => v === index ? i.checked = true : i.checked = false)
    this.setData({
      type_ridio_items:arr
    })
  },
  checkboxItemChange (e) {
    // console.log(e.detail.index);  这个是被点击的索引
    const { index } = e.detail
    const arrList = JSON.parse(JSON.stringify(this.data.way_ridio_items))
    arrList.forEach((v, i) => {
      if (i === index) {
        if (v.checked == true) {
          v.checked = false
        } else {
          v.checked = true
        }
        
      }
    })
    this.setData({
      way_ridio_items:arrList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})