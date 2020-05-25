// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
 
} from '../../../request/api/store_api.js'
// 引入上传文件方法 参数就是本地的路径
import {
  upLoadImages
} from '../../../utils/uploadImg.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData





Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list: ['a', 'b', 'c'],
    list: [
      {
        name: '禁售物品',
        id:1
      },
      {
        name: '假冒品牌',
        id:2
      },
      {
        name: '疑似欺诈',
        id:3
      },
      {
        name: '泄露隐私',
        id:4
      },
      {
        name: '人身攻击',
        id:5
      },
      {
        name: '垃圾广告',
        id:6
      }
    ],
    result: [],
    // 富文本编辑器输入文本域
    textValue:''
  },

  onChange(event) {
    this.setData({
      result: event.detail
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  noop () { },
  // 获取输入框中的数据
  getInputData (e) {
    const { name } = e.currentTarget.dataset
    const {value} = e.detail 
    console.log(value, name);
    this.setData({
      [name]:value
    })
  },
  // 上传图片
  // 上传成功之后
  async afterRead(event) {
    const {
      file
    } = event.detail;
    // console.log(file.path);
    const res = await upLoadImages(file.path)
    // console.log(res);
    const data_get_text = JSON.parse(res.data)
    const url = data_get_text.text
    const {
      fileList,
      fileListaddress
    } = this.data

    fileList.push({
      url: `${imgURL}${url}`
    })
    // 存储需要传到后台的附图字符串
    fileListaddress.push(url)
    this.setData({
      fileList,
      fileListaddress
    })
  },
  // 删除附图的某一项
  deleteItem(event) {
    // 下面是一个项数  删除数组中对应的项
    // console.log(event.detail.index);
    const {
      index
    } = event.detail
    const {
      fileList
    } = this.data
    fileList.splice(index, 1)
    console.log(fileList);
    this.setData({
      fileList
    })

  },
  // 提交
  submitFunc () {
    console.log('您点击了提交');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgURL
    })
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