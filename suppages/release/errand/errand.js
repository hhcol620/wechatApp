// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import { put_demand } from '../../../request/api/store_api.js'
// 引入上传文件方法 参数就是本地的路径
import { upLoadImages } from '../../../utils/uploadImg.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const { showLoading,hideLoading } = app.globalData


// suppages/release/release_product/release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    // 多选框可供选择项
    way_checkbox_items: [
      { name: '自提', value: '1',checked: false },
      { name: '面交', value: '2', checked: true },
      { name: '快递', value: '3',checked: false }
    ],

    // 真实接口使用数据
    // 标题
    titleValue: '',
    // 主图地址
    mainImageUrl: '',
    // 描述
    mian_desc: '这是一个好的哦',
    // 价格
    price: '',
    // 页面显示标签
    tags: '',
    // 提交后台标签 | 隔开
    upTags:'hhhh|jdjjd|dhdhd'
  },
  // 多选框
  checkboxItemChange (e) {
    // console.log(e.detail.index);  这个是被点击的索引
    const { index } = e.detail
    const arrList = JSON.parse(JSON.stringify(this.data.way_checkbox_items))
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
      way_checkbox_items:arrList
    })
    // 然后根据checked 是否为 true  进行将id值拿到存起来传给后台
  },
  // 选择主图
  chooseMainImage () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        // console.log(result)
        this.setData({
          mainImageUrl: result.tempFilePaths[0]
        })
        const res = upLoadImages(this.data.mainImageUrl)
        console.log(res);
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  // 上传附图
  // 上传前
  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },
  // 上传成功之后
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      }
    });
  },
  // 点击立即发布 
  /* 需要进行的  获取每一项中的数据 判断合法性 然后提交 */
  submit_btn () {
    console.log(this.data.titleValue);
    const { titleValue, mainImageUrl, mian_desc, price, upTags } = this.data
    if (!titleValue.trim() || !mainImageUrl.trim() || !mian_desc.trim() || !price.trim() || !upTags.trim()) {
      // 输入不合法
     wx.showToast({
       title: '输入不合法',
       icon: 'none',
      //  禁止用户手抖连续点击
       mask: true
     });
    }
  },
  // 获取输入框中的数据
  getInputData (e) {
    const name = e.target.dataset.name.toString()
    const value = e.detail.value
    this.setData({
      [name]:value
    })
    // console.log(e);
  },
  // 将页面显示的标签重排为后台需要的
  getUpTags () {
    // 将中间的空格分隔 改为 | 分割
    const { tags } = this.data
    const str = tags.replace(/\s+/g, '|')
    this.setData({
      upTags:str
    })
  },
  // 将后台传过来的带有 | 的字符串upTags转为页面上用户显示的,请求回来数据调用这个方法就可以了
  toTags () {
    const { upTags } = this.data
    const tags = upTags.split('|').join(' ')
    this.setData({
      tags
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toTags()
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